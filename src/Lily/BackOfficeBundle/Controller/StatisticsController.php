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
					 	   ->statsTopCategories($from, $to);
		
		// Top des questions
    	$questions = $this->getEntityManager()
    			     	  ->getRepository('LilyApiBundle:LogRequest')
					 	  ->statsTopQuestions($from, $to);
					 		 
		return $this->render('LilyBackOfficeBundle:Statistics:index.html.twig', array('categories' => $categories, 'questions' => $questions));
    }
    
    /**
     * @Get("/usage/graph/{function}/{timestampfrom}/{timestampto}")
     * @Secure(roles="ROLE_USER")
     * @View()
     */
    public function getUsageAction($function, $timestampfrom, $timestampto)
    {    
    	
    	$em = $this->getEntityManager();
    	
    	$timestampfrom = round($timestampfrom/1000);
        $timestampto = round($timestampto/1000);
    	
    	// PERIODE
	    $from = new \Datetime();
	    $from->setTimestamp($timestampfrom);
	    
	    $to = new \Datetime();
		$to->setTimestamp($timestampto);
    	$diff = $to->diff($from)->format('%a');
    	
    	$data = [];

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
   		if ($function == 'loadings') {
		
			$loadings = $this->getEntityManager()
			     	 	  	 ->getRepository('LilyApiBundle:LogConnection')
				 	 	  	 ->uniqueVisitors($timestampfrom, $timestampto, $intervalSize);

			foreach($loadings as $key => $entry) { 
				$nonzeroData[$entry["intervalId"]]=$entry["value"];
			}
			
						
	        for($n = round($timestampfrom/$intervalSize); $n < round($timestampto/$intervalSize); $n++) {
	
	            $data[] = [(string) ($n*$intervalSize*1000), //x value: microtimestamp
	                            (string) (isset($nonzeroData[$n]) ? $nonzeroData[$n] : 0)];  //y value : data
	        }
			       
   		} 
   		
   		// UTILISATION
   		if ($function == 'usage') {
   			
   			$loadings = $this->getEntityManager()
			     	 	  	 ->getRepository('LilyApiBundle:LogConnection')
				 	 	  	 ->uniqueVisitors($timestampfrom, $timestampto, $intervalSize);

   			$users = $this->getEntityManager()
			     	 	  ->getRepository('LilyApiBundle:LogRequest')
				 	 	  ->uniqueUsers($timestampfrom, $timestampto, $intervalSize);

			foreach($loadings as $loading) {
				foreach($users as $user) {
					if ($user['intervalId'] == $loading['intervalId']) {
						$nonzeroData[$loading['intervalId']]=round($user['value']*100/$loading['value']);
						break;
					}
					$nonzeroData[$loading['intervalId']]=0;
				}
			}
			
	        for($n = round($timestampfrom/$intervalSize); $n < round($timestampto/$intervalSize); $n++) {
	
	            $data[] = [(string) ($n*$intervalSize*1000), //x value: microtimestamp
	                            (string) (isset($nonzeroData[$n]) ? $nonzeroData[$n] : 100)];  //y value : data
	        }
	            
   		} 	
   		
   		// SATISFACTION
   		if ($function == 'satisfaction') {
		
			$satisfied = $this->getEntityManager()
			     	 	 	  ->getRepository('LilyApiBundle:LogNotation')
				 	 	 	  ->satisfaction($timestampfrom, $timestampto, $intervalSize, true);
		    
		    $notations = $this->getEntityManager()
			     	 	 	  ->getRepository('LilyApiBundle:LogNotation')
				 	 	 	  ->satisfaction($timestampfrom, $timestampto, $intervalSize, null);

			foreach($notations as $notation) {
				foreach($satisfied as $item) {
					if ($item['intervalId'] == $notation['intervalId']) {
						$nonzeroData[$notation['intervalId']]=round($item['value']*100/$notation['value']);
						break;
					}
					$nonzeroData[$notation['intervalId']]=100;
				}
			}
			
			for($n = round($timestampfrom/$intervalSize); $n < round($timestampto/$intervalSize); $n++) {
	
	            $data[] = [(string) ($n*$intervalSize*1000), //x value: microtimestamp
	                            (string) (isset($nonzeroData[$n]) ? $nonzeroData[$n] : 100)];  //y value : data
	        }
			       
   		} 
		
		return array('period' => $period, 'step' => $step, 'type' => $function, 'values' => $data);
        		
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
    	$from = round($timestampfrom/1000);
        $to = round($timestampto/1000);
    	
    	// CHARGEMENTS   		
   		$loadings = $this->getEntityManager()
   						 ->getRepository('LilyApiBundle:LogConnection')
   						 ->uniqueVisitors($from, $to, null);	
   						 
   		// UTILISATION   		
   		$users = $this->getEntityManager()
   					  ->getRepository('LilyApiBundle:LogRequest')
   					  ->uniqueUsers($from, $to, null);	
   		
   		if (!($loadings == '0')) $usage = ($users/$loadings)*100;
   		else $usage = 0;
   		
   		$usage = round($usage, 0);
   		
   		// SATISFACTION   		
   		$satisfied = $this->getEntityManager()
   					      ->getRepository('LilyApiBundle:LogNotation')
   						  ->satisfaction($from, $to, true, null);
   		
   		$notations = $this->getEntityManager()
   							 ->getRepository('LilyApiBundle:LogNotation')
   							 ->satisfaction($from, $to, null, null);
   		
   		if ($notations > 0) $satisfaction = round($satisfaction, 0);
   		else $satisfaction = 100;	  

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
   					    ->getRepository('LilyApiBundle:LogConnection')
   						->mobiles($from, $to);   	
   		
   		$mobiles = array('x' => 'Mobile', 'y' => $mobiles);
   		
    	$computers = $this->getEntityManager()
			    			->getRepository('LilyApiBundle:LogConnection')
							->computers($from, $to);
		
		$computers = array('x' => 'Ordinateur', 'y' => $computers);
							
    	$tablets = $this->getEntityManager()
   					    ->getRepository('LilyApiBundle:LogConnection')
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
    	
    	$timestampfrom = round($timestampfrom/1000);
        $timestampto = round($timestampto/1000);
    	
    	// PERIODE
	    $from = new \Datetime();
	    $from->setTimestamp($timestampfrom);
	    
	    $to = new \Datetime();
		$to->setTimestamp($timestampto);
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

    	// QUESTIONS
		$questions = $this->getEntityManager()
		     	 	      ->getRepository('LilyApiBundle:LogRequest')
			 	 	      ->requests($timestampfrom, $timestampto, $intervalSize);
			 	 	      
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
			 	  	  
		return array('period' => $period, 'step' => $step, 'values' => array('questions' => $dataQ, 'answered' => $dataA, 'redirections' => $dataR));
        		
    }
    
    /**
     * @Get("/avi/footer/{timestampfrom}/{timestampto}")
     * @Secure(roles="ROLE_USER")
     * @View()
     */
    public function getAviFooterAction($timestampfrom, $timestampto)
    {    
    	
    	$em = $this->getEntityManager();
    	
    	$timestampfrom = round($timestampfrom/1000);
        $timestampto = round($timestampto/1000);
    	
    	// PERIODE
	    $from = new \Datetime();
	    $from->setTimestamp($timestampfrom/1000);
	    
	    $to = new \Datetime();
		$to->setTimestamp($timestampto/1000);
    	
    	// QUESTIONS   		
   		$requests = $this->getEntityManager()
   						  ->getRepository('LilyApiBundle:LogRequest')
   					  	  ->requests($timestampfrom, $timestampto, null);	

   		// REPONDUES   		
   		$answered = $this->getEntityManager()
   						 ->getRepository('LilyApiBundle:LogRequest')
   						 ->answered($timestampfrom, $timestampto, null);
   							 
   		// REUSSITE  
   		if ($requests > 0) { $successrate = round(($answered/$requests),2) * 100; }
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
    
    
    /**
     * @Get("/chat/graph/footer/{start}/{end}", requirements={"id" = "\d+", "start" = "\d+", "end" = "\d+"})
     * @Secure(roles="ROLE_USER")
     */
    public function getChatStatsFooterAction($start, $end) {
    
        $logChatRepository = $this->getEntityManager()
                                  ->getRepository('LilyChatBundle:LogChat');

        $startTimestamp = $start/1000;
        $endTimestamp = $end/1000;
        
        $stats = [];
        
        $stats['conversations'] = $logChatRepository->hourlyNumberOfConversation(null, $startTimestamp, $endTimestamp);
        $stats['conversationsTime'] = $logChatRepository->averageConversationTime(null, $startTimestamp, $endTimestamp);
        $stats['waited'] = $logChatRepository->averageWaited(null, $startTimestamp, $endTimestamp);
        $stats['satisfaction'] = $logChatRepository->averageSatisfaction(null, $startTimestamp, $endTimestamp);

        return $stats;
    }

    /**
     * @Get("/chat/graph/{type}/{start}/{end}", requirements={"id" = "\d+", "type"="conversations|conversationsTime|waited|satisfaction", "start" = "\d+", "end" = "\d+"})
     *
     * @Secure(roles="ROLE_USER")
     */
    public function getChatStatsAction($type, $start, $end) {

        //Convert the microtimestamp to timestamp and then Datetime.
        $timestampStart = round($start/1000);
        $timestampEnd = round($end/1000);

        $from = new \Datetime();
        $from->setTimestamp($timestampStart);

        $to = new \Datetime();
        $to->setTimestamp($timestampEnd);

        //$diff is in days
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


        $logChatRepository = $this->getEntityManager()
                                  ->getRepository('LilyChatBundle:LogChat');

        switch($type) {
            case "conversations":
                $data = $logChatRepository->hourlyNumberOfConversation(null, $timestampStart, $timestampEnd, $intervalSize);
				break;
            case "conversationsTime":
                $data = $logChatRepository->averageConversationTime(null, $timestampStart, $timestampEnd, $intervalSize);
				break;
            case "waited":
                $data = $logChatRepository->averageWaited(null, $timestampStart, $timestampEnd, $intervalSize);
				break;
            case "satisfaction":
                $data = $logChatRepository->averageSatisfaction(null, $timestampStart, $timestampEnd, $intervalSize);
				break;
            default:
               throw $this->createNotFoundException();
			   break;
        }

        foreach($data as $entry) {
            $nonzeroData[$entry["intervalId"]]=$entry["value"];
        }

        $graph = [];
        for($n = round($timestampStart/$intervalSize); $n < round($timestampEnd/$intervalSize); $n++) {

            $graph[] = [(string) ($n*$intervalSize*1000),   //x value: microtimestamp
                        (string) (isset($nonzeroData[$n]) ? $nonzeroData[$n] : 0)];  //y value : data
        }
        
        $graph = array_reverse($graph);
        return array('type' => $type, 'period' => $period, 'step' => $step, 'values' => $graph);
    }
    
     /**
     * @Get("/user/{id}/graph/footer/{start}/{end}", requirements={"id" = "\d+", "start" = "\d+", "end" = "\d+"})
     * @Secure(roles="ROLE_ADMIN")
     */
    public function getUserStatsFooterAction($id, $start, $end) {
        $userManager = $this->get('fos_user.user_manager');
        $selectedUser = $userManager->findUserBy(Array('id' => $id));

        //Security check
        $enterprise = $this->getUser()->getEnterprise();
        if($selectedUser === null || $selectedUser->getEnterprise() !== $enterprise) {
            throw $this->createNotFoundException();
        }

        $logChatRepository = $this->getEntityManager()
                                  ->getRepository('LilyChatBundle:LogChat');

        $userId = $selectedUser->getId();

        $startTimestamp = $start/1000;
        $endTimestamp = $end/1000;
        
        $stats = [];
        
        $stats['conversations'] = $logChatRepository->hourlyNumberOfConversation($userId, $startTimestamp, $endTimestamp);
        $stats['conversationsTime'] = $logChatRepository->averageConversationTime($userId, $startTimestamp, $endTimestamp);
        $stats['waited'] = $logChatRepository->averageWaited($userId, $startTimestamp, $endTimestamp);
        $stats['satisfaction'] = $logChatRepository->averageSatisfaction($userId, $startTimestamp, $endTimestamp);

        return $stats;
    }

    /**
     * @Get("/user/{id}/graph/{type}/{start}/{end}", requirements={"id" = "\d+", "type"="conversations|conversationsTime|waited|satisfaction", "start" = "\d+", "end" = "\d+"})
     *
     * @Secure(roles="ROLE_ADMIN")
     */
    public function getUserStatsAction($type, $id, $start, $end) {
        $userManager = $this->get('fos_user.user_manager');
        $selectedUser = $userManager->findUserBy(Array('id' => $id));

        //Security check
        $enterprise = $this->getUser()->getEnterprise();
        if($selectedUser === null || $selectedUser->getEnterprise() !== $enterprise) {
            throw $this->createNotFoundException();
        }

        //Convert the microtimestamp to timestamp and then Datetime.
        $timestampStart = round($start/1000);
        $timestampEnd = round($end/1000);

        $from = new \Datetime();
        $from->setTimestamp($timestampStart);

        $to = new \Datetime();
        $to->setTimestamp($timestampEnd);

        //$diff is in days
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


        $logChatRepository = $this->getEntityManager()
                                  ->getRepository('LilyChatBundle:LogChat');

        $userId=$selectedUser->getId();

        switch($type) {
            case "conversations":
                $data = $logChatRepository->hourlyNumberOfConversation($userId, $timestampStart, $timestampEnd, $intervalSize);
				break;
            case "conversationsTime":
                $data = $logChatRepository->averageConversationTime($userId, $timestampStart, $timestampEnd, $intervalSize);
				break;
            case "waited":
                $data = $logChatRepository->averageWaited($userId, $timestampStart, $timestampEnd, $intervalSize);
				break;
            case "satisfaction":
                $data = $logChatRepository->averageSatisfaction($userId, $timestampStart, $timestampEnd, $intervalSize);
				break;
            default:
               throw $this->createNotFoundException();
			   break;
        }

        foreach($data as $entry) {
            $nonzeroData[$entry["intervalId"]]=$entry["value"];
        }

        $graph = [];
        for($n = round($timestampStart/$intervalSize); $n < round($timestampEnd/$intervalSize); $n++) {

            $graph[] = [(string) ($n*$intervalSize*1000),   //x value: microtimestamp
                        (string) (isset($nonzeroData[$n]) ? $nonzeroData[$n] : 0)];  //y value : data
        }
        
        $graph = array_reverse($graph);
        return array('type' => $type, 'period' => $period, 'step' => $step, 'values' => $graph);
    }

    /**
     * @Get("/user/{operator}/conversations/{start}/{end}", requirements={"operator" = "\d+"})
     *
     * @Secure(roles="ROLE_ADMIN")
     */
    public function getUserConversationsAction($operator, $start, $end) {
    
    	$start = round($start/1000);
        $end = round($end/1000);
    	
        $userManager = $this->get('fos_user.user_manager');
        $selectedUser = $userManager->findUserBy(Array('id' => $operator));

        //Security check
        $enterprise = $this->getUser()->getEnterprise();
        if($selectedUser === null || $selectedUser->getEnterprise() !== $enterprise) {
            throw $this->createNotFoundException();
        }
                
        $em = $this->getEntityManager()->getRepository('LilyChatBundle:LogChat');
        $conversations = $em->conversations($operator, $start, $end);
        
        return $conversations;

    }
    
    /**
     * @Get("/user/{operator}/logs/{start}/{end}", requirements={"operator" = "\d+"})
     *
     * @Secure(roles="ROLE_ADMIN")
     */
    public function getUserActivitiesAction($operator, $start, $end) {
    
    	$start = round($start/1000);
        $end = round($end/1000);
    	
        $userManager = $this->get('fos_user.user_manager');
        $selectedUser = $userManager->findUserBy(Array('id' => $operator));

        //Security check
        $enterprise = $this->getUser()->getEnterprise();
        if($selectedUser === null || $selectedUser->getEnterprise() !== $enterprise) {
            throw $this->createNotFoundException();
        }
                
        $em = $this->getEntityManager()->getRepository('Lily\BackOfficeBundle\Loggable\Entity\LogEntry');
        $activities = $em->getLogs($selectedUser->getUsername(), $start, $end);
        
        return $activities;

    }
    
}
