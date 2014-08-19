<?php

namespace Lily\ChatBundle\Server\App;

use Ratchet\ConnectionInterface as Conn;
use Ratchet\Wamp\WampServerInterface;
use Ratchet\MessageComponentInterface;
use Ratchet\Wamp\Topic;

use Lily\ChatBundle\Server\App\Handler\RPCHandlerInterface;
use Lily\ChatBundle\Server\App\Handler\TopicHandlerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Lily\ChatBundle\Event\ClientEvent;
use Lily\ChatBundle\Event\ClientErrorEvent;

class Chat implements WampServerInterface, MessageComponentInterface {

    protected $topicHandler, $rpcHandler, $eventDispatcher, $clients;

    public function __construct(RPCHandlerInterface $rpcHandler, TopicHandlerInterface $topicHandler, EventDispatcherInterface $eventDispatcher)
    {
        $this->rpcHandler = $rpcHandler;
        $this->topicHandler = $topicHandler;
        $this->eventDispatcher = $eventDispatcher;
        $this->clients = new \SplObjectStorage;
        $this->operator = new Topic('operator');
    }

    public function onPublish(Conn $conn, $topic, $event, array $exclude, array $eligible) {
        $this->topicHandler->onPublish($conn, $topic, $event, $exclude, $eligible, $this->clients);
        $this->operator->broadcast($this->toArray($this->clients));
    }

    public function onCall(Conn $conn, $id, $topic, array $params) {
        $this->rpcHandler->dispatch($conn, $id, $topic, $params, $this->clients);
        $this->operator->broadcast($this->toArray($this->clients));
    }

    //WampServer adds and removes subscribers to Topics automatically, this is for further optional events.
    public function onSubscribe(Conn $conn, $topic) {    
    	if ($topic->getId() == 'operator') $this->operator = $topic;    
        $this->topicHandler->onSubscribe($conn, $topic, $this->clients);
        $this->operator->broadcast($this->toArray($this->clients));
        
    }
    public function onUnSubscribe(Conn $conn, $topic) {  
    	if ($topic->getId() == 'operator') $this->operator = $topic;    	
        $this->topicHandler->onUnSubscribe($conn, $topic, $this->clients);
        $this->operator->broadcast($this->toArray($this->clients));
    }

    public function onOpen(Conn $conn) {   	
        $event = new ClientEvent($conn, ClientEvent::$connected);             
        $this->eventDispatcher->dispatch("lily.client.connected", $event);  
    }
    
    public function onMessage(Conn $from, $msg) {
    }

    public function onClose(Conn $conn) {
    	echo 'closed';
        $event = new ClientEvent($conn, ClientEvent::$disconnected);
        $this->eventDispatcher->dispatch("lily.client.disconnected", $event);        
    }

    public function onError(Conn $conn, \Exception $e) {
        $event = new ClientErrorEvent($conn, ClientEvent::$error);

        $event->setException($e);
        $this->eventDispatcher->dispatch("lily.client.error", $event);
    }
    
   /**
    * Convert our clients to array
    */
	function toArray($data)
	{
        $result = array();
        foreach ($data as $key => $value) { $result[$key] = (array) $value; }
        return $result;
	}
	
   /**
    * Called every min
    */
	public function timedCallback() {

        // Test if visitor is still connected
		foreach ($this->clients as $item) {		
			if ($item->type === 'visitor' && $item->lastConn < ( time() - 1800 )) { 
				// Detach the client
				$this->clients->detach($item);				
			}			
		}   
		
		$this->operator->broadcast($this->toArray($this->clients));
		     
    }

}