<?php

namespace Lily\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class AdminController extends Controller
{
    public function indexAction()
    {
        return $this->render('LilyAdminBundle:Admin:layout.html.twig');
    }
}
