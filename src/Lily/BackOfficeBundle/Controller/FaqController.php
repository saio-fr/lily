<?php

namespace Lily\BackOfficeBundle\Controller;

use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\HttpFoundation\Request;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Delete;
use FOS\RestBundle\Controller\Annotations\View;

use JMS\SecurityExtraBundle\Annotation\Secure;

use Lily\KnowledgeBundle\Entity\Faq;
use Lily\KnowledgeBundle\Form\FaqType;
use Lily\BackOfficeBundle\Controller\BaseController;

class FaqController extends BaseController
{

   /**
    * @Template()
    */
    public function indexAction()
    {
        if (!$this->getUser()->getClient()->getConfig()->getFaq()) {
            throw new AccessDeniedException();
        }
    }

    /**
     * @Get("/faqs/{parent}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     * @View()
     */
    public function getAction($parent)
    {

        if ($parent == 'null') $parent = NULL;

        $faq = $this->getEntityManager()
                    ->getRepository('LilyKnowledgeBundle:Faq')
                    ->findByParent($parent);

        return $faq;

    }

    /**
     * @Get("/faqs/breadcrumbs/{id}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function getBreadcrumbsAction($id)
    {

        if ($id == 'null') {
            $breadcrumbs[] = array('link' => '', 'title' => 'Accueil');
            return $breadcrumbs;
        }

        $faq = $this->getEntityManager()
                    ->getRepository('LilyKnowledgeBundle:Faq')
                    ->find($id);

        if (!$faq) {
            throw $this->createNotFoundException();
        }

        $current = $faq;

        $breadcrumbs[] = array('link' => 'category/'.$faq->getId() ,'title' => $current->getTitle());

        while ($faq->getParent()) {
            $title = $faq->getParent()->getTitle();
            $breadcrumbs[] = array('link' => 'category/'.$faq->getParent()->getId(), 'title' => $title);
            $faq = $faq->getParent();
        }

        $breadcrumbs[] = array('link' => '', 'title' => 'Accueil');

        return $breadcrumbs;

    }

    /**
     * @Post("/faqs/{parent}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function createAction($parent, Request $request)
    {
        $em = $this->getEntityManager();
    	  
        if ($parent == 0) $parent = NULL;

        else $parent = $em->getRepository('LilyKnowledgeBundle:Faq')
                          ->find($parent);


        $faq = $this->deserialize('Lily\KnowledgeBundle\Entity\Faq', $request);
        $faq->setParent($parent);
        $faq->setPosition(-1);

        if ($faq instanceof Faq === false) {
            $view = $this->view($faq, 400);
            return $this->handleView($view);
        }

        $em->persist($faq);
        $em->flush();
			
        $view = $this->view($faq);
        return $this->handleView($view);
    }

    /**
     * @Put("/faqs/{id}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     */
    public function updateAction($id, Request $request)
    {
        $em = $this->getEntityManager();
    	
        $faq = $em->getRepository('LilyKnowledgeBundle:Faq')
                  ->find($id); 	
		
        $form = $this->getForm(new FaqType(), $faq, $request);   
        
        if ($form->isValid()) {

            $em->persist($faq);
            $em->flush();
            $view = $this->view($faq);
            return $this->handleView($view);

        }

        $view = $this->view($form, 400);
        return $this->handleView($view);
    }

    /**
     * @Delete("/faqs/{id}")
     * @Secure(roles="ROLE_KNOWLEDGE_OPERATOR")
     * @View(statusCode=204)
     */
    public function deleteAction($id)
    {   
        $em = $this->getEntityManager();
		
        $faq = $em->getRepository('LilyKnowledgeBundle:Faq')
        ->find($id); 
    			   
        $em->remove($faq);
        $em->flush();

    }

}
