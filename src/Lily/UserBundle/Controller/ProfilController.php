<?php

namespace Lily\UserBundle\Controller;

use Lily\UserBundle\Entity\User;
use Lily\UserBundle\Form\UserProfilType;
use Lily\BackOfficeBundle\Controller\BaseController;

use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Filesystem\Filesystem;

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

class ProfilController extends BaseController
{
    public function indexAction()
    {          
    	return $this->render('LilyUserBundle:Profil:index.html.twig');
    	    
    }
    
    /**
     * @Get("/")
     * @Secure(roles="ROLE_USER")
     */
    public function getUserAction() {
    
        $view = $this->view($this->getUser())->setFormat('json');
		return $this->handleView($view);
        
    }
    
    /**
     * @Put("/")
     * @Secure(roles="ROLE_USER")
     * @View(statusCode=204)
     */
    public function editAction(Request $request) {
    
        $data = json_decode($request->getContent(), true);
        $manager = $this->get('fos_user.user_manager');
        $user = $this->getUser();

        $form = $this->createForm(new UserType, $user, array('csrf_protection' => false));
        $form->bind($data);
	
        // Manage the avatar
        $this->updateAvatar($user);
        $manager->updateUser($user);
        
        $view = $this->view($user)->setFormat('json');
        return $this->handleView($view);
     
    }
    
}

    	        