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

use Lily\KnowledgeBundle\Entity\Category;
use Lily\KnowledgeBundle\Form\CategoryType;
use Lily\BackOfficeBundle\Controller\BaseController;



class CategoriesController extends BaseController
{
    
	/**
     * @Get("/")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     * @View(serializerGroups={"list"})
     */
    public function getCategoriesAction()
    {    

    	$categories = $this->getEntityManager()
    					   ->getRepository('LilyKnowledgeBundle:Category')
    					   ->findAll();
    	
    	$view = $this->view($categories)->setFormat('json');        
        return $this->handleView($view);	
        	
    }
    
    /**
     * @Get("/{id}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function getAction($id)
    {   
   		
   		$category = $this->getEntityManager()
    					  ->getRepository('LilyKnowledgeBundle:Category')
    					  ->find($id);
    					  
        if (!$category) {
            throw $this->createNotFoundException();
        }
        
		$view = $this->view($category)->setFormat('json');
		return $this->handleView($view);
       		
    }
    
    /**
     * @Post("/{redirection}/{parent}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function createAction($redirection, $parent, Request $request)
    {
    	$parent = $this->getEntityManager()
    				   ->getRepository('LilyKnowledgeBundle:Category')
    				   ->find($parent);
    	
    	$category = $this->deserialize('Lily\KnowledgeBundle\Entity\Category', $request);
    	
    	if ($category instanceof Category === false) {
            $view = $this->view($category, 400);
	        return $this->handleView($view);
        }  

   		$redirection = $this->getEntityManager()
				  		    ->getRepository('LilyKnowledgeBundle:Redirection')
				  		    ->findOneById($redirection); 
				  		    
		$category->setRedirection($redirection);
		$category->setParent($parent);		  		    	 
        
        $em = $this->getEntityManager();
        $em->persist($category);
        $em->flush();
			
        $view = $this->view($category)->setFormat('json');
		return $this->handleView($view);
        
    }    
    
    /**
     * @Put("/{id}/{parent}/{redirection}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function updateAction($id, $parent, $redirection, Request $request)
    {

    	$data = json_decode($request->getContent(), true);
    	
    	$parent = $this->getEntityManager()
			   		   ->getRepository('LilyKnowledgeBundle:Category')
			   		   ->find($parent);
    	
    	$category = $this->getEntityManager()
    					 ->getRepository('LilyKnowledgeBundle:Category')
    					 ->find($id); 	
    					 
		$redirection = $this->getEntityManager()
							->getRepository('LilyKnowledgeBundle:Redirection')
							->findOneById($redirection); 
							
		$category->setRedirection($redirection);
		$category->setParent($parent);
		
		$form = $this->createForm(new CategoryType(), $category, array('csrf_protection' => false));   
		$form->bind($data);
        
        $em = $this->getEntityManager();
        $em->persist($category);
        $em->flush();
			
        $view = $this->view($category)->setFormat('json');
		return $this->handleView($view);			
    
    } 
    
    /**
     * @Delete("/{id}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     * @View(statusCode=204)
     */
    public function deleteAction($id)
    {   
    	
		$em = $this->getEntityManager();
		
		$category = $em->getRepository('LilyKnowledgeBundle:Category')
				   	    ->find($id); 
    			   
	    $em->remove($category);
	    $em->flush();
	    
    }

}
