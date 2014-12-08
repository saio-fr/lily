<?php

namespace Lily\UserBundle\Controller;

use Lily\UserBundle\Entity\User;
use Lily\UserBundle\Entity\UserConfig;
use Lily\UserBundle\Form\UserAdminType;
use Lily\UserBundle\Form\AvatarType;
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

class AdminController extends BaseController
{
    /**
     * @View()
     * @Secure(roles="ROLE_ADMIN")
     */
    public function indexAction() {
    }

    /**
     * @Get("/")
     * @Secure(roles="ROLE_ADMIN")
     */
    public function getUsersAction() {
      
        $users = $this->getClient()->getUsers();
        return $users;
        
    }

    /**
     * @Delete("/{id}", requirements={"id" = "\d+"})
     * @Secure(roles="ROLE_ADMIN")
     * @View(statusCode=204)
     */
    public function deleteAction($id) {
    
        $manager = $this->get('fos_user.user_manager');
        $user = $manager->findUserBy(Array('id' => $id));

        //Security check
        $client = $this->getClient();
        if($user === null || $user->getClient() !== $client) {
            throw $this->createNotFoundException();
        }

        if($user === $this->getUser()) {
            throw new \Exception("You cannot delete your own account.");
        }
		
        $manager->deleteUser($user);
       
    }

    /**
     * @Put("/{id}", requirements={"id" = "\d+"})
     * @Secure(roles="ROLE_ADMIN")
     */
    public function putAction($id, Request $request) {

        $manager = $this->get('fos_user.user_manager');
        $user = $manager->findUserBy(Array('id' => $id));

        //Security check
        $client = $this->getClient();
        if($user === null || $user->getClient() !== $client) {
            throw $this->createNotFoundException();
        }
        
        $form = $this->getForm(new UserAdminType(), $user, $request);

        if ($form->isValid()) {

            $manager->updateUser($user);
            
            $view = $this->view($user);
            return $this->handleView($view);
        
        } 
        
        $view = $this->view($form, 400);
        return $this->handleView($view);
     
    }

    /**
     * @Post("/")
     * @Secure(roles="ROLE_ADMIN")
     */
    public function postAction(Request $request) {

        $manager = $this->get('fos_user.user_manager');
        
        $client = $this->getClient();
        $users = $client->getUsers();
        $maxusers = $client->getConfig()->getMaxusers();
        $user = $manager->createUser();
        
        if(count($users) >= $maxusers)
        throw new \Exception("User limit reached.");

        $form = $this->getForm(new UserAdminType(), $user, $request);

        if ($form->isValid()) {

            $user->setClient($client);
            $manager->updateUser($user);
            
            $view = $this->view($user);
            return $this->handleView($view);
        
        } 
        
        $view = $this->view($form, 400);
        return $this->handleView($view);

    } 
    
    /**
     * @Put("/{id}/avatar", requirements={"id" = "\d+"})
     * @Secure(roles="ROLE_ADMIN")
     */
    public function putAvatarAction($id, Request $request) {

        $em = $this->getDoctrine()->getManager();
        
        $user = $em->getRepository('LilyUserBundle:User')
                     ->findOneById($id);
                     
        $config = $user->getConfig();

        //Security check
        $client = $this->getClient();
        if($user === null || $user->getClient() !== $client) {
            throw $this->createNotFoundException();
        }

        $form = $this->createForm(new AvatarType, $config, array('csrf_protection' => false));
        $form->submit($request);  
        
        if ($form->isValid()) {

            $config->setAvatarFile($request->files->get('file'));

            $em->persist($config);
            $em->flush();
            
            $view = $this->view($config);
            return $this->handleView($view);
          
        } 
    }
}
