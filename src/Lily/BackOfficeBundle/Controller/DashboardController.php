<?php

namespace Lily\BackOfficeBundle\Controller;

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
    					   ->findBy(array("username" => $this->getUser()->getUsername()), array("loggedAt" => "DESC"), 5);
	    

		$requests = $this->getEntityManager()
			     	 	 ->getRepository('LilyApiBundle:LogRequest')
				 	 	 ->requests($from, $to, null); 
		
		// SAVINGS INT
		$saving = ($requests/4)*2.30;
		
		// LOADINGS INT
		$loadings = $this->getEntityManager()
			     	 	 ->getRepository('LilyApiBundle:LogRequest')
				 	 	 ->uniqueUsers($from, $to, null);

	    
	    // VISITORS INT
		$visitors = $this->getEntityManager()
			     	  	 ->getRepository('LilyApiBundle:LogConnection')
				 	  	 ->uniqueVisitors($from, $to, null);
		
		// USAGE RATE
		if ($visitors > 0) {
			$usage = floor(($loadings/$visitors)*100);
		} else $usage = 0;
	    
	    // REDIRECTION RATE			
		$redirections = $this->getEntityManager()
    			     	  	 ->getRepository('LilyApiBundle:LogRedirection')
					 	  	 ->redirections($from, $to);
		
		if ($requests > 0) {
			$redirection = round(($redirections/$requests)*100, 2);
		} else $redirection = 0;

	   
	    
		// SATISFACTION RATE
		$notations = $this->getEntityManager()
			     	 	  ->getRepository('LilyApiBundle:LogNotation')
				 	 	  ->notations($from, $to, true, null);
		
		if ($notations !== '0') { 
			
			$satisfied = $this->getEntityManager()
			     	 	  	  ->getRepository('LilyApiBundle:LogNotation')
				 	 	  	  ->notations($from, $to, true, null);
				 	 	  	  
			$satisfaction = ($satisfied / $notations) * 100; 
		
		} else { $satisfaction = '0'; }

	    
	    // TOP QUESTIONS LIST						 	 	  
		$topQuestions = $this->getEntityManager()
    			          	  ->getRepository('LilyApiBundle:LogRequest')
						  	  ->topQuestions($from, $to);

        return array('activities' => $activities, 'saving' => $saving, 'loadings' => $loadings, 'usage' => $usage, 'redirection' => $redirection, 'satisfaction' => $satisfaction, 'top_questions' => $topQuestions);   
    }
}