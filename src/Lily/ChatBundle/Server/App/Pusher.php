<?php

namespace Lily\ChatBundle\Server\App;

use React\EventLoop\Factory as LoopFactory;
use \ZMQContext;
use \ZMQ;

class Pusher {
	
	public $socket;

    public function __construct()
    {
        
		$context = new ZMQContext();
		$this->socket = $context->getSocket(ZMQ::SOCKET_PUSH, 'pusher');
		$this->socket->connect("tcp://localhost:5555");
		
    }
    
}