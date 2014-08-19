<?php
namespace Lily\ChatBundle\Command;

use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;  
use Symfony\Component\HttpFoundation\Session\Storage\Handler;

use React\EventLoop\Factory as LoopFactory;

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\Server\FlashPolicy;
use Ratchet\WebSocket\WsServer;
use Ratchet\Wamp\ServerProtocol;
use Ratchet\Wamp\WampServer;
use Ratchet\Session\SessionProvider;

use Monolog\Logger;
use Monolog\Handler\StreamHandler;     

use Lily\ChatBundle\Server\App\App;
use Lily\ChatBundle\Server\MessageLogger;
use Lily\ChatBundle\Server\FOSUserProvider;


class RatchetChatCommand extends ContainerAwareCommand
{

    protected function configure(){
        $this->setName('ratchet:start')
             ->setDescription('Start ratchet server');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
    	
		// Setup services
		$handler = $this->getContainer()->get('session.handler');
		$chat = $this->getContainer()->get("lily_chat.app");
		
		$loop = LoopFactory::create();
    	$loop->addPeriodicTimer(60, array($chat, 'timedCallback'));

        $WsServer = new WsServer(
						                	 
            	new SessionProvider (
            		new FOSUserProvider(
            			new WampServer($chat), $this->getContainer()
            			)
            		, $handler
                )
        );    
 
        $server = new App('dev2.saio.fr', 8080, '0.0.0.0', $loop);
        // Domain that are able to connect to our chat
        $server->route('/chat/{key}', $WsServer, array('dev2.saio.fr'));
        $server->run();
     
    }
}