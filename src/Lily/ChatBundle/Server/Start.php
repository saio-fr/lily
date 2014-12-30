<?php
namespace Lily\ChatBundle\Server;

use React\EventLoop\Factory as LoopFactory;
use React\ZMQ\Context;
use \ZMQ;

use Ratchet\WebSocket\WsServer;
use Ratchet\Wamp\WampServer;
use Ratchet\Session\SessionProvider;

use Lily\ChatBundle\Server\App\App;
use Lily\ChatBundle\Server\App\Connector;
use Lily\ChatBundle\Server\App\FOSUserProvider;
    
    
    // Setup services
    $handler = $this->getContainer()->get('session.handler');
    $chat = $this->getContainer()->get("lily_chat.app");
    $connector = new Connector($chat, 5556, $this->getContainer());
    
    $loop = LoopFactory::create();
    $loop->addPeriodicTimer(60, array($connector, 'timedCallback'));
    
    $context = new Context($loop);
    $pull = $context->getSocket(ZMQ::SOCKET_PULL);
    $pull->bind('tcp://127.0.0.1:5555');
    
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
    
    $server = new App('ws.saio.fr', $port, '0.0.0.0', 10080);
    
    // Domain that are able to connect to our chat
    $server->route('/chat/{licence}', new WsServer($sessionProvider),
        array(
            'prod1.saio.fr',
            'prod2.saio.fr',
            'saio.fr'
        ));
    $server->run();
