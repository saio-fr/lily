<?php

namespace Lily\UserBundle\Controller;

use Lily\UserBundle\Entity\User;
use Lily\UserBundle\Form\UserType;
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

class ManageController extends BaseController
{
    /**
     * @View()
     * @Secure(roles="ROLE_ADMIN")
     */
    public function indexAction() {
    }

    /**
     * @Get("/rest/")
     * @Secure(roles="ROLE_ADMIN")
     */
    public function getUsersAction() {
      
        $users = $this->getClient()->getUsers();
        return $users;
        
    }

    /**
     * @Get("/rest/maxusers")
     * @Secure(roles="ROLE_ADMIN")
     */
    public function getMaxusersAction() {
      
        $max = $this->getClient()->getConfig()->getMaxusers();
        return $max;
        
    }


    /**
     * @Delete("/rest/{id}", requirements={"id" = "\d+"})
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
     * @Put("/rest/{id}", requirements={"id" = "\d+"})
     * @Secure(roles="ROLE_ADMIN")
     */
    public function editAction($id, Request $request) {
    
        $data = json_decode($request->getContent(), true);

        $manager = $this->get('fos_user.user_manager');
        $user = $manager->findUserBy(Array('id' => $id));

        //Security check
        $client = $this->getClient();
        if($user === null || $user->getClient() !== $client) {
            throw $this->createNotFoundException();
        }

        $form = $this->createForm(new UserType, $user, array('admin'=>true, 'csrf_protection' => false));
        $form->bind($data);

        if($user === $this->getUser() && !in_array('ROLE_ADMIN', $user->getRoles())) {
            throw new \Exception("You can't delete admin rules on your own account");
        }

        // Manage the avatar
        $this->updateAvatar($user);
        $manager->updateUser($user);
        
        $view = $this->view($user)->setFormat('json');
		return $this->handleView($view);
     
    }

    /**
     * @Post("/rest")
     * @Secure(roles="ROLE_ADMIN")
     * @View(statusCode=204)
     */
    public function addAction(Request $request) {
    
        $client = $this->getClient();
        $maxusers = $client->getMaxusers();
        $users = $client->getUsers();
        
        if(count($users) >= $maxusers)
            throw new \Exception("User limit reached.");

        $data = json_decode($request->getContent(), true);

        $manager = $this->get('fos_user.user_manager');
        $new = $manager->createUser();

        $form = $this->createForm(new UserType, $new, array('admin'=>true, 'csrf_protection' => false));
        $form->bind($data);

        //Gestion avatar
        $new->setEnabled(true);
        $new->setClient($client);
        $this->updateAvatar($new);

        $manager->updateUser($new);
        
        $view = $this->view($new)->setFormat('json');
		return $this->handleView($view);

    }

    /**
     * @Get("/rest/userForm")
     * @Secure(roles="ROLE_ADMIN")
     */
    public function getUserFormAction() {
    
        $userForm = $this->createForm(new UserType, null, array('admin' => true));
        
        return $this->render('LilyUserBundle:Manage:Users/edit.html.twig', array('form' => $userForm->createView()));
        
    }

    public function avatarWidgetAction($id, Request $request) {
    
        $urlGenerator=$this->get('templating.helper.assets');

        $errors = [];

        /* Récupération de l'user (null si création) */
        if ($id == 0) {
            $user = null;
        } else {
        
            $manager = $this->get('fos_user.user_manager');
            $user = $manager->findUserBy(array('id' => $id));

            //Security check
            $client = $this->getClient();
            if($user === null || $user->getClient() !== $client) {
                throw $this->createNotFoundException();
            }
            
        }

        /* Création du formulaire */
        $form = $this->createForm(new UserType, $user, array('avatar' =>true));

        /* Traitement de l'envoi d'un nouvel avatar */
        if ($request->getMethod() == 'POST') {
        
            $form->handleRequest($request);
		
            $tmpAvatar = $this->uploadTmpAvatar($user, $form->get('avatarFile')->getData());
            $tmpAvatarUrl = $urlGenerator->getUrl($tmpAvatar);

            // Recréation du formulaire (on vient de le soumettre)
            $form = $this->createForm(new UserType, $user, array('avatar' => true));
            $form->get('avatar')->setData($tmpAvatarUrl);
                
            
        } else if($id==0) {
        
            $tmpAvatarUrl = $urlGenerator->getUrl('images/avatar-utilisateur.png');
            $form->get('avatar')->setData($tmpAvatarUrl);
            
        }

        return $this->render('LilyUserBundle:Manage:Users/avatarWidget.html.twig', array('form' => $form->createView(), 'errors' => $errors));
        
    }

    // Upload le fichier temporaire lié à l'avatar servant à la prévisualisation
    private function uploadTmpAvatar($user, $avatarFile) {
        $client = $this->getClient();

        if ($avatarFile === null) { // Pas de fichier à uploader
            return;
        }

        if ($user !== null) { // L'utilisateur existe

            $tmpAvatarFileName = $user->getId() . '.' . $avatarFile->guessExtension();
            $tmpAvatar = User::getTmpUploadDir($client) . $tmpAvatarFileName;
            $user->setTmpAvatar($tmpAvatar);
			
        } else { // L'utilisateur n'existe pas encore (création d'un compte utilisateur)

            $tmpAvatarFileName = 'new-user' . '.' . $avatarFile->guessExtension();
            $tmpAvatar = User::getTmpUploadDir($client) . $tmpAvatarFileName;

        }

        // On déplace le fichier envoyé dans le répertoire d'upload temporaire
        $avatarFile->move(User::getTmpUploadRootDir($client),   // Répertoire de destination
                                    $tmpAvatarFileName); // Nom du fichier

        return $tmpAvatar;
    }

    private function updateAvatar($user) {
        if(preg_match('#^/customer/' . $this->getClient()->getLicence() . '/images/avatars/tmp/[0-9]+\.[a-zA-Z]+$#', $user->getAvatar())) {
            $urlGenerator = $this->get('templating.helper.assets');


            $newAvatarRelativeUrl=str_replace('/tmp/', '/', $user->getAvatar());
            $newAvatarAbsoluteUrl=$urlGenerator->getUrl($newAvatarRelativeUrl);

            $fs = new Filesystem();
            $fs->copy('.'.$user->getAvatar(), '.'.$newAvatarRelativeUrl);


            $user->setAvatar($newAvatarAbsoluteUrl);
        }
    }
}
