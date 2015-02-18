<?php

namespace Lily\BackOfficeBundle\Controller;

use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\HttpFoundation\Request;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use JMS\SecurityExtraBundle\Annotation\Secure;

use Lily\BackOfficeBundle\Controller\BaseController;

class IndexController extends BaseController
{
  
    public function dashboardAction()
    {
        $client = $this->getClient()->getConfig();
        return $this->render('LilyBackOfficeBundle:Dashboard:index.html.twig', 
          array('client' => $client));
    }
    
    public function faqAction()
    {
        return $this->render('LilyBackOfficeBundle:Faq:index.html.twig');
    }
    
    public function redirectionsAction()
    {
        return $this->render('LilyBackOfficeBundle:Redirections:index.html.twig');
    }

    /**
     * @Secure(roles="ROLE_ADMIN")
     */
    public function configAction()
    {
        $client = $this->getClient()->getConfig();
        return $this->render('LilyBackOfficeBundle:Config:index.html.twig', 
          array('client' => $client));
    }
    
}
