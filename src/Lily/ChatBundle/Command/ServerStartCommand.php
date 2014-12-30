<?php
namespace Lily\ChatBundle\Command;

use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;

use React\EventLoop\Factory as LoopFactory;
use React\ZMQ\Context;
use \ZMQ;

use Ratchet\WebSocket\WsServer;
use Ratchet\Wamp\WampServer;
use Ratchet\Session\SessionProvider;

use Lily\ChatBundle\Server\App\App;
use Lily\ChatBundle\Server\App\Connector;
use Lily\ChatBundle\Server\App\FOSUserProvider;


class ServerStartCommand extends ContainerAwareCommand
{
    protected function configure(){
        $this->setName('ws:start')
             ->setDescription('Start ratchet server')
             ->addArgument('zmqConfig', InputArgument::OPTIONAL, 'ZmqConfig')
             ->addArgument('zmqLog', InputArgument::OPTIONAL, 'ZmqLog')
             ->addArgument('port', InputArgument::OPTIONAL, 'Port');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
      	
      	// Get environment
        $env = $input->getParameterOption(
            array('--env', '-e'), getenv('SYMFONY_ENV') ?: 'dev');

      	$zmqConfig = $input->getArgument('zmqConfig');
      	$zmqLog = $input->getArgument('zmqLog');
      	$port = $input->getArgument('port');
        $env == 'prod' ? $host = 'ws.saio.fr' : $host = 'develop.saio.fr';  

    		// Setup services
    		$handler = $this->getContainer()->get('session.handler');
    		$chat = $this->getContainer()->get("lily_chat.app");
    		$connector = new Connector($chat, $zmqLog, $this->getContainer());

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

        $sessionProvider = new SessionProvider (
      		new FOSUserProvider(
      			new WampServer(
      				$connector
      				), $this->getContainer()
      			)
      		, $handler
    		); 
        
        $server = new App($host, $port, '0.0.0.0', $loop);

        // Domain that are able to connect to our chat
        $server->route('/chat/{licence}', new WsServer($sessionProvider),
            array(
                'dev2.saio.fr',
                'bruno.saio.fr',
                'prod1.saio.fr',
                'prod2.saio.fr',
                'develop.saio.fr',
                'saio.fr'
            ));
        $server->run();

    }
}
