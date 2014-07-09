<?php

namespace Lily\KnowledgeBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Request;
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
use JMS\SecurityExtraBundle\Annotation\Secure;

use Lily\KnowledgeBundle\Entity\UnasweredQuestion;
use Lily\BackOfficeBundle\Controller\BaseController;

class UnansweredQuestionsController extends BaseController
{
    
	/**
     * @Get("/get")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function getQuestionsAction()
    {    
   		
    	$questions = $this->getEntityManager()
    					  ->getRepository('LilyKnowledgeBundle:UnansweredQuestion')
    					  ->findAll();
    	
    	$view = $this->view($questions)->setFormat('json');        
        return $this->handleView($view);
        		
    }
    
    /**
     * @Get("/get/{id}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function getAction($id)
    {   
    
   		$question = $this->getEntityManager()
    					  ->getRepository('LilyKnowledgeBundle:UnansweredQuestion')
    					  ->find($id);
    					  
        if (!$question) {
            throw $this->createNotFoundException();
        }
   		
		$view = $this->view($question)->setFormat('json');
		return $this->handleView($view);
      		
    }
        
    /**
     * @Delete("/delete/{id}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     * @View(statusCode=204)
     */
    public function deleteAction($id)
    {       	
		
		$em = $this->getEntityManager();
		
		$question = $em->getRepository('LilyKnowledgeBundle:UnansweredQuestion')
				   	   ->find($id); 
    			   
	    $em->remove($question);
	    $em->flush();
    
    }
        
}
