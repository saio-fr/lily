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
  	    $from = new \Datetime('-4 month');	    
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
      	
      	$timestampfrom = round($timestampfrom/1000);
        $timestampto = round($timestampto/1000);
        $interval = $this->getInterval($timestampfrom, $timestampto);
        
        // QUESTIONS
    		$questions = $em->getRepository('LilyApiBundle:LogRequest')
    		->requests($timestampfrom, $timestampto, $interval->size);
			 	 	      
  	    foreach($questions as $question) {
  			    $nonzeroQuestions[$question['intervalId']]=round($question['value']);
  		  }				 	 	  	
		
        // REPONDUES   		
        $answered = $em->getRepository('LilyApiBundle:LogRequest')
        ->answered($timestampfrom, $timestampto, $intervalSize);
		
    		foreach($answered as $item) {
    			  $nonzeroAnswered[$item['intervalId']]=round($item['value']);
    		}
		   		
        // REDIRECTION   					
        $redirections = $em->getRepository('LilyApiBundle:LogRedirection')
        ->redirections($timestampfrom, $timestampto, $intervalSize);
		
		foreach($redirections as $redirection) {
  			foreach ($questions as $question) {
				if ($question['intervalId'] == $redirection['intervalId']) {
  					$nonzeroRedirections[$redirection['intervalId']] = round($redirection['value']/$question['value']);
				} else {
                    $nonzeroRedirections[$redirection['intervalId']] = 0;
				}
  			}
		}
	
        
        $from = round($timestampfrom/$interval['size']);
        $to = round($timestampto/$interval['size']);
        
        for ($n = $from; $n < $to; $n++) { 
	    	$dataQ[] = [(string) ($n*$interval['size']*1000), //x value: microtimestamp
	        		(string) (isset($nonzeroQuestions[$n]) ? $nonzeroQuestions[$n] : 0)];  //y value : data
	       
	        $dataA[] = [(string) ($n*$intervalSize*1000), //x value: microtimestamp
	        		(string) (isset($nonzeroAnswered[$n]) ? $nonzeroAnswered[$n] : 0)];  //y value : data
	        
	        $dataR[] = [(string) ($n*$intervalSize*1000), //x value: microtimestamp
	        		(string) (isset($nonzeroRedirections[$n]) ? $nonzeroRedirections[$n] : 0)];  //y value : data
	    }
        
        $values = array('questions' => $dataQ, 'answered' => $dataA, 'redirections' => $dataR);
        return array('period' => $interval['period'], 'step' => $interval['step'], 'values' => $values);
    		
    }
    
    /**
     * @Get("/footer/{timestampfrom}/{timestampto}")
     * @Secure(roles="ROLE_USER")
     * @View()
     */
    public function getAviFooterAction($timestampfrom, $timestampto)
    {    
      	$em = $this->getEntityManager();
      	
      	$timestampfrom = round($timestampfrom/1000);
        $timestampto = round($timestampto/1000);
      	
      	// QUESTIONS   		
        $requests = $em->getRepository('LilyApiBundle:LogRequest')
        ->requests($timestampfrom, $timestampto, null);	
        
        // ANSWERED  		
        $answered = $em->getRepository('LilyApiBundle:LogRequest')
        ->answered($timestampfrom, $timestampto, null);
     							 
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
	    $from = new \Datetime('-4 month');	    
	    $to = new \Datetime();
	    
	    $em = $this->getEntityManager();
    	
    	// CATEGORIES    	
    	$categories = $em->getRepository('LilyApiBundle:LogRequest')
        ->topCategories($from, $to); 
   					  	   
      return $categories;	        		
    }

}
