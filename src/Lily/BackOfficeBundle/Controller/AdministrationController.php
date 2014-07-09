<?php

namespace Lily\BackOfficeBundle\Controller;


use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;

use JMS\Serializer\Exception\RuntimeException;
use JMS\SecurityExtraBundle\Annotation\Secure;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\View\ViewHandler;

use Lily\BackOfficeBundle\Entity\Config;
use Lily\BackOfficeBundle\Form\ConfigType;

class AdministrationController extends BaseController
{
	/**
	 * 
	 * @Template()
	 */
    public function indexAction()
    {    	 
    	$isFaq = $this->getEnterprise()->getFaq();
		$isChat = $this->getEnterprise()->getChat();
		$isAvi = $this->getEnterprise()->getAvi();
		$isTopquestions = $this->getEnterprise()->getTopquestions();
		
		return array('isFaq' => $isFaq, 'isChat' => $isChat, 'isAvi' => $isAvi, 'isTopquestions' => $isTopquestions);
		
    }
    
        
    /**
     * @Get("/config")
     * @Secure(roles="ROLE_ADMIN")
     */
    public function getAction(Request $request) {
	    
	    $config = $this->getEntityManager()
    				   ->getRepository('LilyBackOfficeBundle:Config')
    				   ->findOneById(1);
    					  
        if (!$config) {
            throw $this->createNotFoundException();
        }
        
		$view = $this->view($config)->setFormat('json');
		return $this->handleView($view);
	    
    }
    
    /**
     * @Put("/config/update")
     * @Secure(roles="ROLE_ADMIN")
     */
    public function updateAction(Request $request) {
	    
	    $data = json_decode($request->getContent(), true);
	    
	    $config = $this->getEntityManager()
    				   ->getRepository('LilyBackOfficeBundle:Config')
    				   ->findOneById(1); 
	    
	    $form = $this->createForm(new ConfigType(), $config, array('csrf_protection' => false));
	    $form->bind($data);
	    
	    $em = $this->getEntityManager();
        $em->persist($config);
        $em->flush();
        
        $view = $this->view($config)->setFormat('json');
		return $this->handleView($view);	
	    
    }
    
}