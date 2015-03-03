<?php

namespace Lily\BackOfficeBundle\Controller;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Delete;
use FOS\RestBundle\Controller\Annotations\View;

use JMS\SecurityExtraBundle\Annotation\Secure;

use Lily\KnowledgeBundle\Entity\Redirection;
use Lily\KnowledgeBundle\Form\RedirectionType;
use Lily\BackOfficeBundle\Controller\BaseController;



class RedirectionsController extends BaseController
{

    /**
     * @Template()
     */
    public function indexAction()
    {        
    }
    
    /**
     * @Get("/redirections")
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
     * @Get("/redirections/{id}")
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
     * @Post("/redirections")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function createAction(Request $request)
    {
        $em = $this->getEntityManager();
        $redirection = $this->deserialize('Lily\KnowledgeBundle\Entity\Redirection', $request);
    	
        if ($redirection instanceof Redirection === false) {
            $view = $this->view($redirection, 400);
            return $this->handleView($view);
        }  
        
        $redirection->setBydefault(0);
        
        $em->persist($redirection);
        $em->flush();
			
        $view = $this->view($redirection);
        return $this->handleView($view);  
    }    
    
    /**
     * @Put("/redirections/{id}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function updateAction($id, Request $request)
    {
        $em = $this->getEntityManager();
        $cache = $this->get( 'aequasi_cache.instance.default' );
    	
        $redirection = $this->getEntityManager()
    		->getRepository('LilyKnowledgeBundle:Redirection')
    		->find($id); 	
		
        $form = $this->getForm(new RedirectionType(), $redirection, $request);  

        $em->persist($redirection);
        $em->flush();
        
        if ($redirection->getBydefault()) {
            $licence = $this->getUser()->getClient()->getLicence();
            $cache->save( $licence.'_redirection', $redirection, 3600 );
        }
			
        $view = $this->view($redirection)->setFormat('json');
        return $this->handleView($view);			
    } 
    
    /**
     * @Delete("/redirections/{id}")
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

