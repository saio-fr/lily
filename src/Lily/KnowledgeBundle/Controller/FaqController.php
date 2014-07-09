<?php

namespace Lily\KnowledgeBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
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

use Lily\KnowledgeBundle\Entity\Faq;
use Lily\KnowledgeBundle\Form\FaqType;
use Lily\BackOfficeBundle\Controller\BaseController;

class FaqController extends BaseController
{
	/**
	 * @View()
	 */
	public function indexAction()
    {      
    	if (!$this->getUser()->getEnterprise()->getFaq()) {
    	
	    	throw new AccessDeniedException();
	    	
    	}
    }
    
    /**
     * @Get("/rest/{parent}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     * @View()
     */
    public function getAction($parent)
    {   
   		
   		if ($parent == 'null' ) $parent = NULL;
   		
   		$faq = $this->getEntityManager()
    			    ->getRepository('LilyKnowledgeBundle:Faq')
    			    ->findByParent($parent);
   		
		return $faq;
      		
    }
        
    /**
     * @Get("/breadcrumbs/{id}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function getBreadcrumbsAction($id)
    {   
    	    	
    	
    	if ($id == 'null') {
    		$breadcrumbs[] = array('link' => '', 'title' => 'Accueil');
    		return $breadcrumbs;	
    	}
    	
   		$faq = $this->getEntityManager()
    			    ->getRepository('LilyKnowledgeBundle:Faq')
    			    ->find($id);
    	
    	$current = $faq;
    	
    	$breadcrumbs[] = array('link' => 'category/'.$faq->getId() ,'title' => $current->getTitle());		 
    	   
    	while ($faq->getParent()) {
	    	$title = $faq->getParent()->getTitle();
	    	$breadcrumbs[] = array('link' => 'category/'.$faq->getParent()->getId(), 'title' => $title);
	    	$faq = $faq->getParent();
    	}
    	
    	$breadcrumbs[] = array('link' => '', 'title' => 'Accueil');	  
    	   		
      	return $breadcrumbs;
      	
    }
    
    /**
     * @Post("/rest/{parent}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function createAction($parent, Request $request)
    {
    	
    	if ($parent == 'null' ) $parent = NULL;
    	else {
       		$parent = $this->getEntityManager()
    				   	   ->getRepository('LilyKnowledgeBundle:Faq')
					   	   ->find($parent);
			
    	}
    				   
    	$faq = $this->deserialize('Lily\KnowledgeBundle\Entity\Faq', $request);
    	$faq->setParent($parent);
    	$faq->setPosition(-1);
    	
    	if ($faq instanceof Faq === false) {
            $view = $this->view($faq, 400);
	        return $this->handleView($view);
        }   	
        
        $em = $this->getEntityManager();
        $em->persist($faq);
        $em->flush();
			
        $view = $this->view($faq)->setFormat('json');
		return $this->handleView($view);
        
    }    
    
    /**
     * @Put("/rest/{id}/position/{position}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function updateAction($id, $position, Request $request)
    {
    
    	$data = json_decode($request->getContent(), true);
    	
   		$faq = $this->getEntityManager()
    			    ->getRepository('LilyKnowledgeBundle:Faq')
    			    ->find($id); 	
		
		$form = $this->createForm(new FaqType(), $faq, array('csrf_protection' => false));   
		$form->bind($data);

        var_dump($form.isValid());
		
		$faq->setPosition($position);
        
        $em = $this->getEntityManager();
        $em->persist($faq);
        $em->flush();
			
        $view = $this->view($faq)->setFormat('json');
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
		
		$faq = $em->getRepository('LilyKnowledgeBundle:Faq')
				  ->find($id); 
    			   
	    $em->remove($faq);
	    $em->flush();
		
    }

}
