<?php
namespace Lily\ChatBundle\Command;

use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;  

use React\EventLoop\Factory as LoopFactory;
use React\ZMQ\Context;
use \ZMQ;

use Lily\ChatBundle\Entity\LogChat;

class LogChatCommand extends ContainerAwareCommand
{	
    protected function configure(){
        $this->setName('ratchet:log:start')
             ->setDescription('Start logging for ratchet server')
             ->addArgument('licence', InputArgument::OPTIONAL, 'Licence')
             ->addArgument('zmqLog', InputArgument::OPTIONAL, 'ZmqLog');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
    	
    	$zmqLog = $input->getArgument('zmqLog');
    	
		        // Another script to log chats & info into Database without blocking ratchet
	    $loop = LoopFactory::create();
	    $context = new Context($loop);
	    
	    // Get the client' entity manager
   		$connection = $this->container->get(sprintf('doctrine.dbal.%s_connection', 'client'));
	
	    $refConn = new \ReflectionObject($connection);
	    $refParams = $refConn->getProperty('_params');
	    $refParams->setAccessible('public'); //we have to change it for a moment
	
	    $params = $refParams->getValue($connection);
	    $params['dbname'] = $this->getClient()->getLicence();
	
	    $refParams->setAccessible('private');
	    $refParams->setValue($connection, $params);
	    
        $em = $this->get('doctrine')->getManager('client');
	    
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
					$log->setName($item['name']);
					$log->setOperator($item['operator']);
					$log->setTransfered($item['transfered']);
					$log->setFirstname($item['firstname']);
					$log->setLastname($item['lastname']);
					$log->setEmail($item['email']);
					$log->setSatisfaction($item['satisfaction']);
					$log->setStart(new \DateTime('@'.$item['startTime']));
					$log->setEnd(new \DateTime('@'.$item['lastMsgTime']));
					$log->setWaited(round($item['waited']/$item['received']));
					$log->setMessages($item['messages']);
					$em->persist($log);
					$em->flush();
					break;				
			}

		});

	    $loop->run(); 
                   
    }
}