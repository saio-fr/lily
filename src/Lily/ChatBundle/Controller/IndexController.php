<?php

namespace Lily\ChatBundle\Controller;

use Lily\BackOfficeBundle\Controller\BaseController;

use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use FOS\RestBundle\Controller\Annotations\View;
use JMS\SecurityExtraBundle\Annotation\Secure;

class IndexController extends BaseController
{
   /**
    * @Secure(roles="ROLE_CHAT_OPERATOR")
    */
    public function dashboardAction()
    { 
        if (!$this->getClient()->getConfig()->getChat()) {
            throw new AccessDeniedException();	
    	  }
        return $this->render('LilyChatBundle::index.html.twig');
    }        
}