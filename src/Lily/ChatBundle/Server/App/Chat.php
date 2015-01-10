<?php

namespace Lily\ChatBundle\Server\App;

use Ratchet\ConnectionInterface as Conn;
use Ratchet\Wamp\WampServerInterface;
use Ratchet\MessageComponentInterface;

use Lily\ChatBundle\Server\App\Handler\RPCHandlerInterface;
use Lily\ChatBundle\Server\App\Handler\TopicHandlerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Lily\ChatBundle\Event\ClientEvent;
use Lily\ChatBundle\Event\ClientErrorEvent;

class Chat implements WampServerInterface, MessageComponentInterface {

    public $topicHandler, $rpcHandler, $eventDispatcher, $licence, $clients, $available;

    public function __construct(RPCHandlerInterface $rpcHandler, TopicHandlerInterface $topicHandler, EventDispatcherInterface $eventDispatcher)
    {	
        $this->rpcHandler = $rpcHandler;
        $this->topicHandler = $topicHandler;
        $this->eventDispatcher = $eventDispatcher;
    }

    public function onPublish(Conn $conn, $topic, $event, array $exclude, array $eligible) {
	    
	      // Get the conn licence
        $licence = $conn->WebSocket->request->getQuery()->get('licence');
        $client = $this->getClient($licence);
	    
        $this->topicHandler->onPublish($conn, $topic, $event, $exclude, $eligible, $client->users);
        $client->operator->broadcast($this->toArray($client->users));
    }

    public function onCall(Conn $conn, $id, $topic, array $params) {
	    
	      // Get the conn licence
        $licence = $conn->WebSocket->request->getQuery()->get('licence');
        $client = $this->getClient($licence);
	    
        $this->rpcHandler->dispatch($conn, $id, $topic, $params, $client);
        $client->operator->broadcast($this->toArray($client->users));
    }

    // WampServer adds and removes subscribers to Topics automatically, this is for further optional events.
    public function onSubscribe(Conn $conn, $topic) {
	    
	      // Get the conn licence
        $licence = $conn->WebSocket->request->getQuery()->get('licence');
        $client = $this->getClient($licence);
	       
        $this->topicHandler->onSubscribe($conn, $topic, $client->users);
        $client->operator->broadcast($this->toArray($client->users));
        
    }
    public function onUnSubscribe(Conn $conn, $topic) {

  	    // Get the conn licence
  	    $licence = $conn->WebSocket->request->getQuery()->get('licence');
  	    $client = $this->getClient($licence);
	      	
        $this->topicHandler->onUnSubscribe($conn, $topic, $client->users);
        $client->operator->broadcast($this->toArray($client->users));
    }

    public function onOpen(Conn $conn) {
      
        $event = new ClientEvent($conn, ClientEvent::$connected);             
        $this->eventDispatcher->dispatch("lily.client.connected", $event); 
    }
    
    public function onMessage(Conn $from, $msg) {
    }

    public function onClose(Conn $conn) {
      
        $event = new ClientEvent($conn, ClientEvent::$disconnected);
        $this->eventDispatcher->dispatch("lily.client.disconnected", $event);        
    }

    public function onError(Conn $conn, \Exception $e) {
      
        $event = new ClientErrorEvent($conn, ClientEvent::$error);

        $event->setException($e);
        $this->eventDispatcher->dispatch("lily.client.error", $event);
    }
    
   /**
    * Get client's users
	  */
    	public function getClient($licence) {
      	
    		foreach ($this->clients as $client) {		
    			if ($client->licence === $licence) {
    				return $client;
    			}
    		}        
    	}
    
   /**
    * Convert our clients to array
    */
  	public function toArray($data)
  	{
        $result = array();
        foreach ($data as $key => $value) { $result[$key] = (array) $value; }
        return $result;
  	}
}