<?php

namespace Lily\ChatBundle\Controller;

use Lily\BackOfficeBundle\Controller\BaseController;

use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

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

class OperatorController extends BaseController
{
	/**
	 * 
	 * @View()
	 * @Secure(roles="ROLE_CHAT_OPERATOR")
	 */
    public function indexAction()
    { 
        if (!$this->getClient()->getConfig()->getChat()) {
    	
	    	throw new AccessDeniedException();
	    	
    	}
    	
    }        
}