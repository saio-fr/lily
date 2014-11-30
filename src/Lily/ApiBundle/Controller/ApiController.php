<?php

namespace Lily\ApiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Delete;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\View\ViewHandler;

use JMS\Serializer\Exception\RuntimeException;
use JMS\Serializer\SerializationContext;

use Lily\ApiBundle\Controller\BaseController;

class ApiController extends BaseController
{
    
	public function indexAction($licence)
    {
    	
    	// Services	
    	$client = $this->getClient($licence);
    	$config = $this->getConfig($licence);
		$redirection = $this->getRedirection($licence);
		
		$cache = $this->get( 'aequasi_cache.instance.default' );
		$mobileDetector = $this->get('mobile_detect.mobile_detector');
		$chatAvailable = $cache->fetch($licence.'_chat_available');
		
		$em = $this->getEntityManager($licence);
		
		$avi = 'http://cdn.saio.fr/customer/'.$licence.'/js/avatar.js';
		$avi = file_get_contents($avi);	
		
		// Utilisateur
		$session = $this->container->get('session');
		
		if (!($session->isStarted())) {
			
			$session->start();
			
			$connection = new LogConnection();
			$connection->setSession($session->getId());
			$connection->setDate(new \Datetime());
			
			// Support d'utilisation			
			if ($mobileDetector->isMobile()) { $connection->setMedia('mobile'); }			
			if ($mobileDetector->isTablet()) { $connection->setMedia('tablet'); }
			if (!$mobileDetector->isMobile() && !$mobileDetector->isTablet()) { $connection->setMedia('pc'); }	
			
			$em->persist($connection);
			$em->flush();			 

		}

        return $this->render('LilyApiBundle:themes:lily/index.html.twig', array('licence' => $licence, 'config' => $config, 'redirection' => $redirection, 'avatar' => $avi, 'chatAvailable' => $chatAvailable)); 
        
    }
    
    public function trackingAction($licence)
    {
    	
    	$client = $this->getClient($licence);
		$config = $this->getConfig();
		
		$cache = $this->get( 'aequasi_cache.instance.default' );
		
		$available = $cache->fetch($licence.'_chat_available');
		
		if ( // Return if Maintenance is On or Avi is off and no operators available to chat
		
			$client->getMaintenance() ||
			$config->getMaintenance() || 
			!(($client->getChat() && $config->getChat() && $available) || ($config->getAvi() && $client->getAvi()) )
		
		) return new Response();
				
		$trackerJS = $this->renderView( 'LilyApiBundle::tracker.js.twig', array('licence' => $licence));
		
		$response = new Response($trackerJS);
		$response->headers->set( 'Content-Type', 'text/javascript' );		
		
		return $response;
        
    }
        
    /**
     * @Post("/{licence}/query")
     */
    public function createQueryAction($licence, Request $request)
    {    

		// On initialise nos variables		
		$client = $this->getClient($licence);	
		$cache = $this->get( 'aequasi_cache.instance.default' );
		$mobileDetector = $this->get('mobile_detect.mobile_detector');
		$em = $this->getEntityManager($licence);
		$session = $this->container->get('session');
			
		// On récupère la question
		$query = str_replace(str_split('+&&||!(){}[]^"~*?:'), "", $request->get('query'));
		
		// On vérifie que la question posée ne comporte pas de mots grossier
		$solarium = $this->get('solarium.client.insults');
        $select = $client->createSelect();
        $select->setQuery($query);
        $result = $solarium->select($select);        
        
        // Si la question posée n'est pas correcte
        if ($result->getNumFound() != 0) {
        
        	$insults = array('Vous êtes grossier !', 'Je ne vous permets pas!', 'Voyons, un peu de retenu.', 'Je n\'apprécie pas beaucoup votre langage ...', 'Vous êtes incorrigible ...');
        
        	// Si la question posée comporte une insulte, on retourne un message au hasard	        
        	$random = array_rand($insults, 1);
        	$response = $insults[$random];
        	    	
			$view = $this->view($response)->setHeader('type', 'insult');        
			return $this->handleView($view);	
	        
        }
        
        // On crée un log de requete
		$logrequest = new LogRequest();
		$logrequest->setSession($session->getId());
		$logrequest->setQuery($request->get('query'));
		
		// Support utilisé	
		if ($mobileDetector->isMobile()) { $logrequest->setMedia('mobile'); }			
		if ($mobileDetector->isTablet()) { $logrequest->setMedia('tablet'); }
		if (!$mobileDetector->isMobile() && !$mobileDetector->isTablet()) { $logrequest->setMedia('pc'); }	
		
		$em->persist($logrequest);
		$em->flush();
	    	    
    	$solarium = $this->get('solarium.client.' . $licence);
		$select = $solarium->createSelect();
		$select->setQuery($query);
		$select->setStart(0)->setRows(1);
		$result = $solarium->select($select); 
		$fields = $result->getDocuments(); 
		
		// Si la requete retourne un résultat
        if (($result->getNumFound() != 0) && ($fields[0]['score'] >= 0.2)) { 
            
	    	$question = $this->get('doctrine')->getManager($licence)
                 			 ->getRepository('LilyKnowledgeBundle:Question')
				 			 ->find($fields[0]['id']);
				 			 
            $response = array('id' => $fields[0]['id'], 'answer' => $fields[0]['answer'], 'mood' => $question->getMood());
            
        	$view = $this->view($response)->setHeader('type', 'answer'); 
			                 
			$logrequest->setQuestion($question);
			$requests = $question->getRequests();
			$question->setRequests(++$requests);
			
			$em->persist($logrequest);
			$em->flush();
			                 
			if (!$question->getChildren()->isEmpty()) {
			
				$actions = $this->get('doctrine')->getManager($licence)
			                      ->getRepository('LilyKnowledgeBundle:Question')
							      ->findByParent($question);			 
				    
				$context = new SerializationContext();		
				$context->setGroups(array('precision'));   
				
				$response = array('parent' => $question, 'actions' => $actions, 'mood' => $question->getMood());
				
				$view = $this->view($response)->setHeader('type', 'precision');
				$view->setSerializationContext($context);				
			}
			
			return $this->handleView($view);
			
		// La requete n'a pas retourné de résultat		
        }	   
        
        $solarium = $this->get('solarium.client.' . $licence . '.personal');
		$select = $client->createSelect();
		$select->setQuery($query);
		$select->setStart(0)->setRows(1);
		$result = $solarium->select($select); 
		$fields = $result->getDocuments(); 
		
		if (($result->getNumFound() != 0) && ($fields[0]['score'] >= 0.2)) { 
		
			$fields = $result->getDocuments();
	    	$question = $this->get('doctrine')->getManager($licence)
             				 ->getRepository('LilyKnowledgeBundle:PersonalQuestion')
			 				 ->find($fields[0]['id']);
			 				 
			$response = array('id' => $fields[0]['id'], 'answer' => $fields[0]['answer'], 'mood' => $question->getMood());	 
    	
			$view = $this->view($response)->setHeader('type', 'personal');
			return $this->handleView($view);
			
		}          	
       
        // Test if the question already exist in unanswered db
	    $solarium = $this->get('solarium.client.' . $licence . '.unanswered');
		$select = $solarium->createSelect();
		$select->setQuery($query);
		$select->setStart(0)->setRows(1);
		$result = $solarium->select($select); 
		$fields = $result->getDocuments();
		
		// Si la requete retourne un résultat
		if (($result->getNumFound() != 0)) {            
			$unanswered = $this->get('doctrine')->getManager($licence)
             			 	   ->getRepository('LilyKnowledgeBundle:UnansweredQuestion')
			 			 	   ->find($fields[0]['id']);
			 			 	 			
			$requests = $unanswered->getRequests(); 
			$unanswered->setRequests($requests+1);
			$unanswered->setDate(new \Datetime());
			
			$em->persist($unanswered);
	   		$em->flush();
	   	// La requete n'a pas retourné de resultat
   	    } else {
   	    
       		$unanswered = new UnansweredQuestion();
	   		$unanswered->setTitle(ucfirst(strtolower($query)));
	   		$unanswered->setRequests(1); 
	   		$unanswered->setDate(new \Datetime());
	   		
	   		$em->persist($unanswered);
	   		$em->flush();
	   		
	   		// On crée l'update query
	   		$update = $client->createUpdate();
    	
	   		// On crée les documents
	   		$documents[] = $unanswered->toSolrDocument($update->CreateDocument());
    	
	   		$update->addDocuments($documents);
	   		$update->addCommit();
	
	   		// On exécute la query
	   		$client->update($update);
	   		
   	    }   
         
        $redirection = $this->get('doctrine')->getManager($licence)
		                    ->getRepository('LilyKnowledgeBundle:Redirection')
						    ->findOneByBydefault(true);
						    
		$redirection->setFrequency($redirection->getFrequency()+1);
		
		$config = $em->getRepository('LilyBackOfficeBundle:Config')
					 ->findOneById(1);
		
		$redirectionMail = $config->getRedirectionMail();							  
		$redirectionTel = $config->getRedirectionTel();			
		$redirectionChat = $config->getRedirectionChat() || $client->getLivechat();
		// Is chat available ?
		$chatAvailable = $cache->fetch($licence.'_chat_available');
		
		$response = array('redirection' => $redirection, 'isMail' => $redirectionMail, 'isTel' => $redirectionTel, 'isChat' => $redirectionChat, 'chatAvailable' => $chatAvailable);
        
		$em->persist($redirection);
		$em->flush();
		
		$view = $this->view($response)->setHeader('type', 'misunderstood');
		return $this->handleView($view);
		              		
    }
    
    /**
     * @Get("/{licence}/precision/{id}")
     * @View()
     */
    public function getPrecisionAction($licence, $id)
    { 
     	// Initialisation des variables	
		$response = $this->getEntityManager($licence)
			             ->getRepository('LilyKnowledgeBundle:Question')
			             ->find($id);	
			              
		$context = new SerializationContext();			              	
			             
		if (!$response->getChildren()->isEmpty()) {
		
			$precision = $this->get('doctrine')->getManager($licence)
		                     ->getRepository('LilyKnowledgeBundle:Question')
						     ->findByParent($id);
	
			$context->setGroups(array('precision'));	   			
			$view = $this->view($precision)->setHeader('type', 'precision');
			$view->setSerializationContext($context);
			return $this->handleView($view);
							
		} 
					
		$context->setGroups(array('answer'));
		$view = $this->view($response)->setHeader('type', 'answer');
		
		$view->setSerializationContext($context);
		return $this->handleView($view);	
		
    } 
    
    /**
     * @Post("/{licence}/notation/{question}")
     * @View()
     */
    public function NotationAction($licence, $question, Request $request)
    {  					  	
    	$em = $this->getEntityManager($licence);
		$notation = $this->deserialize('Lily\ApiBundle\Entity\LogNotation', $request);
    	
    	if ($notation instanceof LogNotation === false) {
            $view = $this->view($notation, 400);
	        return $this->handleView($view);
        }   
        
    	$question = $this->get('doctrine')->getManager($licence)
                 		 ->getRepository('LilyKnowledgeBundle:Question')
				 		 ->find($question);	
            	
    	$notation->setQuestion($question);
    	$notation->setDate(new \Datetime());
    	
    	$em->persist($notation);
    	$em->flush();
    	
		$satisfaction = $this->get('doctrine')->getManager($licence)
             		 	     ->getRepository('LilyApiBundle:LogNotation')
			 		 	     ->satisfaction($question);	
			 		 	     
		$question->setSatisfaction($satisfaction);
        
        $em->persist($question);
        $em->flush();
        
        if ($question->getCategory()) {
        	
        	if ($question->getCategory()->getRedirection()) {
       			$redirection = $question->getCategory()->getRedirection();
       		}
        
        } else {
        
        $redirection = $this->get('doctrine')->getManager($licence)
			                ->getRepository('LilyKnowledgeBundle:Redirection')
						    ->findOneByBydefault(true);	
		
		}		
		
		$config = $this->getConfig();
			
		$redirectionMail = $config->getRedirectionMail();							  
		$redirectionTel = $config->getRedirectionTel();			
		$redirectionChat = $config->getRedirectionChat();
			
		$response = array('redirection' => $redirection, 'isMail' => $redirectionMail, 'isTel' => $redirectionTel, 'isChat' => $redirectionChat);		    
		
		$view = $this->view($response);
		return $this->handleView($view);
		
    }  
    
    /**
     * @Get("/{licence}/faq/{parent}")
     * @View()
     */
    public function getFaqAction($licence, $parent)
    {  	
    	// On initialise nos variables
		$em = $this->getEntityManager($licence);
		$mobileDetector = $this->get('mobile_detect.mobile_detector');
		$session = $this->container->get('session');
		
		// On crée un log de requete
		$request = new LogRequest();
		$request->setSession($session->getId());
		
		// Support d'utilisation	
		if ($mobileDetector->isMobile()) { $request->setMedia('mobile'); }			
		if ($mobileDetector->isTablet()) { $request->setMedia('tablet'); }
		if (!$mobileDetector->isMobile() && !$mobileDetector->isTablet()) { $request->setMedia('pc'); }	
		
		if ($parent == 'NULL'  || $parent == 'null' ) $parent = NULL;
		
		// On récupère les catégories enfants
		$faqs = $this->get('doctrine')->getManager($licence)
					 ->getRepository('LilyKnowledgeBundle:Faq')
					 ->findByParent($parent);
		
		if ($parent !== NULL) {
		
			// On récupère l'id du parent
			$parent = $this->get('doctrine')->getManager($licence)
						   ->getRepository('LilyKnowledgeBundle:Faq')
						   ->findOneById($parent);
			
			$request->setFaq($parent);
			
			$title = $parent->getTitle();
							
			if ($parent->getParent()) $parent = $parent->getParent()->getId();
			else $parent = NULL;
		 
		} else {
			$title = 'NULL';
			$parent = 'NULL';
		}
		
		$em->persist($request);
		$em->flush();	
		
		return array('parent' => $parent, 'title' => $title, 'faqs' => $faqs);						
    } 
    
    /**
     * @Get("/{licence}/top-questions/{id}")
     * @View()
     */
    public function getTopQuestionsAction($licence, $id)
    {  	
    	// On initialise nos variables
		$em = $this->getEntityManager($licence);
		$mobileDetector = $this->get('mobile_detect.mobile_detector');
		$from = new \Datetime('-4 month');	
		$to = new \Datetime();
		
		if ($id == 'NULL') {
			// On récupère le top des questions
			$requests = $this->get('doctrine')->getManager($licence)
				 			 ->getRepository('LilyApiBundle:LogRequest')
				 			 ->topQuestions($from, $to);
				 			 	
			foreach ($requests as $item) {
				$question = $item[0];
				$questions[] = $question;
			}

		} else {
			$questions = $this->get('doctrine')->getManager($licence)
	 			  			  ->getRepository('LilyKnowledgeBundle:Question')
	 			  			  ->find($id);
	 			  		
		}
		
		return $questions;						
    } 

    
    
    /**
     * @Post("/{licence}/logredirection/{redirection}")
     */
    public function geRedirectionSupportAction($licence, $redirection, Request $request)
    {  	
        // On initialise nos variables
		$em = $this->get('doctrine')->getManager($licence);
		$mobileDetector = $this->get('mobile_detect.mobile_detector');		
		
		$logRedirection = $this->deserialize('Lily\ApiBundle\Entity\LogRedirection', $request);
    	
    	if ($logRedirection instanceof LogRedirection === false) {
            $view = $this->view($logRedirection, 400);
	        return $this->handleView($view);
        }   
		
		// Support d'utilisation	
		if ($mobileDetector->isMobile()) { $logRedirection->setMedia('mobile'); }			
		if ($mobileDetector->isTablet()) { $logRedirection->setMedia('tablet'); }
		if (!$mobileDetector->isMobile() && !$mobileDetector->isTablet()) { $logRedirection->setMedia('pc'); }	
		
        $redirection = $em->getRepository('LilyKnowledgeBundle:Redirection')
				   		  ->find($redirection);
		
		$logRedirection->setRedirection($redirection);		   		
		$logRedirection->setDate(new \Datetime());	
							    
		$em->persist($logRedirection);
		$em->flush();	
		
    } 
    
    /**
     * @Post("/{licence}/send/mail")
     */
    public function sendEmailAction($licence, Request $request)
    { 
    
    	$from = $request->get('from');
    	$object = $request->get('object');
    	$msg = $request->get('msg');
    	
    	$redirection = $this->getEntityManager($licence)
			                ->getRepository('LilyKnowledgeBundle:Redirection')
							->findOneByBydefault(true);
    	
    	$message = \Swift_Message::newInstance()
        			->setSubject($object)
					->setFrom('noreply@saio.fr')
					->setTo($redirection->getMail())
					->setBody(
						$this->renderView(
						'::mails/redirection.txt.twig',
						array('from' => $from, 'msg' => $msg)
						)
					);
		
		$this->get('mailer')->send($message);

		return true;
	    
    }
    
}