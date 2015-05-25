<?php

namespace Lily\AppBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\Controller\Annotations\View;

use JMS\Serializer\SerializationContext;

use Lily\AppBundle\Entity\LogNotation;
use Lily\AppBundle\Entity\LogRequest;
use Lily\AppBundle\Entity\LogRedirection;
use Lily\AppBundle\Entity\LogUnanswered;

use Lily\AppBundle\Controller\BaseController;

class AviController extends BaseController
{
  
    /**
     * @Get("/{licence}/question/{id}")
     */
    public function getQuestionAction($licence, $id) {
      
        // Initialisation des variables
        $em = $this->getEntityManager($licence);
        $question = $em->getRepository('LilyKnowledgeBundle:Question')
        ->find($id);

        if (!$question) {
          throw $this->createNotFoundException();
        }

        $context = new SerializationContext();

        $context->setGroups(array('app'));
        $view = $this->view($question)->setSerializationContext($context);
        
        return $this->handleView($view);
    }
    
    
    /**
     * @Post("/{licence}/log/request/{id}")
     */
    public function postLogRequestAction($licence, $id, Request $request) {
      
        $em = $this->getEntityManager($licence);
        $log = $this->deserialize('Lily\AppBundle\Entity\LogRequest', $request);
        
        if ($log instanceof LogRequest === false) {
            $view = $this->view($log, 400);
            return $this->handleView($view);
        }
        
        if ($id) {
            $question = $em->getRepository('LilyKnowledgeBundle:Question')
            ->find($id);

            if (!$question) {
                throw $this->createNotFoundException();
            }

            $log->setQuestion($question);
        }

        $log->setSession($request->cookies->get('PHPSESSID'));
        $log->setDate(new \Datetime());
        $this->setMedia($log);
        
        $em->persist($log);
        $em->flush();
        
        return true;
    }
    
    
    /**
     * @Post("/{licence}/log/unanswered")
     */
    public function postLogUnansweredAction($licence, Request $request) {
      
        $em = $this->getEntityManager($licence);
        $unanswered = $this->deserialize('Lily\AppBundle\Entity\LogUnanswered', $request);
        
        if ($unanswered instanceof LogUnanswered === false) {
            $view = $this->view($unanswered, 400);
            return $this->handleView($view);
        }
        
        $this->setMedia($unanswered);
        $unanswered->setSession($request->cookies->get('PHPSESSID'));
        $unanswered->setDate(new \Datetime());
        
        $em->persist($unanswered);
        $em->flush();
      
        return true;
    }


    /**
     * @Post("/{licence}/log/satisfaction/question/{id}")
     */
    public function postLogNotationAction($licence, $id, Request $request) {

        $em = $this->getEntityManager($licence);
        $notation = $this->deserialize('Lily\AppBundle\Entity\LogNotation', $request);

        if ($notation instanceof LogNotation === false) {
            $view = $this->view($notation, 400);
            return $this->handleView($view);
        }

        $question = $em->getRepository('LilyKnowledgeBundle:Question')
        ->find($id);

        $notation->setSession($request->cookies->get('PHPSESSID'));
        $notation->setQuestion($question);
        $notation->setDate(new \Datetime());

        $em->persist($notation);
        $em->flush();
        
        return true;
    }
    

    /**
     * @Post("/{licence}/log/redirection")
     */
    public function postLogRedirectionAction($licence, Request $request) {

        $em = $this->getEntityManager($licence);
        $logRedirection = $this->deserialize('Lily\AppBundle\Entity\LogRedirection', $request);

        if ($logRedirection instanceof LogRedirection === false) {
            $view = $this->view($logRedirection, 400);
            return $this->handleView($view);
        }
        
        $this->setMedia($logRedirection);
        $logRedirection->setSession($request->cookies->get('PHPSESSID'));
        $logRedirection->setDate(new \Datetime());

        $em->persist($logRedirection);
        $em->flush();
        
        return true;
    }
  
}