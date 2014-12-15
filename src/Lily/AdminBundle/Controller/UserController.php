<?php

namespace Lily\AdminBundle\Controller;

use Lily\AdminBundle\Controller\BaseController;
use Lily\UserBundle\Form\UserManagementType;
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
     * @Post("/{client}")
     * @ParamConverter("client")
     * @Secure(roles="ROLE_SUPER_ADMIN")
     */
     public function addAction(Client $client, Request $request) {
    
        $manager = $this->get('fos_user.user_manager');
        $user = $manager->createUser();
        
        $data = json_decode($request->getContent(), true);
        $form = $this->createForm(new UserManagementType, $user, array('csrf_protection' => false));
        $form->submit($data);
        
        if ($form->isValid()) {
              
            // Validate user
            $user->setClient($client);
            
            // Set user config
            $config = new UserConfig();
            $user->setConfig($config);
            
            // Persist user entity
            $user->setEnabled($user);
            $manager->updateUser($user);
              
        } else {
          
            $serializer = $this->get('jms_serializer');
            $form = $serializer->serialize($form, 'json');
            $data = array('success' => false, 'errorList' => $form);
            $view = $this->view($data)->setFormat('json');
          
        }
        
        $view = $this->view($user)->setFormat('json');
        return $this->handleView($view);

    }

}
