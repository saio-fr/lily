<?php
  
namespace Lily\UserBundle\Controller;

use Lily\BackOfficeBundle\Controller\BaseController;

class ProfileController extends BaseController
{
  
    public function indexAction()
    {          
    	  return $this->render('LilyUserBundle:Profile:index.html.twig');
    }
    
}