<?php

namespace Lily\AppBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\View;

use JMS\Serializer\SerializationContext;

use Lily\AppBundle\Entity\LogRequest;
use Lily\AppBundle\Controller\BaseController;

class AppController extends BaseController
{

    public function indexAction($licence) {

        // Services
        $em = $this->getEntityManager($licence);
        $config = $this->getAppConfig($licence);
        $redirection = $this->getDefaultRedirection($licence);
        $chatAvailable = $this->isChatAvailable($licence);
        $synapsePassword = $this->getSynapsePassword($licence);

        $ip = $this->container->get('request')->getClientIp();
        $session = $this->container->get('session');
        if (!$session->isStarted()) {
            $session->start();
        }

        return $this->render('LilyAppBundle:themes:lily/index.html.twig',
          array('licence' => $licence,
                'synapsePassword' => $synapsePassword,
                'config' => $config,
                'visitorIp' => $ip,
                'redirection' => $redirection,
                'chatAvailable' => $chatAvailable
        ));
    }

    public function indexv1Action($licence) {

        // Services
        $em = $this->getEntityManager($licence);
        $config = $this->getAppConfig($licence);
        $redirection = $this->getDefaultRedirection($licence);
        $chatAvailable = $this->isChatAvailable($licence);
        $synapsePassword = $this->getSynapsePassword($licence);

        $ip = $this->container->get('request')->getClientIp();
        $session = $this->container->get('session');
        if (!$session->isStarted()) {
            $session->start();
        }

        return $this->render('LilyAppBundle:themes:lily/index.v1.html.twig',
          array('licence' => $licence,
                'synapsePassword' => $synapsePassword,
                'config' => $config,
                'visitorIp' => $ip,
                'redirection' => $redirection,
                'chatAvailable' => $chatAvailable
        ));
    }

    public function trackingAction($licence) {
        $config = $this->getAppConfig($licence);
        // Return if Maintenance is On
        if ( $config->getMaintenance() ) {
            return new Response(null, 200, array(
              'content-type'=> 'text/javascript')
            );
        }
        $trackerJS = $this->render('LilyAppBundle::tracker.js.twig', array(
          'licence' => $licence,
          'widget' => $config->getWidget()
          )
        );
        $response = new Response(
          $trackerJS->getContent(), 200, array(
            'content-type' => 'text/javascript'
          )
        );
        return $response;
    }


    public function loaderAction($licence) {

        $config = $this->getAppConfig($licence);

        // Return if Maintenance is On
        if ( $config->getMaintenance() ) {
            return new Response(null, 200, array(
              'content-type'=> 'text/javascript')
            );
        }

        $loaderJS = $this->render('LilyAppBundle::loader.js.twig', array(
          'licence' => $licence,
          'widget' => $config->getWidget()
          )
        );

        $response = new Response(
          $loaderJS->getContent(), 200, array(
            'content-type' => 'text/javascript'
          )
        );

        return $response;
    }

    public function snippetAction($licence) {

        $config = $this->getAppConfig($licence);
        $env = $this->get('kernel')->getEnvironment();
        $path = $env == 'dev' ? '/app_dev.php' : '';
        $widgetOrigin = $this->getRequest()->getHttpHost() . $path;

        $snippetJS = $this->render('LilyAppBundle::snippet.js.twig', array(
          'licence' => $licence,
          'widgetOrigin' => $widgetOrigin,
          )
        );

        $response = new Response(
          $snippetJS->getContent(), 200, array(
            'content-type' => 'text/javascript; charset=utf-8'
          )
        );

        return $response;
    }

    /**
     * @Post("/{licence}/mail")
     */
    public function postEmailAction($licence, Request $request) {

        $from = $request->get('from');
        $object = $request->get('object');
        $msg = $request->get('msg');
        $date = $request->get('date');
        $time = $request->get('time');
        $tel = $request->get('tel');

        $redirection = $this->getEntityManager($licence)
        ->getRepository('LilyKnowledgeBundle:Redirection')
        ->findOneByBydefault(true);

        $message = \Swift_Message::newInstance()
        ->setSubject($object)
        ->setFrom('noreply@saio.fr')
        ->setTo($redirection->getMail())
        ->setBody(
            $this->renderView(
                '::mails/redirection.txt.twig',
                array(
                  'from' => $from,
                  'msg' => $msg,
                  'date' => $date,
                  'time' => $time,
                  'tel' => $tel
                )
            )
        );

        $this->get('mailer')->send($message);

        return true;

    }

}
