<?php

namespace Lily\BackOfficeBundle\Controller;


use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class DashboardController extends BaseController
{
	/**
	 * 
	 * @Template()
	 */
    public function indexAction()
    {    	
    	
		$to = new \Datetime();
		$from = new \Datetime('-1 month');
		
    	// On récupère les fichiers de logs    	
    	$activities = $this->getEntityManager()
    					   ->getRepository('Lily\BackOfficeBundle\Loggable\Entity\LogEntry')
    					   ->findBy(array(), array("loggedAt" => "DESC"), 5);  	
    	
    	// Requests    			     	 
    	$requests = $this->getEntityManager()
    			     	 ->getRepository('LilyApiBundle:LogRequest')
    			     	 ->requests($from, $to); 
		
		// On calcul l'économie réalisée
		$saving = ($requests/4)*2.30;
	
		// chargements
		$loadings = $this->getEntityManager()
    			     	 ->getRepository('LilyApiBundle:LogRequest')
					 	 ->uniqueUsers($from, $to);
		// taux d'utilisation
		$visitors = $this->getEntityManager()
    			     	  ->getRepository('LilyApiBundle:LogConnection')
					 	  ->uniqueVisitors($from, $to);
		
		if ($visitors !== '0') {
			$usage = floor(($loadings/$visitors)*100);
		} else $usage = 0;
		
		// taux de redirection
		$redirections = $this->getEntityManager()
    			     	  	 ->getRepository('LilyApiBundle:LogRedirection')
					 	  	 ->redirections($from, $to);
		
		if ($requests !== '0') {
			$redirection = round(($redirections/$requests)*100, 2);
		} else $redirection = 0;
		
		// taux de satisfaction
		$satisfaction = $this->getEntityManager()
    			     	 	  ->getRepository('LilyApiBundle:LogNotation')
					 	 	  ->averageSatisfaction($from, $to);
		
		$satisfaction = round($satisfaction, 0);
					 	 	  
		// top des questions
		$top_questions = $this->getEntityManager()
    			          	  ->getRepository('LilyApiBundle:LogRequest')
						  	  ->topQuestions($from, $to);
 
        return array('activities' => $activities, 'saving' => $saving, 'loadings' => $loadings, 'usage' => $usage, 'redirection' => $redirection, 'satisfaction' => $satisfaction, 'top_questions' => $top_questions);   
    }
}