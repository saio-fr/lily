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
	 */
    public function indexAction()
    { 
        if (!$this->getUser()->getEnterprise()->getChat()) {
    	
	    	throw new AccessDeniedException();
	    	
    	}
    	
    }    
    
    /**
     * @Get("/users")
     * @Secure(roles="ROLE_CHAT_OPERATOR")
     */
    public function getUserAction() {    
		
		$users = $this->getUser()->getEnterprise()->getUsers();
		
		foreach($users as $user){

            foreach($user->getRoles() as $role){
                if($role == "ROLE_CHAT_OPERATOR"){

                       $users = $user;
                }

            }
        }
		
		return $users;	
		
    }
    
}