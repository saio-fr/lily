<?php

namespace Lily\KnowledgeBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Delete;
use FOS\RestBundle\Controller\Annotations\View;

use JMS\Serializer\SerializationContext;
use JMS\SecurityExtraBundle\Annotation\Secure;

use Lily\KnowledgeBundle\Entity\Question;
use Lily\KnowledgeBundle\Form\QuestionType;
use Lily\BackOfficeBundle\Controller\BaseController;

class QuestionsController extends BaseController
{
  	/**
  	 * @Template()
  	 */
  	public function indexAction()
    {   
    }
    
    /**
     * @Post("/sort")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     * @View(serializerGroups={"list"})
     */
    public function getQuestionsAction(Request $request)
    {     		
        $data = json_decode($request->getContent());

        $questions = $this->getEntityManager()
        ->getRepository('LilyKnowledgeBundle:Question')
        ->sortQuestions($data);

        return $questions; 		
    }
    
    /**
     * @Get("/{id}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function getAction($id)
    {   
        $question = $this->getEntityManager()
        ->getRepository('LilyKnowledgeBundle:Question')
    		->find($id);
    					  
        if (!$question) {
            throw $this->createNotFoundException();
        }
   		
        return $question;					 
    }
    
    /**
     * @Post("/{category}/{parent}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function createAction($category, $parent, Request $request)
    {

    	$parent = $this->getEntityManager()
      ->getRepository('LilyKnowledgeBundle:Question')
      ->find($parent);
    				   
    	$category = $this->getEntityManager()
      ->getRepository('LilyKnowledgeBundle:Category')
      ->find($category);
    				   
    	$question = $this->deserialize('Lily\KnowledgeBundle\Entity\Question', $request);
    	
    	if ($question instanceof Question === false) {
          $view = $this->view($question, 400);
	        return $this->handleView($view);
        }   	
            	
    	$question->setParent($parent);
    	$question->setCategory($category);
    	$question->setSatisfaction('0');
    	$question->setRequests('0');
    	
    	$user = $this->getUser();
    	$question->setModifiedBy($user->getLastname() . ' ' . $user->getFirstname());
        
      $em = $this->getEntityManager();
      $em->persist($question);
      $em->flush();
        
      if (!$parent) {
    		
      		// On récupère le client
      		$cname = $this->getEnterprise()->getCname();
  	    	$client = $this->get('solarium.client.' . $cname);
  	    	
  	    	// On crée l'update query
  	    	$update = $client->createUpdate();
  	    	
  	    	// On crée les documents
  	    	$documents[] = $question->toSolrDocument($update->CreateDocument());
  	    	
  	    	$update->addDocuments($documents);
          $update->addCommit();
  		
          // On exécute la query
          $client->update($update);
			
    	} 
			
        $view = $this->view($question)->setFormat('json');
        return $this->handleView($view);
        
    }    
    
    /**
     * @Put("/{id}/{parent}/{category}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     * @View()
     */
    public function updateAction($id, $parent, $category, Request $request)
    {
      	$em = $this->getEntityManager();
      	
      	$parent = $this->getEntityManager()
        ->getRepository('LilyKnowledgeBundle:Question')
        ->find($parent);
      				   
      	$category = $this->getEntityManager()
        ->getRepository('LilyKnowledgeBundle:Category')
        ->find($category);
  
        $question = $this->getEntityManager()
        ->getRepository('LilyKnowledgeBundle:Question')
        ->find($id); 	
  		
        $form = $this->getForm(new QuestionType(), $question, $request);   
  		
        $question->setParent($parent);
      	$question->setCategory($category);
      	
      	$user = $this->getUser();
      	$question->setModifiedBy($user->getLastname() . ' ' . $user->getFirstname());
          
        $em->persist($question);
        $em->flush();
              		
        if (!$parent) {
                		
  			    // On récupère le client
            $cname = $this->getEnterprise()->getCname();
            $client = $this->get('solarium.client.' . $cname);
  	    	
            // On crée l'update query
            $update = $client->createUpdate();
  	    	
            // On crée les documents
            $documents[] = $question->toSolrDocument($update->CreateDocument());
  	    	
            $update->addDeleteQuery('id:' . $id);
            $update->addDocuments($documents);
            $update->addCommit();
  		
            // On exécute la query
            $client->update($update);
  			  	
  		  } 	
        return $question;
    } 
    
    /**
     * @Delete("/{id}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     * @View(statusCode=204)
     */
    public function deleteAction($id)
    {       	
		    $em = $this->getEntityManager();
		
        $question = $em->getRepository('LilyKnowledgeBundle:Question')
				->find($id); 
		
        if (!$question) {
            throw $this->createNotFoundException();
        }
    		
        // On récupère l'entreprise
        $cname = $this->getEnterprise()->getCname();
        // On supprime la question de l'index
        $client = $this->get('solarium.client.' . $cname);
        $update = $client->createUpdate();
    	
        $update->addDeleteQuery('id:' . $id);
        $update->addCommit();
        $client->update($update);
    			   
        $em->remove($question);
        $em->flush();
    }
    
    /**
     * @Get("{id}/versions")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     * @View()
     */
    public function getVersionsAction($id)
    {    
    	$versions = $this->getEntityManager()
    					 ->getRepository('Lily\BackOfficeBundle\Loggable\Entity\LogEntry')
    					 ->findBy(array('objectId' => $id),array("loggedAt" => "DESC"));
    					 
    	$versions = array_slice($versions, 0, 5);    	
    	
    	$question = $this->getEntityManager()
      ->getRepository('Lily\KnowledgeBundle\Entity\Question')
      ->findById($id);
    					 
    	return array('versions' => $versions, 'question' => $question);		
    }
    
    /**
     * @Put("{id}/versions/revert/{version}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     * @View()
     */
    public function updateVersionAction($id, $version)
    {    
      $em = $this->getEntityManager();
   		
    	$question = $em->getRepository('LilyKnowledgeBundle:Question')
      ->find($id);
    	
    	$em->getRepository('Lily\BackOfficeBundle\Loggable\Entity\LogEntry')
      ->revert($question, $version);
    	
    	$em->persist($question);
      $em->flush();
    	
    	return $question;  		
    }
    
    /**
     * @Put("{id}/versions/setchildren")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     * @View()
     */
    public function setChildrenVersionAction($id)
    {    
      $em = $this->getEntityManager();
   		
    	$question = $em->getRepository('LilyKnowledgeBundle:Question')
      ->find($id);
    	
    	$versions = $em->getRepository('Lily\BackOfficeBundle\Loggable\Entity\LogEntry')
      ->findByObjectId($id);
    	
    	if (!$question->getChildren()->isEmpty()) {
    		foreach ($versions as $version) {
	    	  	$version->setChildren($question->getChildren()->toArray());
            $em->persist($version);
		  	}
        $em->flush();
    	}
    	return $question;	
    }	    	    
    
}
