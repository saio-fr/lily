<?php

namespace Lily\BackOfficeBundle\Controller;


use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
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

use Lily\BackOfficeBundle\Entity\Config;
use Lily\BackOfficeBundle\Form\ConfigType;

use \ZMQContext;
use \ZMQ;

class ConfigController extends BaseController
{

    /**
     * @View()
     * @Secure(roles="ROLE_ADMIN")
     */
    public function indexAction() {
      
        $client = $this->getUser()->getClient()->getConfig();     
        return array('client' => $client);
    }

    /**
     * @Get("/rest")
     * @Secure(roles="ROLE_ADMIN")
     */
    public function getAction(Request $request) {

        $config = $this->getEntityManager()
        ->getRepository('LilyBackOfficeBundle:Config')
        ->findOneById(1);

        if (!$config) {
            throw $this->createNotFoundException();
        }

        $view = $this->view($config)->setFormat('json');
        return $this->handleView($view);

    }

    /**
     * @Put("/rest")
     * @Secure(roles="ROLE_ADMIN")
     */
    public function updateAction(Request $request) {

        $data = json_decode($request->getContent(), true);

        $config = $this->getEntityManager()
        ->getRepository('LilyBackOfficeBundle:Config')
        ->findOneById(1);

        $form = $this->createForm(new ConfigType(), $config, array('csrf_protection' => false));
        $form->bind($data);

        $em = $this->getEntityManager();
        $em->persist($config);
        $em->flush();

        $licence = $this->getLicence();
        $cache = $this->get( 'aequasi_cache.instance.default' );

        $cache->fetch($licence.'_app_config', $config, 0);

        // Tell our chat app that config changed
        $context = new ZMQContext();
        $socket = $context->getSocket(ZMQ::SOCKET_PUSH, 'pusher');
        $socket->connect("tcp://ws.saio.fr:5555");

        $socket->send(json_encode(array('action' => 'config', 'licence' => $licence)));

        $view = $this->view($config)->setFormat('json');
        return $this->handleView($view);

    }

}