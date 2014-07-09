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
use Lily\BackOfficeBundle\Form\AvatarType;

/**
 * @Route("/avatars")
 */
class AvatarsController extends BaseController
{
    
    /**
     * @Get("/get")
     * @Secure(roles="ROLE_USER")
     */
    public function getAvatarsAction()
    {     		
    
    	$avatars = $this->getEntityManager()
    			        ->getRepository('LilyBackOfficeBundle:Avatar')
    		            ->findAll();
    	
    	$view = $this->view($avatars)->setFormat('json');        
        return $this->handleView($view);		
        	        
    }
    
}
