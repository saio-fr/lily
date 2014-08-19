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
		
		$cname = $this->getEnterprise()->getCname();	    
	    
	    // ACTIVITIES LIST
	    $activities = $this->get('memcache.default')->get('dashboard_activities_'.$cname);
		
		if (!$activities) {
		
	    	// On récupère les fichiers de logs    	
	    	$activities = $this->getEntityManager()
	    					   ->getRepository('Lily\BackOfficeBundle\Loggable\Entity\LogEntry')
	    					   ->findBy(array(), array("loggedAt" => "DESC"), 5);
	    					   
	    	$this->get('memcache.default')->set('dashboard_activities_'.$cname, $activities, 86400);
	    
	    }
	    
	    // REQUESTS INT
	    $requests = $this->get('memcache.default')->get('dashboard_requests_'.$cname);
	    
	    if (!$requests) {
		  	
			$requests = $this->getEntityManager()
    			     	 	 ->getRepository('LilyApiBundle:LogRequest')
					 	 	 ->requests($from, $to); 
	    					   
	    	$this->get('memcache.default')->set('dashboard_requests_'.$cname, $requests, 86400);
	    
	    }
		
		// SAVINGS INT
		$saving = ($requests/4)*2.30;
	
		// LOADINGS INT
		$loadings = $this->get('memcache.default')->get('dashboard_loadings_'.$cname);
	    
	    if (!$loadings) {
			
			$loadings = $this->getEntityManager()
    			     	 	 ->getRepository('LilyApiBundle:LogRequest')
					 	 	 ->uniqueUsers($from, $to);
	    					   
	    	$this->get('memcache.default')->set('dashboard_loadings_'.$cname, $loadings, 86400);
	    
	    }
	    
	    // VISITORS INT
	    $visitors = $this->get('memcache.default')->get('dashboard_visitors_'.$cname);
	    
	    if (!$visitors) {
			
			// taux d'utilisation
			$visitors = $this->getEntityManager()
    			     	  	 ->getRepository('LilyApiBundle:LogConnection')
					 	  	 ->uniqueVisitors($from, $to);
	    					   
	    	$this->get('memcache.default')->set('dashboard_visitors_'.$cname, $visitors, 86400);
	    
	    }
		
		// USAGE RATE
		$usage = $this->get('memcache.default')->get('dashboard_usage_'.$cname);
	    
	    if (!$usage) {
							
			if ($visitors !== '0') {
				$usage = floor(($loadings/$visitors)*100);
			} else $usage = 0;
	    					   
	    	$this->get('memcache.default')->set('dashboard_usage_'.$cname, $usage, 86400);
	    
	    }
	    
	    // REDIRECTION RATE
	    $redirection = $this->get('memcache.default')->get('dashboard_redirection_'.$cname);
	   
	    if ($redirection===false) {
			
			$redirections = $this->getEntityManager()
	    			     	  	 ->getRepository('LilyApiBundle:LogRedirection')
						 	  	 ->redirections($from, $to);
			
			if ($requests !== '0') {
				$redirection = round(($redirections/$requests)*100, 2);
			} else $redirection = 0;
	    					   
	    	$this->get('memcache.default')->set('dashboard_redirection_'.$cname, $redirection, 86400);
	    
	    }
	   
	    
		// SATISFACTION RATE
		$satisfaction = $this->get('memcache.default')->get('dashboard_satisfaction_'.$cname);
		
		if ($satisfaction===false) {
			
			$notations = $this->getEntityManager()
    			     	 	  ->getRepository('LilyApiBundle:LogNotation')
					 	 	  ->totalNotations($from, $to);
			
			if ($notations !== '0') { 
				
				$satisfied = $this->getEntityManager()
    			     	 	  	  ->getRepository('LilyApiBundle:LogNotation')
					 	 	  	  ->totalSatisfied($from, $to);
					 	 	  	  
				$satisfaction = ($satisfied / $notations) * 100; 
			
			} else { $satisfaction = '0'; }
	    					   
	    	$this->get('memcache.default')->set('dashboard_satisfaction_'.$cname, $satisfaction, 86400);
	    
	    }
	    
	    // TOP QUESTIONS LIST
	    $topQuestions = $this->get('memcache.default')->get('dashboard_top_questions_'.$cname);
		
		if ($topQuestions===false) {
								 	 	  
			$topQuestions = $this->getEntityManager()
	    			          	  ->getRepository('LilyApiBundle:LogRequest')
							  	  ->topQuestions($from, $to);
	    					   
	    	$this->get('memcache.default')->set('dashboard_top_questions_'.$cname, $topQuestions, 86400);
	    
	    }
        return array('activities' => $activities, 'saving' => $saving, 'loadings' => $loadings, 'usage' => $usage, 'redirection' => $redirection, 'satisfaction' => $satisfaction, 'top_questions' => $topQuestions);   
    }
}