<?php

namespace Lily\AdminBundle\Controller;

use Lily\AdminBundle\Controller\BaseController;
use Lily\UserBundle\Form\UserAdminType;
use Lily\UserBundle\Entity\Client;
use Lily\UserBundle\Entity\User;
use Lily\UserBundle\Entity\UserConfig;

use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use FOS\RestBundle\Controller\Annotations\Post;
use JMS\SecurityExtraBundle\Annotation\Secure;

class UserController extends BaseController
{

    /**
     * @Post("/user/{client}")
     * @ParamConverter("client")
     * @Secure(roles="ROLE_SUPER_ADMIN")
     */
     public function addAction(Client $client, Request $request) {

        $manager = $this->get('fos_user.user_manager');
        $user = $manager->createUser();
        $user->setUsername(uniqid());

        $form = $this->getForm(new UserAdminType, $user, $request);

        if ($form->isValid()) {

            // Validate user
            $user->setClient($client);

            // Set user config
            $config = new UserConfig();
            $user->setConfig($config);

            // Persist user entity
            $user->setEnabled($user);
            $manager->updateUser($user);

            // Send new user info to segment
            $segment = $this->container->get('segmentio');
            $segment::identify(array(
                'userId'  => $user->getId(),
                'groupId' => $user->getClient()->getId(),
                'traits'  => array(
                    '$first_name' => $user->getFirstName(),
                    '$last_name'  => $user->getLastName(),
                    '$email'      => $user->getEmail(),
                    'client'      => $user->getClient()->getName()
                )
            ));

            $view = $this->view($user);
            return $this->handleView($view);

        }

        $view = $this->view($form, 400);
        return $this->handleView($view);

    }

}
