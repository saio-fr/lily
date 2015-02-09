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

use Lily\KnowledgeBundle\Entity\Tag;
use Lily\KnowledgeBundle\Form\TagType;
use Lily\BackOfficeBundle\Controller\BaseController;

class TagsController extends BaseController
{
    
	/**
     * @Get("/tags")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     * @View(serializerGroups={"list"})
     */
    public function getAllAction()
    {    

      	$tags = $this->getEntityManager()
        ->getRepository('LilyKnowledgeBundle:Tag')
        ->findAll();
      	
      	$view = $this->view($tags);        
        return $this->handleView($view);	
        	
    }
    
    /**
     * @Get("/tags/{id}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function getAction($id)
    {   

        $tag = $this->getEntityManager()
        ->getRepository('LilyKnowledgeBundle:Tag')
    		->find($id);
    					  
        if (!$tag) {
            throw $this->createNotFoundException();
        }
        
    		$view = $this->view($tag);
    		return $this->handleView($view);
       		
    }
    
    /**
     * @Post("/tags")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function postAction(Request $request)
    {

      	$tag = $this->deserialize('Lily\KnowledgeBundle\Entity\Tag', $request);
      	
      	if ($tag instanceof Tag === false) {
            $view = $this->view($tag, 400);
  	        return $this->handleView($view);
        }  		  		    	 
        
        $em = $this->getEntityManager();
        $em->persist($tag);
        $em->flush();
			
        $view = $this->view($tag);
        return $this->handleView($view);
        
    }    
    
    /**
     * @Put("/tags/{id}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function putAction(Request $request)
    {
		
        $tag = $this->getEntityManager()
        ->getRepository('LilyKnowledgeBundle:Tag')
    		->find($id);
    				
		    $form = $this->getForm(new TagType(), $tag, $request);
        
        $em = $this->getEntityManager();
        $em->persist($tag);
        $em->flush();
			
        $view = $this->view($tag);
        return $this->handleView($view);			
    } 
    
    /**
     * @Delete("/tags/{id}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     * @View(statusCode=204)
     */
    public function deleteAction($id)
    {   
    	
		    $em = $this->getEntityManager();
		
        $tag = $em->getRepository('LilyKnowledgeBundle:Tag')
				->find($id); 
    			   
        $em->remove($tag);
        $em->flush(); 
    }
}
