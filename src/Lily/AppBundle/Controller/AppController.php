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

        $session = $this->container->get('session');
        if (!$session->isStarted()) {
            $session->start();
        }

        return $this->render('LilyAppBundle:themes:lily/index.html.twig',
          array('licence' => $licence,
                'config' => $config,
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

    /**
     * @Get("/{licence}/faq/{id}")
     * @View()
     */
    public function getFaqAction($licence, $id) {

        // On initialise nos variables
        $em = $this->getEntityManager($licence);
        $session = $this->container->get('session');

        if (strtolower($id) == 'null') { $id = NULL; }

        // On récupère les catégories enfants
        $faqs = $em->getRepository('LilyKnowledgeBundle:Faq')
        ->findByParent($id);

        if ($id) {

            // On récupère l'id du parent
            $faq = $em->getRepository('LilyKnowledgeBundle:Faq')
            ->findOneById($id);

            // On crée un log de requete
            $request = new LogRequest();
            $request->setSession($session->getId());

            $this->setMedia($request);
            $request->setFaq($faq);

            $em->persist($request);
            $em->flush();

            $title = $faq->getTitle();

            if ($faq->getParent()) { $parent = $faq->getParent()->getId(); }
            else { $parent = 'NULL'; }

        } else {
            $id = 'NULL';
            $parent = 'NULL';
            $title = 'NULL';
        }

        return array(
            'parent' => $parent,
            'id' => $id,
            'title' => $title,
            'faqs' => $faqs
        );
    }

    /**
     * @Get("/{licence}/top-questions/{id}")
     * @View()
     */
    public function getTopQuestionsAction($licence, $id) {

        $em = $this->getEntityManager($licence);

        $from = new \Datetime('-1 month');
        $to = new \Datetime();

        if (!$id) {
            // On récupère le top des questions
            $requests = $em->getRepository('LilyAppBundle:LogRequest')
            ->topQuestions($from, $to, 10);

            $questions = [];

            foreach ($requests as $item) {
                $question = $item[0];
                $questions[] = $question;
            }

        } else {
            $questions = $em->getRepository('LilyKnowledgeBundle:Question')
            ->find($id);
        }

        return $questions;
    }

    /**
     * @Post("/{licence}/mail")
     */
    public function postEmailAction($licence, Request $request) {

        $from = $request->get('from');
        $object = $request->get('object');
        $msg = $request->get('msg');
        $date =$request->get('date');
        $time =$request->get('time');

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
                array('from' => $from, 'msg' => $msg)
            )
        );

        $this->get('mailer')->send($message);

        return true;

    }

}
