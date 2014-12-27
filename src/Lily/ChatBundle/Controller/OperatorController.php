<?php

namespace Lily\ChatBundle\Controller;

use Lily\BackOfficeBundle\Controller\BaseController;

use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use FOS\RestBundle\Controller\Annotations\View;
use JMS\SecurityExtraBundle\Annotation\Secure;

class OperatorController extends BaseController
{
   /**
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