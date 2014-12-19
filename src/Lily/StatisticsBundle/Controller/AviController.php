<?php

namespace Lily\StatisticsBundle\Controller;

use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\View;

use JMS\SecurityExtraBundle\Annotation\Secure;

use Lily\StatisticsBundle\Controller\DefaultController;

class AviController extends DefaultController
{
    /**
     * @Get("/redirections")
     * @Secure(roles="ROLE_USER")
     * @View()
     */
    public function getRedirectionsAction()
    {    
      	$em = $this->getEntityManager();
      	
      	// PERIODE
  	    $from = new \Datetime('-1 month');	    
  	    $to = new \Datetime();
      	
      	// REDIRECTIONS
      	$mails = $em->getRepository('LilyApiBundle:LogRedirection')
        ->mails($from, $to); 
        
        $phones = $em->getRepository('LilyApiBundle:LogRedirection')
        ->phones($from, $to);
     				  	 
        $data[0] = array('label' => 'Mail', 'data' => $mails);		
        $data[1] = array('label' => 'Phone', 'data' => $phones);	
        return $data;        		
    }
    
    /**
     * @Get("/{timestampfrom}/{timestampto}")
     * @Secure(roles="ROLE_USER")
     * @View()
     */
    public function getAviAction($timestampfrom, $timestampto)
    {       	
      	$em = $this->getEntityManager();
      	
      	$from = round($timestampfrom/1000);
        $to = round($timestampto/1000);
        $interval = $this->getInterval($from, $to);
        $size = $interval['size'];
        
        // QUESTIONS
    		$questions = $em->getRepository('LilyApiBundle:LogRequest')
    		->requests($from, $to, $size);
			 	 	      
  	    foreach($questions as $item) {
  			    $nzQuestions[$item['intervalId']] = round($item['value']);
  		  }				 	 	  	
		
        // REPONDUES   		
        $answered = $em->getRepository('LilyApiBundle:LogRequest')
        ->answered($timestampfrom, $timestampto, $size);
		
    		foreach($answered as $item) {
    			  $nzAnswered[$item['intervalId']] = round($item['value']);
    		}
        
        $from = round($from / $size);
        $to = round($to / $size);
        
        for ($n = $from; $n < $to; $n++) {
            // Questions
	    	    $dataQ[] = [(string) ($n * $size * 1000), //x value: microtimestamp
	        		(string) (isset($nzQuestions[$n]) ? $nzQuestions[$n] : 0)];  //y value : data
            // Answered
            $dataA[] = [(string) ($n * $size * 1000), //x value: microtimestamp
	        		(string) (isset($nzAnswered[$n]) ? $nzAnswered[$n] : 0)];  //y value : data
	      }
        
        $values[] = $dataQ;
        $values[] = $dataA;
        
        return array('period' => $interval['period'], 'step' => $interval['step'], 'type' => 'int', 'values' => $values);
    		
    }
    
    /**
     * @Get("/footer/{timestampfrom}/{timestampto}")
     * @Secure(roles="ROLE_USER")
     * @View()
     */
    public function getAviFooterAction($timestampfrom, $timestampto)
    {    
      	$em = $this->getEntityManager();
      	
      	$from = round($timestampfrom/1000);
        $to = round($timestampto/1000);
      	
      	// QUESTIONS   		
        $requests = $em->getRepository('LilyApiBundle:LogRequest')
        ->requests($from, $to, null);	
        
        // ANSWERED  		
        $answered = $em->getRepository('LilyApiBundle:LogRequest')
        ->answered($from, $to, null);
     							 
        // REUSSITE  
        if ($requests > 0) { $successrate = round(($answered/$requests),2) * 100; }
        else $successrate = 100;
        	  
        return array('requests' => $requests, 'answered' => $answered, 'successrate' => $successrate);
    }
    
    /**
     * @Get("/topcategories")
     * @Secure(roles="ROLE_USER")
     * @View()
     */
    public function getTopCategoriesAction()
    {    
    	  // PERIODE
        $from = new \Datetime('-1 month');	    
        $to = new \Datetime();
	    
        $em = $this->getEntityManager();
    	
        // CATEGORIES    	
        $categories = $em->getRepository('LilyApiBundle:LogRequest')
        ->topCategories($from, $to, 5); 
   					  	   
        return $categories;	        		
    }
    
    /**
     * @Get("/topquestions")
     * @Secure(roles="ROLE_USER")
     * @View()
     */
    public function getTopQuestionsAction()
    {    
    	  // PERIODE
        $from = new \Datetime('-1 month');	    
        $to = new \Datetime();
	    
        $em = $this->getEntityManager();
    	
        // CATEGORIES    	
        $questions = $em->getRepository('LilyApiBundle:LogRequest')
        ->topQuestions($from, $to, 5); 
   					  	   
        return $questions;	        		
    }

}
