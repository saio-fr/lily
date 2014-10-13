<?php

namespace Lily\ChatBundle\Server\App;

use Ratchet\ConnectionInterface as Conn;
use Ratchet\Wamp\WampServerInterface;
use Ratchet\MessageComponentInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use \ZMQContext;
use \ZMQ;


class Connector implements WampServerInterface, MessageComponentInterface {

    /**
     * @var \Ratchet\MessageComponentInterface
     */
    protected $_app;

    /**
     * @var \Symfony\Component\DependencyInjection\ContainerInterface
     */
    protected $_container;
    
    protected $key;
    protected $cname;
    protected $config;
    protected $available;

    public function __construct(WampServerInterface $app, $cname, $key, $zmq, ContainerInterface $container) {
    
    	$context = new ZMQContext();
		$this->socket = $context->getSocket(ZMQ::SOCKET_PUSH, 'pusher');
		$this->socket->connect("tcp://127.0.0.1:".$zmq);
    
        $this->app = $app;
        $this->container = $container;
        $this->key = $key;
        $this->cname = $cname;
        $this->available = false;
        $this->prout = 0;
        
        $this->memcache = $this->container->get('memcache.default');

		$this->config();
        
    }

    public function onOpen(Conn $conn) {	
        $this->app->onOpen($conn);
    }

    public function onSubscribe(Conn $conn, $topic) {
        $this->app->onSubscribe($conn, $topic);
    }

    public function onUnSubscribe(Conn $conn, $topic) {
        $this->app->onUnSubscribe($conn, $topic);
    }

    public function onPublish(Conn $conn, $topic, $event, array $exclude = array(), array $eligible = array()) {
        $this->app->onPublish($conn, $topic, $event, $exclude, $eligible);
    }

    public function onCall(Conn $conn, $id, $topic, array $params) {
        $this->app->onCall($conn, $id, $topic, $params);
        $this->memcache->set('chat_available_'.$this->key, $this->app->isAvailable(), 3600);
        $this->app->available = $this->memcache->get('chat_available_'.$this->key);
    }

    public function onClose(Conn $conn) {
        $this->app->onClose($conn);
    }

    public function onError(Conn $conn, \Exception $e) {
        $this->app->onError($conn, $e);
    }
    
    public function onMessage(Conn $from, $msg) {
    	$this->app->onMessage($from, $msg);
    }
    
    public function config() {

        $this->config = $this->memcache->get('config_'.$this->key);
		
		if (!$this->config) {
				   	   		 	 	 
			$this->config = $this->container->get('doctrine')->getManager($this->cname)
								 ->getRepository('LilyBackOfficeBundle:Config')
								 ->findOneById(1);
		   	  			  			
		    $this->memcache->set('config_'.$this->key, $this->config, 0);
	
		}
		
		$this->app->config = $this->config; 
    }
   
   /**
    * Called every min
    */
	public function timedCallback() {

        // Test if visitor is still connected
		foreach ($this->app->clients as $item) {
			if ($item->type === 'visitor' && $item->lastConn < ( time() - 1200 )) { 
				
				if ($item->operator !== null) {

					foreach ($this->app->clients as $operator) {
						if ($operator->type === 'operator' && $operator->id == $item->operator) { 
							// Decrease chat numbers	
							$operator->chats -= 1;
	
						}			
					}  	
				}
				
				if (count($item->messages) > 0) {
					$this->socket->send(json_encode(array('action' => 'log', 'item' => $item)));
				}

				$item->messages[] = array('id' => uniqid(), 'from' => 'operator', 'operator' => null, 'date' => time(), 'msg' => "La conversation a été terminé pour cause d'inactivité.");
				$item->topic->broadcast($item->messages);	
				
				// Detach the client	
				$this->app->clients->detach($item);
				 					
			}			
		}   
		
		$this->app->operator->broadcast($this->app->toArray($this->app->clients));
		     
    }
}