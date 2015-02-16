<?php

namespace Lily\KnowledgeBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use Doctrine\Common\Collections\ArrayCollection;

use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Delete;
use FOS\RestBundle\Controller\Annotations\View;

use JMS\Serializer\SerializationContext;
use JMS\SecurityExtraBundle\Annotation\Secure;

use Lily\KnowledgeBundle\Entity\Question;
use Lily\KnowledgeBundle\Form\QuestionType;
use Lily\BackOfficeBundle\Controller\BaseController;

class QuestionsController extends BaseController
{

    /**
     * @Post("/questions/sort")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     * @View(serializerGroups={"list"})
     */
    public function postSortAction(Request $request)
    {
        $data = json_decode($request->getContent());
        
        $questions = $this->getEntityManager()
        ->getRepository('LilyKnowledgeBundle:Question')
        ->sortQuestions($data);

        $counter = $this->getEntityManager()
        ->getRepository('LilyKnowledgeBundle:Question')
        ->countSortedQuestions($data);

        return array(
            'questions' => $questions, 
            'counter' => $counter
        );
    }

    /**
     * @Get("/questions/{id}", requirements={"id" = "\d+"})
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function getAction($id)
    {
        $question = $this->getEntityManager()
        ->getRepository('LilyKnowledgeBundle:Question')
        ->find($id);

        if (!$question) {
            throw $this->createNotFoundException();
        }

        return $question;
    }

    /**
     * @Post("/questions")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function postAction(Request $request)
    {
  
        $question = $this->deserialize('Lily\KnowledgeBundle\Entity\Question', $request);
  
        if ($question instanceof Question === false) {
            $view = $this->view($question, 400);
            return $this->handleView($view);
        }

        $user = $this->getUser();
        $question->setModifiedBy($user->getLastname() . ' ' . $user->getFirstname());
  
        $em = $this->getEntityManager();
        $em->persist($question);
        $em->flush();
  
/*
        if (!$parent) {
  
            // On récupère le client
            $cname = $this->getEnterprise()->getCname();
            $client = $this->get('solarium.client.' . $cname);
    
            // On crée l'update query
            $update = $client->createUpdate();
    
            // On crée les documents
            $documents[] = $question->toSolrDocument($update->CreateDocument());
    
            $update->addDocuments($documents);
            $update->addCommit();
      
            // On exécute la query
            $client->update($update);
  
        }
*/
  
        return $question;
    }

    /**
     * @Put("/questions/{id}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     * @View()
     */
    public function putAction($id, Request $request)
    {
        $em = $this->getEntityManager();
  
        $question = $this->getEntityManager()
        ->getRepository('LilyKnowledgeBundle:Question')
        ->find($id);
         
        $originalChildren = new ArrayCollection();

        // Crée un tableau contenant les objects children courants de la
        // base de données
        foreach ($question->getChildren() as $child) {
            $originalChildren->add($child);
        }
  
        $form = $this->getForm(new QuestionType(), $question, $request);
        
        foreach ($originalChildren as $child) {
            if ($question->getChildren()->contains($child) == false) {
                // Delete the child question entity
                $em->remove($child);
            }
        }
  
        $user = $this->getUser();
        $question->setModifiedBy($user->getLastname() . ' ' . $user->getFirstname());
  
        $em->persist($question);
        $em->flush();
  
        /*
        if (!$parent) {
  
            // On récupère le client
            $cname = $this->getEnterprise()->getCname();
            $client = $this->get('solarium.client.' . $cname);
      
            // On crée l'update query
            $update = $client->createUpdate();
      
            // On crée les documents
            $documents[] = $question->toSolrDocument($update->CreateDocument());
      
            $update->addDeleteQuery('id:' . $id);
            $update->addDocuments($documents);
            $update->addCommit();
      
            // On exécute la query
            $client->update($update);
  
        }
        */
  
        return $question;
    }

    /**
     * @Delete("/questions/{id}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     * @View(statusCode=204)
     */
    public function deleteAction($id)
    {

        $em = $this->getEntityManager();

        $question = $em->getRepository('LilyKnowledgeBundle:Question')
        ->find($id);
    
        if (!$question) {
            throw $this->createNotFoundException();
        }

        /*
        // On supprime la question de l'index
        $client = $this->get('solarium.client.' . $licence);
        $update = $client->createUpdate();
    
        $update->addDeleteQuery('id:' . $id);
        $update->addCommit();
        $client->update($update);
        */
    
        $em->remove($question);
        $em->flush();
    }

    /**
     * @Get("questions/{id}/versions")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     * @View()
     */
    public function getVersionsAction($id)
    {

        $versions = $this->getEntityManager()
        ->getRepository('Lily\BackOfficeBundle\Loggable\Entity\LogEntry')
        ->findBy(array('objectId' => $id), array("loggedAt" => "DESC"));
  
        $versions = array_slice($versions, 0, 5);
  
        $question = $this->getEntityManager()
        ->getRepository('Lily\KnowledgeBundle\Entity\Question')
        ->findById($id);
  
        return array(
            'versions' => $versions, 
            'question' => $question
        );
    }

    /**
     * @Put("questions/{id}/versions/{version}/revert")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     * @View()
     */
    public function putVersionAction($id, $version)
    {

        $em = $this->getEntityManager();

        $question = $em->getRepository('LilyKnowledgeBundle:Question')
        ->find($id);

        $em->getRepository('Lily\BackOfficeBundle\Loggable\Entity\LogEntry')
        ->revert($question, $version);

        $em->persist($question);
        $em->flush();

        return $question;
    }

    /**
     * @Put("questions/{id}/versions/setchildren")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     * @View()
     */
    public function setChildrenVersionAction($id)
    {

        $em = $this->getEntityManager();

        $question = $em->getRepository('LilyKnowledgeBundle:Question')
        ->find($id);

        $versions = $em->getRepository('Lily\BackOfficeBundle\Loggable\Entity\LogEntry')
        ->findByObjectId($id);

        if (!$question->getChildren()->isEmpty()) {

            foreach ($versions as $version) {
                $version->setChildren($question->getChildren()->toArray());

                $em->persist($version);
                $em->flush();
            }
        }

        return true;
    }
}