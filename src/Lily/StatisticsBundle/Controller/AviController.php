<?php

namespace Lily\StatisticsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\View\ViewHandler;

use JMS\Serializer\SerializationContext;
use JMS\Serializer\Exception\RuntimeException;
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
      	$mails = $this->getEntityManager()
        ->getRepository('LilyApiBundle:LogRedirection')
        ->mails($from, $to); 
        
        $phones = $this->getEntityManager()
        ->getRepository('LilyApiBundle:LogRedirection')
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
    		$questions = $this->getEntityManager()
    		->getRepository('LilyApiBundle:LogRequest')
    		->requests($timestampfrom, $timestampto, $interval->size);
			 	 	      
  	    foreach($questions as $question) {
  			    $nonzeroQuestions[$question['intervalId']]=round($question['value']);
  		  }				 	 	  	
		
        // REPONDUES   		
        $answered = $this->getEntityManager()
		    ->getRepository('LilyApiBundle:LogRequest')
        ->answered($timestampfrom, $timestampto, $intervalSize);
		
    		foreach($answered as $item) {
    			  $nonzeroAnswered[$item['intervalId']]=round($item['value']);
    		}
		   		
        // REDIRECTION   					
        $redirections = $this->getEntityManager()
		    ->getRepository('LilyApiBundle:LogRedirection')
        ->redirections($timestampfrom, $timestampto, $intervalSize);
		
    		foreach($redirections as $redirection) {
      			foreach ($questions as $question) {
        				if ($question['intervalId'] == $redirection['intervalId']) {
          					$nonzeroRedirection[$redirection['intervalId']]=round($redirection['value']/$question['value']);
          					break;
        				}
        				$nonzeroRedirection[$redirection['intervalId']]=0;
      			}
    		}
		
    		for($n = round($timestampfrom/$intervalSize); $n < round($timestampto/$intervalSize); $n++) {
    	    	$dataQ[] = [(string) ($n*$intervalSize*1000), //x value: microtimestamp
    	        		(string) (isset($nonzeroQuestions[$n]) ? $nonzeroQuestions[$n] : 0)];  //y value : data
    	       
  	        $dataA[] = [(string) ($n*$intervalSize*1000), //x value: microtimestamp
  	        		(string) (isset($nonzeroAnswered[$n]) ? $nonzeroAnswered[$n] : 0)];  //y value : data
  	        
  	        $dataR[] = [(string) ($n*$intervalSize*1000), //x value: microtimestamp
  	        		(string) (isset($nonzeroRedirections[$n]) ? $nonzeroRedirections[$n] : 0)];  //y value : data
		    }
        
        $values = array('questions' => $dataQ, 'answered' => $dataA, 'redirections' => $dataR);
    		return array('period' => $interval->period, 'step' => $interval->step, 'values' => $values);
    		
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
        $requests = $this->getEntityManager()
        ->getRepository('LilyApiBundle:LogRequest')
        ->requests($timestampfrom, $timestampto, null);	
        
        // ANSWERED  		
        $answered = $this->getEntityManager()
        ->getRepository('LilyApiBundle:LogRequest')
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
    	
    	// CATEGORIES    	
    	$categories = $this->getEntityManager()
      ->getRepository('LilyApiBundle:LogRequest')
      ->topCategories($from, $to); 
   					  	   
      return $categories;	        		
    }

}
