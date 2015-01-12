<?php

namespace Lily\UserBundle\Controller;

use Lily\BackOfficeBundle\Controller\BaseController;
use Lily\UserBundle\Form\UserGroupType;

use Symfony\Component\HttpFoundation\Request;

use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Delete;
use FOS\RestBundle\Controller\Annotations\View;

use JMS\SecurityExtraBundle\Annotation\Secure;

class GroupController extends BaseController
{
  
    /**
     * @Get("/groups")
     * @Secure(roles="ROLE_USER")
     */
    public function getGroupsAction() {
        $groups = $this->get('fos_user.group_manager')->findGroups();
        return $groups;
    }
    
    /**
     * @Get("/groups/{id}")
     * @Secure(roles="ROLE_ADMIN")
     */
    public function getGroupAction($id) {
      
        $group = $this->findGroupBy('id', $id);

        //Security check
        $client = $this->getClient();
        
        if(!$group || $group->getClient() !== $client) {
            throw $this->createNotFoundException();
        }
    
        $view = $this->view($group);
        return $this->handleView($view);
        
    }

    /**
     * @Delete("/groups/{id}", requirements={"id" = "\d+"})
     * @Secure(roles="ROLE_ADMIN")
     * @View(statusCode=204)
     */
    public function deleteAction($id) {
    
        $group = $this->findGroupBy('id', $id);

        //Security check
        $client = $this->getClient();
        
        if(!$group || $group->getClient() !== $client) {
            throw $this->createNotFoundException();
        }
		
        $this->get('fos_user.group_manager')->deleteGroup($group);
       
    }

    /**
     * @Put("/groups/{id}", requirements={"id" = "\d+"})
     */
    public function putAction($id, Request $request) {

        $group = $this->findGroupBy('id', $id);

        //Security check
        $client = $this->getClient();
        
        if(!$group || $group->getClient() !== $client) {
            throw $this->createNotFoundException();
        }
        
        $form = $this->getForm(new UserGroupType(), $group, $request);   

        if ($form->isValid()) {

            $this->get('fos_user.group_manager')->updateGroup($group);
            
            $view = $this->view($group);
            return $this->handleView($view);
        } 
        
        $view = $this->view($form, 400);
        return $this->handleView($view);
     
    }

    /**
     * @Post("/groups")
     */
    public function postAction(Request $request) {
        
        $groupManager = $this->get('fos_user.group_manager');
        $group = $groupManager->createGroup('');

        $form = $this->getForm(new UserGroupType(), $group, $request);
        
        if ($form->isValid()) {

            $group->setClient($this->getClient());
            $groupManager->updateGroup($group);
            
            $view = $this->view($group);
            return $this->handleView($view);
        
        } 
        
        $view = $this->view($form, 400);
        return $this->handleView($view);

    } 
    
    /**
     * Find a group by a specific property
     *
     * @param string $key   property name
     * @param mixed  $value property value
     *
     * @throws NotFoundHttpException                if user does not exist
     * @return \FOS\UserBundle\Model\GroupInterface
     */
    protected function findGroupBy($key, $value)
    {
        if (!empty($value)) {
            $group = $this->get('fos_user.group_manager')->findGroupBy(array($key => $value));
        }
        if (empty($group)) {
            throw new NotFoundHttpException(sprintf('The group with "%s" does not exist for value "%s"', $key, $value));
        }
        return $group;
    }
}
