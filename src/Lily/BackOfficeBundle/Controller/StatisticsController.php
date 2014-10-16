<?php

namespace Lily\BackOfficeBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use Gedmo\Loggable\LoggableListener;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Delete;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\View\ViewHandler;

use JMS\Serializer\SerializationContext;
use JMS\Serializer\Exception\RuntimeException;
use JMS\SecurityExtraBundle\Annotation\Secure;

class StatisticsController extends BaseController
{    

    /**
	 * @Template()
	 */
	public function indexAction()
    {

    	// Initialisation des dates
    	$from = new \Datetime('-4 month');
    	$to = new \Datetime();
    	
    	// Top des categories
    	$categories = $this->getEntityManager()
    			     	   ->getRepository('LilyApiBundle:LogRequest')
					 	   ->topCategories($from, $to);
					 		 
		return $this->render('LilyBackOfficeBundle:Statistics:index.html.twig', array('categories' => $categories));
    }
    
    /**
     * @Get("/usage/graph/{fonction}/{timestampfrom}/{timestampto}")
     * @Secure(roles="ROLE_USER")
     * @View()
     */
    public function getUsageAction($fonction, $timestampfrom, $timestampto)
    {    
    	
    	$em = $this->getEntityManager();
    	
    	$timestampfrom = round($timestampfrom/1000);
        $timestampto = round($timestampto/1000);
    	
    	// PERIODE
	    $from = new \Datetime();
	    $from->setTimestamp($timestampfrom/1000);
	    
	    $to = new \Datetime();
		$to->setTimestamp($timestampto/1000);
    	$diff = $to->diff($from)->format('%a');

    	// Parameters
        if($diff <= 1) {
            $intervalSize = 1*60*60;    // (1 hour)     // interval in second between 2 points (here 1 hour)
            $step = 2;                                  // interval between 2 legend on x axis
            $period = 'hour';                           // unit
        } elseif($diff <= 7) {
            $intervalSize = 1*24*60*60; // (1 day)
            $step = 1;
            $period = 'day';
        } elseif($diff <= 40) {
            $intervalSize = 1*24*60*60; // (1 days)
            $step = 4;
            $period = 'day';
        } elseif($diff <= 64) {
            $intervalSize = 2*24*60*60;  // (2 days)
            $step = 4;
            $period = 'day';
        } elseif($diff <= 385) {
            $intervalSize = 1*31*24*60*60; // (1 month)
            $step = 1;
            $period = 'month';
        } else {
            $intervalSize = 1*31*24*60*60; // (1 month)
            $step = 4;
            $period = 'month';
        }
    	
    	// CHARGEMENTS
   		if ($fonction == 'loadings') {
		
			$data = $this->getEntityManager()
			     	 	 ->getRepository('LilyApiBundle:LogRequest')
				 	 	 ->uniqueUsers($timestampfrom, $timestampto, $intervalSize);
			       
   		} 
   		
   		// UTILISATION
   		if ($fonction == 'usage') {
   				
   			$data = $this->getEntityManager()
			     	 	 ->getRepository('LilyApiBundle:LogRequest')
				 	 	 ->uniqueUsers($timestampfrom, $timestampto, $intervalSize);
				 	 			 
			$visitors = $this->getEntityManager()
			     	 	     ->getRepository('LilyApiBundle:LogConnection')
				 	 	  	 ->uniqueVisitors($timestampfrom, $timestampto, $intervalSize);
			
			foreach($data as $key => $entry) {
				if ($visitors[$key]['value'] > 0) { 
					$entry['value'] = $entry['value'] / $visitors[$key]['value'];
				} else $entry['value'] = 0;
			} 
			       
   		} 	
   		
   		// SATISFACTION
   		if ($fonction == 'satisfaction') {
		
			$data = $this->getEntityManager()
			     	 	 ->getRepository('LilyApiBundle:LogNotation')
				 	     ->totalSatisfied($timestampfrom, $timestampto, $intervalSize);
			
			$notations = $this->getEntityManager()
     	 	  			  	  ->getRepository('LilyApiBundle:LogNotation')
	 	 	  			  	  ->totalNotations($timestampfrom, $timestampto, $intervalSize);
	 	 	
	 	 	foreach($data as $key => $entry) {
				if ($notations[$key]['value'] > 0) { 
					$data[$key]['value'] = $data[$key]['value'] / $notations[$key]['value'];
				} else $data[$key]['value'] = 100;
			}
			       
   		} 
   		
   		foreach($data as $entry) {
            $nonzeroData[$entry["intervalId"]]=$entry["value"];
        }


        $data = [];
        for($n = round($timestampfrom/$intervalSize); $n < round($timestampto/$intervalSize); $n++) {

            $data[] = [(string) ($n*$intervalSize*1000), //x value: microtimestamp
                            (string) (isset($nonzeroData[$n]) ? $nonzeroData[$n] : 0)];  //y value : data
        }

		return array('period' => $period, 'step' => $step, 'values' => $data);
        		
    }
    
    /**
     * @Get("/usage/footer/{timestampfrom}/{timestampto}")
     * @Secure(roles="ROLE_USER")
     * @View()
     */
    public function getUsageFooterAction($timestampfrom, $timestampto)
    {    
    	
    	$em = $this->getEntityManager();
    	
    	// PERIODE
	    $from = new \Datetime();
	    $from->setTimestamp($timestampfrom/1000);
	    
	    $to = new \Datetime();
		$to->setTimestamp($timestampto/1000);
    	
    	// CHARGEMENTS   		
   		$loadings = $this->getEntityManager()
   						 ->getRepository('LilyApiBundle:LogRequest')
   						 ->uniqueUsers($from, $to);	
   		
   		// UTILISATION   		
   		$users = $this->getEntityManager()
   					  ->getRepository('LilyApiBundle:LogRequest')
   					  ->uniqueUsers($from, $to);	
   		
   		$visitors = $this->getEntityManager()
   						  ->getRepository('LilyApiBundle:LogConnection')
   						  ->uniqueVisitors($from, $to);
   		
   		if (!($visitors == '0')) $usage = ($users/$visitors)*100;
   		else $usage = 0;
   		
   		$usage = round($usage, 0);
   		
   		// SATISFACTION   		
   		$satisfaction = $this->getEntityManager()
   							 ->getRepository('LilyApiBundle:LogNotation')
   							 ->satisfaction($from, $to);
   		
   		$satisfaction = round($satisfaction, 0);		  

		return array('loadings' => $loadings, 'usage' => $usage, 'satisfaction' => $satisfaction);
        		
    }
    
    /**
     * @Get("/usage/media")
     * @Secure(roles="ROLE_USER")
     * @View()
     */
    public function getMediaAction()
    {    
    	
    	$em = $this->getEntityManager();
    	
    	// PERIODE
	    $from = new \Datetime('-4 month');	    
	    $to = new \Datetime();
    	
    	
    	$data = array();
    	// SUPPORTS
    	$mobiles = $this->getEntityManager()
   					    ->getRepository('LilyApiBundle:LogRequest')
   						->mobiles($from, $to);   	
   		
   		$mobiles = array('x' => 'Mobile', 'y' => $mobiles);
   		
    	$computers = $this->getEntityManager()
			    			->getRepository('LilyApiBundle:LogRequest')
							->computers($from, $to);
		
		$computers = array('x' => 'Ordinateur', 'y' => $computers);
							
    	$tablets = $this->getEntityManager()
   					    ->getRepository('LilyApiBundle:LogRequest')
   						->tablets($from, $to);
   		
   		$tablets = array('x' => 'Tablette', 'y' => $tablets);
   		$data = [$mobiles, $tablets, $computers];  	
   		
   		return $data;
   		        		
    }
    
    /**
     * @Get("/avi/redirections")
     * @Secure(roles="ROLE_USER")
     * @View()
     */
    public function getRedirectionsAction()
    {    
    	
    	$em = $this->getEntityManager();
    	
    	// PERIODE
	    $from = new \Datetime('-4 month');	    
	    $to = new \Datetime();
    	
    	
    	$data = array();
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
     * @Get("/avi/graph/{timestampfrom}/{timestampto}")
     * @Secure(roles="ROLE_USER")
     * @View()
     */
    public function getAviAction($timestampfrom, $timestampto)
    {    
    	
    	$em = $this->getEntityManager();
    	
    	// PERIODE
	    $from = new \Datetime();
	    $from->setTimestamp($timestampfrom/1000);
	    
	    $to = new \Datetime();
		$to->setTimestamp($timestampto/1000);
    	$diff = $to->diff($from)->format('%a');

    	if ($diff <= 1) {
    		
    		$level = 1;
    		$step = 2;
    		$period = 'hour';
    		$limit = 26;
	    	for	($i = 0; $i <= $limit; $i += $level) {
				
				$date[$i] = new \DateTime('-'.$i.' hour');
			
			}
			
	    } 
    	
    	if ($diff <=7 && $diff > 1) {
    		
    		$level = 1;
    		$step = 1;
    		$period = 'day';
    		$limit = $diff;
	    	for	($i = 0; $i <= $limit; $i += $level) {
				
				$date[$i] = new \DateTime('-'.$i.' day');
			
			}

	    } 
    	
		if ($diff <=31 && $diff > 7) {
    		
    		$level = 2;
    		$step = 3;
    		$period = 'day';
    		$limit = $diff;
	    	for	($i = 0; $i <= $limit; $i += $level) {
				
				$date[$i] = new \DateTime('-'.$i.' day');
			
			}
			
	    } 		
	    
	    if ($diff <=64 && $diff >= 32) {
    		
    		$level = 1;
    		$step = 1;
    		$period = 'day';
    		$limit = round($diff/4,2);
	    	for	($i = 0; $i <= $limit; $i += $level) {
				
				$date[$i] = new \DateTime('-'.$i.' day');
			
			}
			
	    }
	    
	    if ($diff >= 64 && $diff <= 385) {

    		$limit = round($diff/31,2);

    		$level = 1;
    		$step = 1;
    		$period = 'month';
	    	for	($i = 0; $i <= $limit; $i += $level) {
				
				$date[$i] = new \DateTime('-'.$i.' month');
			
			}
			
	    }
	    
	    if ($diff >= 385) {
    		
    		$limit = round($diff/31,2);
    		
    		$level = 1;
    		$step = 4;
    		$period = 'month';
	    	for	($i = 0; $i <= $limit; $i += $level) {
				
				$date[$i] = new \DateTime('-'.$i.' month');
			
			}
			
	    }
    	
    	// QUESTIONS
		for	($i = 0; $i < $limit-1; $i += $level) {
	
			$value = $this->getEntityManager()
			     	 	  ->getRepository('LilyApiBundle:LogRequest')
				 	 	  ->requests($date[$i+$level], $date[$i]);
				 	 						
			$timestamp = ($date[$i]->getTimestamp().'000');				
			$questions[] = array($timestamp, $value);
				 	 				        
		} 		
		
   		// REPONDUES   		
		for	($i = 0; $i < $limit-1; $i += $level) {
	
			$value = $this->getEntityManager()
			     	 	  ->getRepository('LilyApiBundle:LogRequest')
				 	 	  ->answered($date[$i+$level], $date[$i]);
				 	 						
			$timestamp = ($date[$i]->getTimestamp().'000');				
			$answered[] = array($timestamp, $value);
				 	 				        
		}
		
		   		
   		// REDIRECTION   		
		for	($i = 0; $i < $limit-1; $i += $level) {
		
			$requests = $this->getEntityManager()
			     	 		 ->getRepository('LilyApiBundle:LogRequest')
				 	 		 ->requests($date[$i+$level], $date[$i]);
			
			$value = $this->getEntityManager()
			     	  	  ->getRepository('LilyApiBundle:LogRedirection')
				 	  	  ->redirections($date[$i+$level], $date[$i]);
				 	 						
			$timestamp = ($date[$i]->getTimestamp().'000');
	
			if ($requests !== '0') {
				$value = ($value/$requests)*100;
			} else $value = 0;
			
			$redirections[] = array($timestamp, $value);
		
		}
				 	 				         	
		
		$data = array('questions' => $questions, 'answered' => $answered, 'redirections' => $redirections);					       
		return array('period' => $period, 'step' => $step, 'values' => $data);
        		
    }
    
    /**
     * @Get("/avi/footer/{timestampfrom}/{timestampto}")
     * @Secure(roles="ROLE_USER")
     * @View()
     */
    public function getAviFooterAction($timestampfrom, $timestampto)
    {    
    	
    	$em = $this->getEntityManager();
    	
    	// PERIODE
	    $from = new \Datetime();
	    $from->setTimestamp($timestampfrom/1000);
	    
	    $to = new \Datetime();
		$to->setTimestamp($timestampto/1000);
    	
    	// QUESTIONS   		
   		$requests = $this->getEntityManager()
   						  ->getRepository('LilyApiBundle:LogRequest')
   					  	  ->requests($from, $to);	
   		
   		// REPONDUES   		
   		$answered = $this->getEntityManager()
   						 ->getRepository('LilyApiBundle:LogRequest')
   						 ->answered($from, $to);
   							 
   		// REUSSITE  
   		if ($requests !== '0') { $successrate = round(($answered/$requests),2) * 100; }
   		else $successrate = 100;	  

		return array('requests' => $requests, 'answered' => $answered, 'successrate' => $successrate);
        		
    }
    
    /**
     * @Get("/avi/topcategories")
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
