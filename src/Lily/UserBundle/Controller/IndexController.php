<?php

namespace Lily\UserBundle\Controller;

use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\HttpFoundation\Request;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use JMS\SecurityExtraBundle\Annotation\Secure;

use Lily\BackOfficeBundle\Controller\BaseController;

class IndexController extends BaseController
{
    public function profileAction()
    {
        return $this->render('LilyUserBundle:Profile:index.html.twig');
    }
    
    /**
     * @Secure(roles="ROLE_ADMIN")
     */
    public function usersAction()
    {
        return $this->render('LilyUserBundle:Admin:index.html.twig');
    }
}
