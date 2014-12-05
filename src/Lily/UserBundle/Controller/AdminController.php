<?php

namespace Lily\UserBundle\Controller;

use Lily\UserBundle\Entity\User;
use Lily\UserBundle\Form\UserManagementType;
use Lily\UserBundle\Form\UserConfigType;
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
    public function delAction($id) {
    
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
    public function editAction($id, Request $request) {

        $manager = $this->get('fos_user.user_manager');
        $user = $manager->findUserBy(Array('id' => $id));

        //Security check
        $client = $this->getClient();
        if($user === null || $user->getClient() !== $client) {
            throw $this->createNotFoundException();
        }

        $data = json_decode($request->getContent(), true);
        $form = $this->createForm(new UserManagementType, $user, array('csrf_protection' => false, 'allow_extra_fields' => true));
        $form->bind($data);
        
        if ($form->isValid()) {

            $manager->updateUser($user);
            $view = $this->view($user)->setFormat('json');
          
        } else {
            
            $serializer = $this->get('jms_serializer');
            $form = $serializer->serialize($form, 'json');
            $data = array('success' => false, 'errorList' => $form);
            $view = $this->view($data)->setFormat('json');
          
        }
        
        return $this->handleView($view);
     
    }

    /**
     * @Post("/")
     * @Secure(roles="ROLE_ADMIN")
     * @View(statusCode=204)
     */
    public function addAction(Request $request) {
    
        $client = $this->getClient();
        $manager = $this->get('fos_user.user_manager');
        
        if(count($client->getUsers()) >= $client->getMaxusers())
        throw new \Exception("User limit reached.");

        $data = json_decode($request->getContent(), true);

        $new = $manager->createUser();

        $form = $this->createForm(new UserManagementType, $new, array('csrf_protection' => false));
        $form->handleRequest($data);

        if ($form->isValid()) {

            $new->setClient($client);
            $new->setEnabled(true);
            $manager->updateUser($new);
        
        } else {
          
            $form = $serializer->serialize($form, 'json');
            $data = array('success' => false, 'errorList' => $form);
            $view = $this->view($data)->setFormat('json');
          
        }
        
        $view = $this->view($new)->setFormat('json');
        return $this->handleView($view);

    } 
    
    /**
     * @Post("/{id}/avatar", requirements={"id" = "\d+"})
     * @Secure(roles="ROLE_ADMIN")
     */
    public function editAvatarAction($id, Request $request) {

        $manager = $this->get('fos_user.user_manager');
        $em = $this->getDoctrine()->getManager();
        
        $user = $manager->findUserBy(Array('id' => $id));
        $config = $user->getConfig();

        //Security check
        $client = $this->getClient();
        if($user === null || $user->getClient() !== $client) {
            throw $this->createNotFoundException();
        }

        $form = $this->createForm(new UserConfigType, $config, array('csrf_protection' => false));
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
