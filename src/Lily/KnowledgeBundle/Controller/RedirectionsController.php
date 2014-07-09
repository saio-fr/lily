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

use Lily\KnowledgeBundle\Entity\Redirection;
use Lily\KnowledgeBundle\Form\RedirectionType;
use Lily\BackOfficeBundle\Controller\BaseController;



class RedirectionsController extends BaseController
{
    
    public function indexAction()
    {    
    	return $this->render('LilyKnowledgeBundle:Redirections:index.html.twig');
    	    
    }
    
	/**
     * @Get("/rest")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     * @View()
     */
    public function getRedirectionsAction()
    {    

    	$redirections = $this->getEntityManager()
    					     ->getRepository('LilyKnowledgeBundle:Redirection')
    					     ->findAll();
    	
    	return $redirections;	
        	
    }
    
    /**
     * @Get("/rest/{id}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     * @View()
     */
    public function getAction($id)
    {   
   		
   		$redirection = $this->getEntityManager()
    					    ->getRepository('LilyKnowledgeBundle:Redirection')
    					    ->find($id);
    					  
        if (!$redirection) {
            throw $this->createNotFoundException();
        }
        
		return $redirection;
       		
    }
    
    /**
     * @Post("/rest")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function createAction(Request $request)
    {
    	
    	$redirection = $this->deserialize('Lily\KnowledgeBundle\Entity\Redirection', $request);
    	
    	if ($redirection instanceof Redirection === false) {
            $view = $this->view($redirection, 400);
	        return $this->handleView($view);
        }  
        
        $redirection->setBydefault(0);
        
        $em = $this->getEntityManager();
        $em->persist($redirection);
        $em->flush();
			
        $view = $this->view($redirection)->setFormat('json');
		return $this->handleView($view);
        
    }    
    
    /**
     * @Put("/rest/{id}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function updateAction($id, Request $request)
    {

    	$data = json_decode($request->getContent(), true);
    	
    	$redirection = $this->getEntityManager()
    					 ->getRepository('LilyKnowledgeBundle:Redirection')
    					 ->find($id); 	
		
		$form = $this->createForm(new RedirectionType(), $redirection, array('csrf_protection' => false));   
		$form->bind($data);
        
        $em = $this->getEntityManager();
        $em->persist($redirection);
        $em->flush();
			
        $view = $this->view($redirection)->setFormat('json');
		return $this->handleView($view);			
    
    } 
    
    /**
     * @Delete("/rest/{id}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     * @View(statusCode=204)
     */
    public function deleteAction($id)
    {   
    	
		$em = $this->getEntityManager();
		
		$redirection = $em->getRepository('LilyKnowledgeBundle:Redirection')
				   	      ->find($id); 
    			   
	    $em->remove($redirection);
	    $em->flush();
	    
    }

}

