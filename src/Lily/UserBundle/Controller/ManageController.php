<?php

namespace Lily\UserBundle\Controller;

use Lily\UserBundle\Entity\User;
use Lily\UserBundle\Form\UserType;
use Lily\BackOfficeBundle\Controller\BaseController;

use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\HttpFoundation\Request;

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
    	$maxusers = $enterprise->getMaxusers();
    	return $maxusers;
    }


	/**
     * @Delete("/rest/{id}")
     * @Secure(roles="ROLE_ADMIN")
     * @View(statusCode=204)
     */
    public function delAction($id)
    {
		$userManager = $this->get('fos_user.user_manager');
		$userDel = $userManager->findUserBy(Array('id' => $id));
		
		if($userDel === null) {
            throw $this->createNotFoundException();
		}

		/* $userManager->deleteUser($userDel); */
    }

	/**
     * @Put("/rest/{id}")
     * @Secure(roles="ROLE_ADMIN")
     * @View(statusCode=204)
     */
    public function editAction($id, Request $request)
    {
		$userManager = $this->get('fos_user.user_manager');
		$userEdited = $userManager->findUserBy(Array('id' => $id));

		if($userEdited === null) {
            throw $this->createNotFoundException();
		} 

		$editForm = $this->createForm(new UserType, $userEdited);
        $editForm->handleRequest($request);
        if (!$editForm->isValid()) {
            var_dump($editForm->getErrors());
            throw new \Exception("Les données envoyées ne sont pas correctement formatées");
        }

        //$userManager->updateUser($userEdited);
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
		$userManager = $this->get('fos_user.user_manager');
		$newUser=$userManager->createUser();
	
		$editForm = $this->createForm(new UserType, $newUser);
        $editForm->handleRequest($request);
        if (!$editForm->isValid())
            throw new \Exception("Les données envoyées ne sont pas correctement formatées.");

		//$userManager->updateUser($newUser);
    }
}
