<?php

namespace Lily\KnowledgeBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use Gedmo\Loggable\LoggableListener;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Delete;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\View\ViewHandler;

use JMS\Serializer\SerializationContext;
use JMS\Serializer\Exception\RuntimeException;
use JMS\SecurityExtraBundle\Annotation\Secure;

use Lily\KnowledgeBundle\Entity\PersonalQuestion;
use Lily\KnowledgeBundle\Form\PersonalQuestionType;
use Lily\BackOfficeBundle\Controller\BaseController;

class PersonalQuestionsController extends BaseController
{
    
	/**
     * @Get("/")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function getQuestionsAction()
    {    
   		
   		$questions = $this->getEntityManager()
    					  ->getRepository('LilyKnowledgeBundle:PersonalQuestion')
    					  ->findAll();    					  

		return $questions;
        		
    }
    
    /**
     * @Get("/{id}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function getAction($id)
    {   
    
   		$question = $this->getEntityManager()
    					 ->getRepository('LilyKnowledgeBundle:PersonalQuestion')
    					 ->find($id);
    					  
        if (!$question) {
            throw $this->createNotFoundException();
        }
   		
		return $question;					 
      		
    }
    
    /**
     * @Post("/")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function createAction(Request $request)
    {

    	$question = $this->deserialize('Lily\KnowledgeBundle\Entity\PersonalQuestion', $request);
    	
    	if ($question instanceof PersonalQuestion === false) {
            $view = $this->view($question, 400);
	        return $this->handleView($view);
        }   	
            	
    	$question->setRequests('0');
        
        $em = $this->getEntityManager();
        $em->persist($question);
        $em->flush();       
    		
		// On récupère le client
		$cname = $this->getEnterprise()->getCname();
    	$client = $this->get('solarium.client.' . $cname. '.personal');
    	
    	// On crée l'update query
    	$update = $client->createUpdate();
    	
    	// On crée les documents
    	$documents[] = $question->toSolrDocument($update->CreateDocument());
    	
    	$update->addDocuments($documents);
		$update->addCommit();
	
		// On exécute la query
		$client->update($update);			 
			
        $view = $this->view($question)->setFormat('json');
		return $this->handleView($view);
        
    }    
    
    /**
     * @Put("/{id}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     * @View()
     */
    public function updateAction($id, Request $request)
    {
    	$em = $this->getEntityManager();
    	
    	$data = json_decode($request->getContent(), true);
    	
   		$question = $this->getEntityManager()
    					 ->getRepository('LilyKnowledgeBundle:PersonalQuestion')
    					 ->find($id); 	
		
		$form = $this->createForm(new PersonalQuestionType(), $question, array('csrf_protection' => false)); 
		
		  
		$form->bind($data);
        
        $em->persist($question);
        $em->flush();
            		
		// On récupère le client
		$cname = $this->getEnterprise()->getCname();
    	$client = $this->get('solarium.client.' . $cname. '.personal');
    	
    	// On crée l'update query
    	$update = $client->createUpdate();
    	
    	// On crée les documents
    	$documents[] = $question->toSolrDocument($update->CreateDocument());
    	
    	$update->addDeleteQuery('id:' . $id);
    	$update->addDocuments($documents);
		$update->addCommit();
	
		// On exécute la query
		$client->update($update);
			
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
		
		$question = $em->getRepository('LilyKnowledgeBundle:PersonalQuestion')
				   	   ->find($id); 
		
		if (!$question) {
            throw $this->createNotFoundException();
        }
    		
    	// On récupère l'entreprise
		$cname = $this->getEnterprise()->getCname();
		// On supprime la question de l'index
    	$client = $this->get('solarium.client.' . $cname. '.personal');
    	$update = $client->createUpdate();
    	
    	$update->addDeleteQuery('id:' . $id);
		$update->addCommit();
		$client->update($update);
    			   
	    $em->remove($question);
	    $em->flush();
    
    }
    
}
