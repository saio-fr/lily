<?php

namespace Lily\BackOfficeBundle\Controller;

use Symfony\Component\HttpFoundation\Request;

use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\Controller\Annotations\View;

use JMS\SecurityExtraBundle\Annotation\Secure;

use Lily\BackOfficeBundle\Form\ConfigType;

class ConfigController extends BaseController
{

    /**
     * @View()
     * @Secure(roles="ROLE_ADMIN")
     */
    public function indexAction() {
      
        $client = $this->getClient()->getConfig();     
        return array('client' => $client);
    }

    /**
     * @Get("/config")
     * @Secure(roles="ROLE_ADMIN")
     */
    public function getAction(Request $request) {

        $config = $this->getEntityManager()
        ->getRepository('LilyBackOfficeBundle:Config')
        ->findOneById(1);

        if (!$config) {
            throw $this->createNotFoundException();
        }

        $view = $this->view($config);
        return $this->handleView($view);

    }

    /**
     * @Put("/config")
     * @Secure(roles="ROLE_ADMIN")
     */
    public function putAction(Request $request) {

        $config = $this->getEntityManager()
        ->getRepository('LilyBackOfficeBundle:Config')
        ->findOneById(1);

        $form = $this->getForm(new ConfigType(), $config, $request);

        $em = $this->getEntityManager();
        $em->persist($config);
        $em->flush();

        // Publish new config in memcached and send it to chat's servers
        $this->publishConfig($config);

        $view = $this->view($config);
        return $this->handleView($view);

    }
}