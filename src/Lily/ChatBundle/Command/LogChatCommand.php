<?php
namespace Lily\ChatBundle\Command;

use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;  
use Symfony\Component\HttpFoundation\Session\Storage\Handler;

use React\EventLoop\Factory as LoopFactory;
use React\ZMQ\Context;
use \ZMQ;
use Lily\ChatBundle\Entity\LogChat;

class LogChatCommand extends ContainerAwareCommand
{	
    protected function configure(){
        $this->setName('ratchet:log:start')
             ->setDescription('Start logging for ratchet server')
             ->addArgument('cname', InputArgument::OPTIONAL, 'Cname')
             ->addArgument('zmqLog', InputArgument::OPTIONAL, 'ZmqLog');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
    	
    	$cname = $input->getArgument('cname');
    	$zmqLog = $input->getArgument('zmqLog');
    	
		        // Another script to log chats & info into Database without blocking ratchet
	    $loop = LoopFactory::create();
	    $context = new Context($loop);
	    
	    // Get the client' entity manager
	    $em = $this->getContainer()->get('Doctrine')->getManager($cname);
	    
	    	    // Bind to our socket to communicate with our symfony app
		$context = new Context($loop);
		$pull = $context->getSocket(ZMQ::SOCKET_PULL);
		$pull->bind('tcp://127.0.0.1:'.$zmqLog);
					
		$pull->on('message', function ($params) use ($em) {

			$params = json_decode($params, true);

			switch ($params['action']) {
				
				case 'log':
					$item = $params['item'];
					$log = new LogChat();
					$log->setSession($item['id']);
					$log->setOperator($item['operator']);
					$log->setFirstname($item['firstname']);
					$log->setLastname($item['lastname']);
					$log->setEmail($item['email']);
					$log->setSatisfaction($item['satisfaction']);
					$log->setStartTime(new \DateTime('@'.$item['startTime']));
					$log->setEndTime(new \DateTime('@'.$item['lastMsgTime']));
					$log->setWaited($item['startChatTime'] - $item['startTime']);
					$log->setMessages($item['messages']);
					$em->persist($log);
					$em->flush();
					break;
				
			}

		});

	    $loop->run(); 
                   
    }
}