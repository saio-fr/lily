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
    protected function getEntityManager($licence)
    {
        // Get the client' entity manager
        $connection = $this->getContainer()->get(sprintf('doctrine.dbal.%s_connection', 'client'));
        $connection->close();

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
        $this->setName('ws:log:start')
             ->setDescription('Start logging for ws server')
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
    		$pull->bind('tcp://*:'.$zmqLog);

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
                    $logConnection->setWidgetUsed($item->widgetUsed);
                    $logConnection->setWidgetDisplayed($item->widgetDisplayed);
                    $logConnection->setMedia($item->media);
                    $em->persist($logConnection);

                    if ($item->sent > 0) {

          					    $logChat = new LogChat();
                        $logChat->setSession($item->id);
              					$logChat->setName($item->name);
              					$logChat->setTransfered($item->transfered);
              					$logChat->setFirstname($item->firstname);
              					$logChat->setLastname($item->lastname);
              					$logChat->setEmail($item->email);
              					$logChat->setSatisfaction($item->satisfaction);
              					$logChat->setStart(new \DateTime('@'.$item->startTime));
              					$logChat->setEnd(new \DateTime('@'.$item->lastMsgTime));
              					$logChat->setWaited(round($item->waited/$item->received));

              					// Convert operators to array
                        $operators = json_decode(json_encode($item->operators), true);
              					$logChat->setOperators($operators);

              					// Convert messages to array
              					$messages = json_decode(json_encode($item->messages), true);
              					$logChat->setMessages($messages);
                        $em->persist($logChat);
                    }

          					$em->flush();
          					break;
    			  }

		    });
        $loop->run();
    }
}
