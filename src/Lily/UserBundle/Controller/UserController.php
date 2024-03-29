<?php

namespace Lily\UserBundle\Controller;

use Lily\UserBundle\Form\UserAdminType;
use Lily\UserBundle\Form\AvatarType;
use Lily\BackOfficeBundle\Controller\BaseController;

use Symfony\Component\HttpFoundation\Request;

use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Delete;
use FOS\RestBundle\Controller\Annotations\View;

use JMS\SecurityExtraBundle\Annotation\Secure;

use \ZMQContext;
use \ZMQ;

class UserController extends BaseController
{

    /**
     * @Get("/users")
     * @Secure(roles="ROLE_USER")
     */
    public function getUsersAction() {
        $users = $this->getClient()->getUsers();
        return $users;
    }

    /**
     * @Get("/users/{id}")
     * @Secure(roles="ROLE_USER")
     */
    public function getUserAction($id) {

        $manager = $this->get('fos_user.user_manager');
        $user = $manager->findUserBy(Array('id' => $id));

        // conditions
        $admin = $this->get('security.context')->isGranted('ROLE_ADMIN');
        $conditions1 = !$admin && $user !== $this->getUser();
        $conditions2 = $user->getClient() !== $this->getClient();

        if (!$user || $conditions1 || $conditions2) {
            throw $this->createNotFoundException();
        }

        $view = $this->view($user);
        return $this->handleView($view);

    }

    /**
     * @Delete("/users/{id}", requirements={"id" = "\d+"})
     * @Secure(roles="ROLE_ADMIN")
     * @View(statusCode=204)
     */
    public function deleteAction($id) {

        $manager = $this->get('fos_user.user_manager');
        $user = $manager->findUserBy(Array('id' => $id));

        //Security check
        $client = $this->getClient();
        if ($user === null || $user->getClient() !== $client) {
            throw $this->createNotFoundException();
        }

        if ($user === $this->getUser()) {
            throw new \Exception("You cannot delete your own account.");
        }

        $manager->deleteUser($user);

        // Publish to chat servers
        $licence = $this->getLicence();
        $cache = $this->get('aequasi_cache.instance.default');

        $context = new ZMQContext();
        $socket = $context->getSocket(ZMQ::SOCKET_PUSH, 'pusher');
        $socket->connect("tcp://172.16.0.2:5555");
        $socket->connect("tcp://172.16.0.3:5555");
        $socket->connect("tcp://172.16.0.4:5555");

        $socket->send(json_encode(array(
            'action' => 'removeOperator',
            'licence' => $licence,
            'id' => $id
        )));
    }

    /**
     * @Put("/users/{id}", requirements={"id" = "\d+"})
     */
    public function putAction($id, Request $request) {

        $manager = $this->get('fos_user.user_manager');
        $user = $manager->findUserBy(Array('id' => $id));

        // conditions
        $admin = $this->get('security.context')->isGranted('ROLE_ADMIN');
        $conditions1 = !$admin && $user !== $this->getUser();
        $conditions2 = $user->getClient() !== $this->getClient();

        if (!$user || $conditions1 || $conditions2) {
            throw $this->createNotFoundException();
        }

        $form = $this->getForm(new UserAdminType(), $user, $request);

        if ($form->isValid()) {

            $manager->updateUser($user);

            // Send new user info to analytics
            $analytics = $this->container->get('analytics');
            $analytics->identify($user);

            $view = $this->view($user);
            return $this->handleView($view);
        }

        $view = $this->view($form, 400);
        return $this->handleView($view);

    }

    /**
     * @Post("/users")
     */
    public function postAction(Request $request) {

        $client = $this->getClient();
        $users = $client->getUsers();
        $maxusers = $client->getConfig()->getMaxusers();

        if (count($users) >= $maxusers) {
            throw new \Exception("User limit reached.");
        }

        $manager = $this->get('fos_user.user_manager');
        $user = $manager->createUser();

        $user->setUsername(uniqid());

        $form = $this->getForm(new UserAdminType(), $user, $request);

        if ($form->isValid()) {

            $user->setClient($client);
            $user->setEnabled(true);
            $manager->updateUser($user);

            // Send new user info to analytics
            $analytics = $this->container->get('analytics');
            $analytics->identify($user);

            $view = $this->view($user);
            return $this->handleView($view);
        }

        $view = $this->view($form, 400);
        return $this->handleView($view);

    }

    /**
     * @Post("/users/{id}/avatar", requirements={"id" = "\d+"})
     * @Secure(roles="ROLE_ADMIN")
     */
    public function putAvatarAction($id, Request $request) {

        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('LilyUserBundle:User')
        ->findOneById($id);

        // conditions
        $admin = $this->get('security.context')->isGranted('ROLE_ADMIN');
        $conditions1 = !$admin && $user !== $this->getUser();
        $conditions2 = $user->getClient() !== $this->getClient();

        if (!$user || $conditions1 || $conditions2) {
            throw $this->createNotFoundException();
        }

        $config = $user->getConfig();
        $form = $this->getForm(new AvatarType(), $config, $request);

        if ($form->isValid()) {

            $config->setAvatarFile($request->files->get('avatarFile'));
            $em->persist($config);
            $em->flush();

            $view = $this->view($config);
            return $this->handleView($view);
        }

        $view = $this->view($form, 400);
        return $this->handleView($view);

    }
}
