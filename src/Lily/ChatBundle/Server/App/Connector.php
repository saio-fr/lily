<?php

namespace Lily\ChatBundle\Server\App;

use Ratchet\ConnectionInterface as Conn;
use Ratchet\Wamp\WampServerInterface;
use Ratchet\MessageComponentInterface;
use Ratchet\Wamp\Topic;

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
    
    protected $config;
    protected $available;

    public function __construct(WampServerInterface $app, $zmq, ContainerInterface $container) { 
      
    	  $context = new ZMQContext();
        $this->socket = $context->getSocket(ZMQ::SOCKET_PUSH, 'pusher');
        $this->socket->connect("tcp://ws.saio.fr:".$zmq);
    
        $this->container = $container;  
        $this->cache = $this->container->get('aequasi_cache.instance.default');
    
        $this->app = $app;
        $this->app->clients = new \SplObjectStorage();
                  
    }

    public function onOpen(Conn $conn) {
        $this->app->onOpen($conn);
    }

    public function onSubscribe(Conn $conn, $topic) {
	    
	      $licence = $conn->WebSocket->request->getQuery()->get('licence');

        // Check if the client channel is not set
        if (!array_key_exists($licence, $this->app->clients)) {
		    
		    $client = new \StdClass;
		    $client->licence = $licence;
		    $client->users = new \SplObjectStorage;
		    $client->available = false;
		    $client->config = $this->config($licence);
		    $client->operator = new Topic('operator/'.$licence);
		    $this->app->clients->attach($client);
		    
	      }
	    
  	    // Synchro the operator topic
  	    if ($topic->getId() == 'operator/'.$licence) {
    	      foreach ($this->app->clients as $client) {		
                if ($client->licence === $licence) {
                    $client->operator = $topic;
  				      }
  			    }
  		  } 
        $this->app->onSubscribe($conn, $topic);
    }

    public function onUnSubscribe(Conn $conn, $topic) {
        $this->app->onUnSubscribe($conn, $topic);
    }

    public function onPublish(Conn $conn, $topic, $event, array $exclude = array(), array $eligible = array()) {
        $this->app->onPublish($conn, $topic, $event, $exclude, $eligible);
    }

    public function onCall(Conn $conn, $id, $topic, array $params) {   
	    // Get the conn licence
	    $licence = $conn->WebSocket->request->getQuery()->get('licence');
      $this->app->onCall($conn, $id, $topic, $params);
        
      // Check if there is operator available for the client
      $this->isAvailable($licence);       
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
    
    public function config($licence) {
        $config = $this->cache->fetch($licence.'_config_app_chat');

        if (!$config) {			
            // Get the client' entity manager
    	   		$connection = $this->container->get(sprintf('doctrine.dbal.%s_connection', 'client'));
    		
    		    $refConn = new \ReflectionObject($connection);
    		    $refParams = $refConn->getProperty('_params');
    		    $refParams->setAccessible('public'); //we have to change it for a moment
    		
    		    $params = $refParams->getValue($connection);
    		    $params['dbname'] = $licence;
    		
    		    $refParams->setAccessible('private');
    		    $refParams->setValue($connection, $params);
    				   	   		 	 	 
            $config = $this->container->get('doctrine')->getManager('client')
    				->getRepository('LilyBackOfficeBundle:ConfigChat')
    				->findOneById(1);
    		   	  			  			
    		    $this->cache->save($licence.'_config_app_chat', $config, 0);
		    }		
        return $config;
    }
    
    public function isAvailable($licence) {
    	
        // For each clients
    		foreach ($this->app->clients as $client) {
      			if ($client->licence === $licence) {
      			
      		    	$client->available = false;
      		    	$operators = 0;	
      		    	$queue = 0;
      		
      		    	foreach($client->users as $user) {
      			    	  if ($user->type == 'operator') {
      			    		    if ($user->available) {
                            ++$operators;
                            if ($user->chats < $client->config->max) {
                              $client->available = true;
      				    		      }
      			    		    }
      			    	  }
                    if ($user->type == 'visitor' && !$user->operator && !$user->closed) {
      				          ++$queue;    	
      				      }
      		    	}
      		
      			    if (!$client->available && $operators > 0) {
        			      $condition1 = $client->config->chatQueue;
        			      $condition2 = $queue < $client->config->maxQueue * $operators;
      					    if ($condition1 && $condition2) $client->available = true;
                    else $client->available = false;
      			    }			    
      			    // Set in the cache
                $this->cache->save('chat_available_'.$licence, $client->available, 3600);  
    		    }
    		}
    }
   
   /**
    * Called every min
    */
    public function timedCallback() {

        // For each clients
        foreach ($this->app->clients as $client) {
            // Test if visitor is still connected
            foreach ($client->users as $item) {
                // If the user is an visitor
                $condition1 = $item->lastConn < ( time() - 1200 );
                $condition2 = $item->lastMsgTime < ( time() - 1200 );
                
                if ($item->type === 'visitor' && $condition1 && $condition2) { 
                    // If he is attached with an operator, decrease operator's chat counter
                    
                    if ($item->operator) {
                        foreach ($client->users as $operator) {
                            if ($operator->type === 'operator' && $operator->id == $item->operator) { 
                                // Decrease chat numbers	
                                $operator->chats -= 1;
        							      }			
        						    }  	
					          }
          					// If there was activity in chat, send a log to db
          					if ($item->received > 0 && $item->sent > 0) {
          						  $this->socket->send(json_encode(array('action' => 'log', 'item' => $item)));
          					}
          					// Close the chat
          					$item->messages[] = array('id' => uniqid(), 'from' => 'operator', 'operator' => null, 'date' => time(), 'msg' => "La conversation a été terminé pour cause d'inactivité.");
          					$item->topic->broadcast($item->messages);	
          					
          					// Detach the client	
          					$client->users->detach($item); 					
		            }
			      }
            // Send users to client's operators
            $client->operator->broadcast($this->app->toArray($client->users));		
		    }   		     
    }
}