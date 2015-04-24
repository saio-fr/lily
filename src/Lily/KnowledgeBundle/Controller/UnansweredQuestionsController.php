<?php

namespace Lily\KnowledgeBundle\Controller;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Request;

use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Delete;
use FOS\RestBundle\Controller\Annotations\View;

use Lily\KnowledgeBundle\Entity\UnansweredQuestion;
use Lily\KnowledgeBundle\Form\UnansweredQuestionType;

use JMS\SecurityExtraBundle\Annotation\Secure;

use Lily\BackOfficeBundle\Controller\BaseController;

class UnansweredQuestionsController extends BaseController
{
    
	/**
     * @Get("/unanswered")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function getQuestionsAction()
    {    
   		
	$questions = $this->getEntityManager()
        ->getRepository('LilyKnowledgeBundle:UnansweredQuestion')
        ->findAll();

	$view = $this->view($questions);
        return $this->handleView($view);
    }
    
    /**
     * @Post("/unanswered")
     */
    public function postAction(Request $request)
    {

        $em = $this->getEntityManager();

        $question = new UnansweredQuestion();
        $form = $this->getForm(new UnansweredQuestionType(), $question, $request);

        if ($form->isValid()) {

            $em->persist($question);
            $em->flush();

            return $question;
        }

        $view = $this->view($form, 400);
        return $this->handleView($view);
    }

    /**
     * @Get("/unanswered/{id}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function getAction($id)
    {   

        $question = $this->getEntityManager()
		->getRepository('LilyKnowledgeBundle:UnansweredQuestion')
		->find($id);
    					  
        if (!$question) {
            throw $this->createNotFoundException();
        }
   		
		$view = $this->view($question);
		return $this->handleView($view);
    }
        
    /**
     * @Delete("/unanswered/{id}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     * @View(statusCode=204)
     */
    public function deleteAction($id)
    {       	
		
		$em = $this->getEntityManager();

		$question = $em->getRepository('LilyKnowledgeBundle:UnansweredQuestion')
		->find($id);

        $em->remove($question);
        $em->flush();
    }
        
}
