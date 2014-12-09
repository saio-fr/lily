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
     * @Get("/")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     * @View(serializerGroups={"list"})
     */
    public function getTagsAction()
    {    

    	$tags = $this->getEntityManager()
    			     ->getRepository('LilyKnowledgeBundle:Tag')
    				 ->findAll();
    	
    	$view = $this->view($tags)->setFormat('json');        
        return $this->handleView($view);	
        	
    }
    
    /**
     * @Get("/{id}")
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
        
		$view = $this->view($tag)->setFormat('json');
		return $this->handleView($view);
       		
    }
    
    /**
     * @Post("/")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function createAction(Request $request)
    {

    	$tag = $this->deserialize('Lily\KnowledgeBundle\Entity\Tag', $request);
    	
    	if ($tag instanceof Tag === false) {
            $view = $this->view($tag, 400);
	        return $this->handleView($view);
        }  		  		    	 
        
        $em = $this->getEntityManager();
        $em->persist($tag);
        $em->flush();
			
        $view = $this->view($tag)->setFormat('json');
		return $this->handleView($view);
        
    }    
    
    /**
     * @Put("/")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function updateAction(Request $request)
    {

    	$data = json_decode($request->getContent(), true);
		
		$form = $this->createForm(new TagType(), $tag, array('csrf_protection' => false));   
		$form->bind($data);
        
        $em = $this->getEntityManager();
        $em->persist($tag);
        $em->flush();
			
        $view = $this->view($tag)->setFormat('json');
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
		
		$tag = $em->getRepository('LilyKnowledgeBundle:Tag')
				  ->find($id); 
    			   
	    $em->remove($tag);
	    $em->flush();
	    
    }
            
    /**
     * @Post("/{id}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function addQuestionAction($question, Request $request)
    {
		
		$em = $this->getEntityManager();
		$em_question = $em->getRepository('LilyKnowledgeBundle:Question');
		$em_tag = $em->getRepository('LilyKnowledgeBundle:Tag');
		
		$data = json_decode($request->getContent());

		$tag = $em_tag->find($id);
		
		foreach($data->id as $item) {
			
			$question = $em_question->find($item);
			$tag->addQuestion($question);
			$question->addTag($tag);
			
		}
		
        $em->persist($tag);
        $em->persist($question);
        $em->flush();
			
        $view = $this->view($tag)->setFormat('json');
        return $this->handleView($view);
        
    }
    
                
    /**
     * @Post("/{id}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function removeQuestionAction($id, Request $request)
    {
		
		$em = $this->getEntityManager();
		$em_question = $em->getRepository('LilyKnowledgeBundle:Question');
		$em_tag = $em->getRepository('LilyKnowledgeBundle:Tag');
		
		$data = json_decode($request->getContent());
		$tag = $em_tag->find($id);
		
		foreach($data->id as $item) {
			
			$question = $em_question->find($item);
			$tag->removeQuestion($question);
			$question->removeTag($tag);
			
		}
		
        $em->persist($tag);
        $em->persist($question);
        $em->flush();
			
        $view = $this->view($tag)->setFormat('json');
		return $this->handleView($view);
        
    }

}
