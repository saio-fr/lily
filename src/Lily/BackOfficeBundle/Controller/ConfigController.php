<?php

namespace Lily\BackOfficeBundle\Controller;


use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;

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

use Lily\BackOfficeBundle\Entity\Config;
use Lily\BackOfficeBundle\Form\ConfigType;

class ConfigController extends BaseController
{
    /**
     * @View()
     * @Secure(roles="ROLE_ADMIN")
     */
    public function indexAction()
    {    	 
    }
        
    /**
     * @Get("/config")
     * @Secure(roles="ROLE_ADMIN")
     */
    public function getAction(Request $request) {
	    
	    $cname = $this->getEnterprise()->getCname();	    
	    $config = $this->get('memcache.default')->get('config_'.$cname);
		
		if (!$config) {
		
	    	$config = $this->getEntityManager()
    				   	   ->getRepository('LilyBackOfficeBundle:Config')
					   	   ->findOneById(1);    	  			  
			
			$this->get('memcache.default')->set('config_'.$cname, $config, 604800);
		
		}
    					  
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
        
        $cname = $this->getEnterprise()->getCname();
        $this->get('memcache.default')->set('config_'.$cname, $config, 604800);
        
        $view = $this->view($config)->setFormat('json');
		return $this->handleView($view);	
	    
    }
    
}