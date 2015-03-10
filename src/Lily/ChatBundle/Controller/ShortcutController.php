<?php

namespace Lily\ChatBundle\Controller;

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

use Lily\ChatBundle\Entity\Shortcut;
use Lily\ChatBundle\Form\ShortcutType;
use Lily\BackOfficeBundle\Controller\BaseController;

class ShortcutController extends BaseController
{

    /**
     * @Get("/shortcuts")
     * @Secure(roles="ROLE_CHAT_OPERATOR")
     * @View()
     */
    public function getAllAction()
    {
      
        $operator = $this->getUser()->getId();
      
        $shortcuts = $this->getEntityManager()
        ->getRepository('LilyChatBundle:Shortcut')
        ->findByOperator($operator);
        
        return $shortcuts;
    }
    
    /**
     * @Get("/shortcuts/{id}")
     * @Secure(roles="ROLE_CHAT_OPERATOR")
     * @View()
     */
    public function getAction($id)
    {
        $shortcut = $this->getEntityManager()
        ->getRepository('LilyChatBundle:Shortcut')
        ->find($id);
        
        return $shortcut;
    }

    /**
     * @Post("/shortcuts")
     * @Secure(roles="ROLE_CHAT_OPERATOR")
     * @View()
     */
    public function postAction(Request $request)
    {
        $em = $this->getEntityManager();
        $operator = $this->getUser()->getId();
        
        $shortcut = new Shortcut();
        $form = $this->getForm(new ShortcutType(), $shortcut, $request);
        
        if ($form->isValid()) {
            
            $shortcut->setOperator($operator);
            $em->persist($shortcut);
            $em->flush();
            
            return $shortcut;
        }

        $view = $this->view($form, 400);
        return $this->handleView($view);
    }
    
    /**
     * @Put("/shortcuts/{id}")
     * @Secure(roles="ROLE_CHAT_OPERATOR")
     * @View()
     */
    public function putAction($id, Request $request)
    {
        $em = $this->getEntityManager();
        $operator = $this->getUser()->getId();
        
        $shortcut = $em->getRepository('LilyChatBundle:Shortcut')
        ->find($id);
        
        if ($shortcut->getOperator() !== $operator) {
          throw new \Exception("You cannot change a shortcut that's not your own.");
        }
        
        $form = $this->getForm(new ShortcutType(), $shortcut, $request);
        
        if ($form->isValid()) {
      
            $em->persist($shortcut);
            $em->flush();
            
            return $shortcut;
        }
          
        $view = $this->view($form, 400);
        return $this->handleView($view); 
    }

    /**
     * @Delete("/shortcuts/{id}")
     * @Secure(roles="ROLE_CHAT_OPERATOR")
     * @View(statusCode=204)
     */
    public function deleteAction($id)
    {   
        $em = $this->getEntityManager();
        $operator = $this->getUser()->getId();
		
        $shortcut = $em->getRepository('LilyChatBundle:Shortcut')
        ->find($id);
              
        if ($shortcut->getOperator() !== $operator) {
          throw new \Exception("You cannot delete a shortcut that's not your own.");
        }
    			   
        $em->remove($shortcut);
        $em->flush();
    }

}
