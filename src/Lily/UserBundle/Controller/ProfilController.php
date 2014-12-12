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

class ProfilController extends BaseController
{
    public function indexAction()
    {          
    	return $this->render('LilyUserBundle:Profil:index.html.twig');
    	    
    }
    
    /**
     * @Get("/user")
     * @Secure(roles="ROLE_USER")
     */
    public function getUserAction() {
    
        $view = $this->view($this->getUser())->setFormat('json');
		return $this->handleView($view);
        
    }
    
    /**
     * @Put("/user")
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
    
    /**
     * @Get("/form")
     * @Secure(roles="ROLE_USER")
     */
    public function getFormAction() {
    
        $userForm = $this->createForm(new UserType, null);
        
        return $this->render('LilyUserBundle:Profil:edit.html.twig', array('form' => $userForm->createView()));
        
    }

    public function avatarWidgetAction(Request $request) {
    
        $urlGenerator=$this->get('templating.helper.assets');

        $errors = [];
		$user = $this->getUser();

        /* Création du formulaire */
        $form = $this->createForm(new UserType, $user, array('avatar' => true));

        /* Traitement de l'envoi d'un nouvel avatar */
        if ($request->getMethod() == 'POST') {
        
            $form->handleRequest($request);
		
            $tmpAvatar = $this->uploadTmpAvatar($user, $form->get('avatarFile')->getData());
            $tmpAvatarUrl = $urlGenerator->getUrl($tmpAvatar);

            // Recréation du formulaire (on vient de le soumettre)
            $form = $this->createForm(new UserType, $user, array('avatar' => true));
            $form->get('avatar')->setData($tmpAvatarUrl);
        
		}
		
        return $this->render('LilyUserBundle:Manage:Users/avatarWidget.html.twig', array('form' => $form->createView(), 'errors' => $errors));
        
    }

   /* 
    * Upload le fichier temporaire lié à l'avatar servant à la prévisualisation 	    
    */
    private function uploadTmpAvatar($avatarFile) {
        $enterprise = $this->getUser()->getEnterprise();

        if ($avatarFile === null) { // Pas de fichier à uploader
            return;
        }

        $tmpAvatarFileName = 'new-user' . '.' . $avatarFile->guessExtension();
        $tmpAvatar = User::getTmpUploadDir($enterprise) . $tmpAvatarFileName;

        // On déplace le fichier envoyé dans le répertoire d'upload temporaire
        $avatarFile->move(User::getTmpUploadRootDir($enterprise),   // Répertoire de destination
                                    $tmpAvatarFileName); // Nom du fichier

        return $tmpAvatar;
    }

    private function updateAvatar() {
    
    	$user = $this->getUser();
    	
        if(preg_match('#^/customer/' . $user->getEnterprise()->getCname() . '/images/avatars/tmp/[0-9]+\.[a-zA-Z]+$#', $user->getAvatar())) {
            $urlGenerator = $this->get('templating.helper.assets');

            $newAvatarRelativeUrl=str_replace('/tmp/', '/', $user->getAvatar());
            $newAvatarAbsoluteUrl=$urlGenerator->getUrl($newAvatarRelativeUrl);

            $fs = new Filesystem();
            $fs->copy('.'.$user->getAvatar(), '.'.$newAvatarRelativeUrl);


            $user->setAvatar($newAvatarAbsoluteUrl);
        }
    }
    
}

    	        