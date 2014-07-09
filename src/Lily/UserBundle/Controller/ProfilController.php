<?php

namespace Lily\UserBundle\Controller;

use Lily\UserBundle\Entity\User;
use Lily\UserBundle\Form\UserType;
use Lily\BackOfficeBundle\Controller\BaseController;

class ProfilController extends BaseController
{
    public function indexAction()
    {        
    	$user = $this->getUser();
    	$logo = $user->getEnterprise()->getLogo();
		$form = $this->createForm(new UserType, $user);
 
		$request = $this->get('request');
		if ($request->getMethod() == 'POST') {
			$form->bind($request); 
			
			$em = $this->getDoctrine()->getManager();
			$em->persist($user);
			$em->flush();
 
			return $this->redirect($this->generateUrl('lily_profil'));
		}
		
        // On récupère les logs d'activités
        $activities = $this->getEntityManager()
    			     ->getRepository('Lily\BackOfficeBundle\Loggable\Entity\LogEntry')
					 ->findBy(array('username' => $user->getUsername()), array('loggedAt' => 'DESC'), 40);   
 
    	return $this->render('LilyUserBundle:Profil:index.html.twig', array('form' => $form->createView(), 'activities' => $activities, 'logo' => $logo));
    	    
    }
}

    	        