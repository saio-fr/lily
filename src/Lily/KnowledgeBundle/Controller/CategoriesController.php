<?php

namespace Lily\KnowledgeBundle\Controller;

use Symfony\Component\HttpFoundation\Request;

use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Delete;
use FOS\RestBundle\Controller\Annotations\View;

use JMS\Serializer\SerializationContext;
use JMS\SecurityExtraBundle\Annotation\Secure;

use Lily\KnowledgeBundle\Entity\Category;
use Lily\KnowledgeBundle\Form\CategoryType;
use Lily\BackOfficeBundle\Controller\BaseController;

class CategoriesController extends BaseController
{

    /**
     * @Get("/categories")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     * @View(serializerGroups={"categories"})
     */
    public function getAllAction() {
  
        $categories = $this->getEntityManager()
        ->getRepository('LilyKnowledgeBundle:Category')
        ->findByParent(NULL);
    
        return $categories;
    }
  
    /**
     * @Get("/categories/{id}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function getAction($id) {
  
        $category = $this->getEntityManager()
        ->getRepository('LilyKnowledgeBundle:Category')
        ->find($id);
    
        if (!$category) {
          throw $this->createNotFoundException();
        }
    
        $view = $this->view($category);
        return $this->handleView($view);
    }
  
    /**
     * @Post("/categories")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function postAction(Request $request) {
    
        $em = $this->getEntityManager();
        
        $category = new Category();
        $form = $this->getForm(new CategoryType(), $category, $request);
        
        if ($form->isValid()) {
    
            $em->persist($category);
            $em->flush();
        
            $view = $this->view($category);
            return $this->handleView($view);
                   
        } else {
          
            $view = $this->view($form, 400);
            return $this->handleView($view); 
        }
    }
  
    /**
     * @Put("categories/{id}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function updateAction($id, Request $request) {
    
        $em = $this->getEntityManager();
        
        if ($id) {
        
            $category = $em->getRepository('LilyKnowledgeBundle:Category')
            ->find($id);
            
            if (!$category) {
                throw $this->createNotFoundException();
            }
    
            $form = $this->getForm(new CategoryType(), $category, $request);
        
            foreach ($category->getQuestions() as $question) {
                $question->setCategory($category);
                $em->persist($question);
            }
        
            $em->persist($category);
            $em->flush();
        
            $view = $this->view($category);
            return $this->handleView($view);
        }
        
        else {
          
            $questions = $request->get('questions');
            
            foreach ($questions as $id) {
              
                $question = $em->getRepository('LilyKnowledgeBundle:Question')
                ->find($id);
                
                $question->setCategory(null);
                $em->persist($question);
            }
            
            $em->flush();
            return true;
        }
        
    }
  
    /**
     * @Delete("/categories/{id}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     * @View(statusCode=204)
     */
    public function deleteAction($id) {
  
        $em = $this->getEntityManager();
    
        $category = $em->getRepository('LilyKnowledgeBundle:Category')
        ->find($id);
        
        if (!$category) {
            throw $this->createNotFoundException();
        }
    
        $em->remove($category);
        $em->flush();
    }

}
