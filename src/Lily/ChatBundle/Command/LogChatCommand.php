<?php
namespace Lily\ChatBundle\Command;

use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;  

use React\EventLoop\Factory as LoopFactory;
use React\ZMQ\Context;
use \ZMQ;

use Lily\AppBundle\Entity\LogConnection;
use Lily\ChatBundle\Entity\LogChat;

class LogChatCommand extends ContainerAwareCommand
{	

    protected function setMedia($log) 
    {
        // Get the client' entity manager
     		$connection = $this->getContainer()->get(sprintf('doctrine.dbal.%s_connection', 'client'));
        $mobileDetector = $this->getContainer()->get('mobile_detect.mobile_detector');
        
        // Support d'utilisation
        if ($mobileDetector->isMobile()) { $log->setMedia('mobile'); }
        if ($mobileDetector->isTablet()) { $log->setMedia('tablet'); }
        if (!$mobileDetector->isMobile() && !$mobileDetector->isTablet()) { $log->setMedia('pc'); }
        
        return $log;
    }

    protected function getEntityManager($licence) 
    {
        // Get the client' entity manager
     		$connection = $this->getContainer()->get(sprintf('doctrine.dbal.%s_connection', 'client'));
  	
  	    $refConn = new \ReflectionObject($connection);
  	    $refParams = $refConn->getProperty('_params');
  	    $refParams->setAccessible('public'); //we have to change it for a moment
  	
  	    $params = $refParams->getValue($connection);
  	    $params['dbname'] = $licence;
  	
  	    $refParams->setAccessible('private');
  	    $refParams->setValue($connection, $params);
	    
        $em = $this->getContainer()->get('doctrine')->getManager('client');
        return $em;
    }
    
    protected function configure()
    {
        $this->setName('ratchet:log:start')
             ->setDescription('Start logging for ratchet server')
             ->addArgument('zmqLog', InputArgument::OPTIONAL, 'ZmqLog');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
    	
      	$zmqLog = $input->getArgument('zmqLog');
      	
  		  // Another script to log chats & info into Database without blocking ratchet
  	    $loop = LoopFactory::create();
  	    $context = new Context($loop);
	    
	    	// Bind to our socket to communicate with our symfony app
    		$context = new Context($loop);
    		$pull = $context->getSocket(ZMQ::SOCKET_PULL);
    		$pull->bind('tcp://127.0.0.1:'.$zmqLog);
    					
    		$pull->on('message', function ($params) {
    
    			  $params = json_decode($params);
    
            switch ($params->action) {
                    				
    				    case 'log':
    				    
    				        $licence = $params->licence;
                    $item = $params->item;
                    $em = $this->getEntityManager($licence);
                    
                    $logConnection = new LogConnection();
                    $logConnection->setSession($item->id);
                    $logConnection->setDate(new \DateTime('@'.$item->startTime));
                    $logConnection->setUsed($item->displayed);
                    $this->setMedia($logConnection);
                    $em->persist($logConnection);
    					
                    if ($item->received > 0 && $item->sent > 0) {
                      
          					    $logChat = new LogChat();
                        $logChat->setSession($item->id);
              					$logChat->setName($item->name);
              					$logChat->setOperator($item->operator);
              					$logChat->setTransfered($item->transfered);
              					$logChat->setFirstname($item->firstname);
              					$logChat->setLastname($item->lastname);
              					$logChat->setEmail($item->email);
              					$logChat->setSatisfaction($item->satisfaction);
              					$logChat->setStart(new \DateTime('@'.$item->startTime));
              					$logChat->setEnd(new \DateTime('@'.$item->lastMsgTime));
              					$logChat->setWaited(round($item->waited/$item->received));
              					$logChat->setMessages($item->messages);
                        $em->persist($logChat);
                    }
                    
          					$em->flush();
          					break;
    			  }

		    });
        $loop->run();           
    }
}