<?php

namespace Lily\HomePageBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class SaioController extends Controller
{

    public function indexAction()
    {
        return $this->render('LilyHomePageBundle:fr:index.html.twig');
    }
 
    public function productsAction()
    {
        return $this->render('LilyHomePageBundle:fr:products.html.twig');
    }
    
    public function referencesAction()
    {
        return $this->render('LilyHomePageBundle:fr:references.html.twig');
    }
    
    public function caseStudiesAction()
    {
        return $this->render('LilyHomePageBundle:fr:case_studies.html.twig');
    }
    
    public function teamAction()
    {
        return $this->render('LilyHomePageBundle:fr:team.html.twig');
    }
    
    public function blogAction()
    {
        return $this->render('LilyHomePageBundle:fr:blog.html.twig');
    }
    
    public function articlesAction($id) {
	    return $this->render('LilyHomePageBundle:fr:articles/article'.$id.'.html.twig');
    }
    
    public function contactAction()
    {
 
		$request = $this->get('request');
		
		if ($request->getMethod() == 'POST') {
		
			$firstname = $request->get('firstname');
			$lastname = $request->get('lastname');
			$enterprise = $request->get('enterprise');
			$object = $request->get('object');
			$from = $request->get('mail');
			$msg = $request->get('msg');
		
			$message = \Swift_Message::newInstance()
				->setSubject($object)
				->setFrom('mailer@saio.fr')
				->setTo('contact@saio.fr')
				->setBody(
					$this->renderView(
					'LilyHomePageBundle:Fr:email.txt.twig',
					array('firstname' => $firstname, 'lastname' => $lastname, 'object' => $object, 'enterprise' => $enterprise, 'msg' => $msg, 'from' => $from)
					)
				);
				
			$this->get('mailer')->send($message);
			
			return $this->redirect($this->generateUrl('home_contact'));
		}

        return $this->render('LilyHomePageBundle:fr:contact.html.twig');
        
    }
    
    public function disclaimerAction()
    {
        return $this->render('LilyHomePageBundle:fr:disclaimer.html.twig');
    }

    public function loginAction()
    {
        return $this->render('LilyHomePageBundle:fr:index.html.twig');
    }
    
}
