<?php

namespace Lily\BackOfficeBundle\Controller;

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

use Lily\BackOfficeBundle\Entity\Avatar;
use Lily\BackOfficeBundle\Entity\Personnalisation;
use Lily\BackOfficeBundle\Form\PersonnalisationType;

/**
 * @Route("/personnalisation")
 */
class PersonnalisationController extends BaseController
{
	/**
	 * @Route("/")
	 * @Template()
	 */
	public function indexAction()
    {
    	$data = array();
        
        // On récupère l'utilisateur
        $entreprise = $this->getUser()->getEntreprise();
        $data['entreprise'] = $entreprise;
        
        // Et on le passe à notre application backbone
        return $data;        
    }
    
    /**
     * @Get("/get")
     * @Secure(roles="ROLE_USER")
     */
    public function getAction()
    {   
    
   		$personnalisation = $this->getEntityManager()
    			                 ->getRepository('LilyBackOfficeBundle:Personnalisation')
    			                 ->findAll();
   		
		$view = $this->view($personnalisation)->setFormat('json');
		return $this->handleView($view);  
		 		
    }
    
    /**
     * @Put("/update")
     * @Secure(roles="ROLE_USER")
     */
    public function updateAction(Request $request)
    {
    
        $data = json_decode($request->getContent(), true); 
    
		$personnalisation = $this->getEntityManager()
    			                 ->getRepository('LilyBackOfficeBundle:Personnalisation')
    			                 ->findAll();   	
		
		$form = $this->createForm(new PersonnalisationType(), $personnaisation, array('csrf_protection' => false));   
		$form->bind($data);
        
        $em = $this->getEntityManager();
        $em->persist($personnalisation);
        $em->flush();
			
        $view = $this->view($personnalisation)->setFormat('json');
		return $this->handleView($view);    
		
    } 
    
    /**
	 * @Route("/univers")
	 * @Template()
	 */
    public function universAction()
    {     
    }
        
    /**
	 * @Route("/iframe")
	 * @Template()
	 */
    public function iframeAction()
    {     
    }
           
    /**
	 * @Route("/interface")
	 * @Template()
	 */
    public function interfaceAction()
    {     
    }
}
