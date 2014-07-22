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
     //   throw $this->createNotFoundException();
    }
    /**
     * @Get("/rest/")
     * @Secure(roles="ROLE_ADMIN")
     */
    public function getUsersAction()
    {
        $enterprise = $this->getUser()->getEnterprise();
        $userList = $enterprise->getUsers();

        return $userList;
    }

    /**
     * @Get("/rest/maxusers")
     * @Secure(roles="ROLE_ADMIN")
     */
    public function getMaxusersAction()
    {
        $enterprise = $this->getUser()->getEnterprise();
        $data=[];
        $data['maxusers'] = $enterprise->getMaxusers();
        return $data;
    }


    /**
     * @Delete("/rest/{id}")
     * @Secure(roles="ROLE_ADMIN")
     * @View(statusCode=204)
     */
    public function delAction($id)
    {
        $enterprise = $this->getUser()->getEnterprise();
        $userManager = $this->get('fos_user.user_manager');
        $userDel = $userManager->findUserBy(Array('id' => $id));
        
        if($userDel === null || $userDel->getEnterprise() !== $enterprise) {
            throw $this->createNotFoundException();
        }
        if($userDel === $this->getUser()) {
            throw new \Exception("Vous ne pouvez pas supprimer votre propre compte.");
        }

        $userManager->deleteUser($userDel);
    }

    /**
     * @Put("/rest/{id}")
     * @Secure(roles="ROLE_ADMIN")
     * @View(statusCode=204)
     */
    public function editAction($id, Request $request)
    {
        $enterprise = $this->getUser()->getEnterprise();
        $data = json_decode($request->getContent(), true);

        $userManager = $this->get('fos_user.user_manager');
        $userEdited = $userManager->findUserBy(Array('id' => $id));

        if($userEdited === null || $userEdited->getEnterprise() !== $enterprise) {
            throw $this->createNotFoundException();
        }

        $userForm = $this->createForm(new UserType, $userEdited, array('adminModif'=>true, 'csrf_protection' => false));
        $userForm->bind($data);

        if($userEdited === $this->getUser() && !in_array('ROLE_ADMIN', $userEdited->getRoles())) {
            throw new \Exception("Vous ne pouvez pas vous supprimer les droits d'administration.");
        }

        //Gestion avatar
        $this->updateAvatar($userEdited);

        $userManager->updateUser($userEdited);
    }

    /**
     * @Post("/rest/")
     * @Secure(roles="ROLE_ADMIN")
     * @View(statusCode=204)
     */
    public function addAction(Request $request)
    {
        $enterprise = $this->getUser()->getEnterprise();
        $maxusers = $enterprise->getMaxusers();
        $users = $enterprise->getUsers();
        if(count($users)>=$maxusers)
            throw new \Exception("Limite d'utilisateur dépassée.");

        $data = json_decode($request->getContent(), true);

        $userManager = $this->get('fos_user.user_manager');
        $newUser=$userManager->createUser();
    
        $userForm = $this->createForm(new UserType, $newUser, array('adminModif'=>true, 'csrf_protection' => false));
        $userForm->bind($data);

        //Gestion avatar
        $newUser->setEnabled(true);
        $newUser->setEnterprise($enterprise);
        $this->updateAvatar($newUser);

        $userManager->updateUser($newUser);

    }

    /**
     * @Get("/rest/userForm")
     * @Secure(roles="ROLE_ADMIN")
     */
    public function getUserFormAction()
    {
        $userForm = $this->createForm(new UserType, null, array('adminModif'=>true));
        return $this->render('LilyUserBundle:Manage:user_edit.html.twig', array('form' => $userForm->createView()));
    }

    public function avatarWidgetAction($id, Request $request) {
        $enterprise = $this->getUser()->getEnterprise();
        $urlGenerator=$this->get('templating.helper.assets');

        $errors=[];

        /* Récupération de l'user (null si création) */
        if($id==0) {
            $userEdited=null;
        } else {
            $userManager = $this->get('fos_user.user_manager');
            $userEdited = $userManager->findUserBy(Array('id' => $id));
            if($userEdited === null || $userEdited->getEnterprise() !== $enterprise) {
                throw $this->createNotFoundException();
            }
        }

        /* Création du formulaire */
        $avatarWidgetForm = $this->createForm(new UserType, $userEdited, array('avatarWidget'=>true));
       
        /* Traitement de l'envoi d'un nouvel avatar */
        if($request->getMethod() == 'POST') {
            $avatarWidgetForm->bind($request);

            if($avatarWidgetForm->isValid()) {
                $tmpAvatar = $this->uploadTmpAvatar($userEdited, $avatarWidgetForm->get('avatarFile')->getData());
                $tmpAvatarUrl = $urlGenerator->getUrl($tmpAvatar);

                // Recréation du formulaire (on vient de le soumettre)
                $avatarWidgetForm = $this->createForm(new UserType, $userEdited, array('avatarWidget'=>true));
                $avatarWidgetForm->get('avatar')->setData($tmpAvatarUrl);
            } else {
                $errors[]="Une erreur est survenue, image non supportée ?";
            }
        } else if($id==0) {
            $tmpAvatarUrl=$urlGenerator->getUrl('images/avatar-utilisateur.png');
            $avatarWidgetForm->get('avatar')->setData($tmpAvatarUrl);
        }



        return $this->render('LilyUserBundle:Manage:avatarWidget.html.twig', array('form' => $avatarWidgetForm->createView(), 'errors' => $errors));
    }

    //Upload le fichier temporaire lié à l'avatar servant à la prévisualisation
    private function uploadTmpAvatar($user, $avatarFile) {
        $enterprise = $this->getUser()->getEnterprise();

        if ($avatarFile === null) { //Pas de fichier à uploader
            return;
        }

        if($user !== null) { // L'utilisateur existe

            $tmpAvatarFileName = $user->getId() . '.' . $avatarFile->guessExtension();
            $tmpAvatar = User::getTmpUploadDir($enterprise) . $tmpAvatarFileName;
            $user->setTmpAvatar($tmpAvatar);
        
        } else { // L'utilisateur n'existe pas encore (création d'un compte utilisateur)

            $tmpAvatarFileName = 'new-user' . '.' . $avatarFile->guessExtension();
            $tmpAvatar = User::getTmpUploadDir($enterprise) . $tmpAvatarFileName;

        }

        // On déplace le fichier envoyé dans le répertoire d'upload temporaire
        $avatarFile->move(User::getTmpUploadRootDir($enterprise),   // Répertoire de destination
                                    $tmpAvatarFileName); // Nom du fichier

        return  $tmpAvatar;
    }

    private function updateAvatar($user) {
        if(preg_match('#^/customer/' . $user->getEnterprise()->getCname() . '/images/avatars/tmp/[0-9]+\.[a-zA-Z]+$#', $user->getAvatar())) {
            $urlGenerator = $this->get('templating.helper.assets');


            $newAvatarRelativeUrl=str_replace('/tmp/', '/', $user->getAvatar());
            $newAvatarAbsoluteUrl=$urlGenerator->getUrl($newAvatarRelativeUrl);

            $fs = new Filesystem();
            $fs->copy('.'.$user->getAvatar(), '.'.$newAvatarRelativeUrl);


            $user->setAvatar($newAvatarAbsoluteUrl);
        }
    }

    /**
     * @Get("/rest/stats/{id}")
     * @Secure(roles="ROLE_ADMIN")
     */
    public function getStatsAction($id) {
        $enterprise = $this->getUser()->getEnterprise();

        $userManager = $this->get('fos_user.user_manager');
        $selectedUser = $userManager->findUserBy(Array('id' => $id));

        if($selectedUser === null || $selectedUser->getEnterprise() !== $enterprise) {
            throw $this->createNotFoundException();
        }

        $userStats=[];
        $userStats['userId']=$selectedUser->getId(); 
        $userStats['graphData']=[[0, 13], [1, 11], [2, 11], [3, 10], [4, 20], [5, 13], [6, 16], [7, 16], [8, 11], [9, 18], [10, 20], [11, 13]];
        $userStats['nombreConversationHeure']=34; 
        $userStats['tempsMoyenConversation']="12 min"; 
        $userStats['tempsAttenteMoyen']="4 min"; 
        $userStats['indiceSatisfaction']="86%"; 
        $userStats['tempsMoyenInactivite']="47 min";   
        $userStats['nombeQuestionsRemontees']="84";          
        return $userStats;
    }
}
