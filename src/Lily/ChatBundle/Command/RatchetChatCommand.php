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

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\Server\FlashPolicy;
use Ratchet\WebSocket\WsServer;
use Ratchet\Wamp\ServerProtocol;
use Ratchet\Wamp\WampServer;
use Ratchet\Session\SessionProvider;

use Monolog\Logger;
use Monolog\Handler\StreamHandler;     

use Lily\ChatBundle\Entity\LogChat;

use Lily\ChatBundle\Server\App\App;
use Lily\ChatBundle\Server\App\Connector;
use Lily\ChatBundle\Server\MessageLogger;
use Lily\ChatBundle\Server\FOSUserProvider;


class RatchetChatCommand extends ContainerAwareCommand
{	
    protected function configure(){
        $this->setName('ratchet:start')
             ->setDescription('Start ratchet server')
             ->addArgument('cname', InputArgument::OPTIONAL, 'Cname')
             ->addArgument('key', InputArgument::OPTIONAL, 'Key')
             ->addArgument('zmqConfig', InputArgument::OPTIONAL, 'ZmqConfig')
             ->addArgument('zmqLog', InputArgument::OPTIONAL, 'ZmqLog')
             ->addArgument('port', InputArgument::OPTIONAL, 'Port');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
    	
    	$key = $input->getArgument('key');
    	$cname = $input->getArgument('cname');
    	$zmqConfig = $input->getArgument('zmqConfig');
    	$zmqLog = $input->getArgument('zmqLog');
    	$port = $input->getArgument('port');
    	
		// Setup services
		$handler = $this->getContainer()->get('session.handler');
		$chat = $this->getContainer()->get("lily_chat.app");				
		$connector = new Connector($chat, $cname, $key, $zmqLog, $this->getContainer()); 
		
		$loop = LoopFactory::create();
		$loop->addPeriodicTimer(60, array($connector, 'timedCallback')); 

		$context = new Context($loop);
		$pull = $context->getSocket(ZMQ::SOCKET_PULL);
		$pull->bind('tcp://127.0.0.1:'.$zmqConfig);
			
		$pull->on('message', function ($params) use ($connector) {

			$params = json_decode($params, true);

			switch ($params['action']) {
					
				case 'config':
					$connector->config();
					break;
				
			}

		});  	        

        $WsServer = new WsServer(
						                	 
            	new SessionProvider (
            		new FOSUserProvider(
            			new WampServer(
            				$connector
            				), $this->getContainer()
            			)
            		, $handler
                )
        );    
 
        $server = new App('ws.saio.fr', $port, '0.0.0.0', $loop);
        // Domain that are able to connect to our chat
        $server->route('/'.$key.'/chat', $WsServer, array('dev2.saio.fr', 'prod1.saio.fr', 'prod2.saio.fr', 'saio.fr'));
        $server->run();
                   
    }
}