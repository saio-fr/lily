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

        // Connect on the same server to save log
        $this->socket->connect("tcp://127.0.0.1:".$zmq);

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
	      $newclient = true;

        // Check if the client channel is not set
        foreach ($this->app->clients as $client) {
            if ($client->licence == $licence) {
                // Synchro the operator topic
                if ($topic->getId() == 'operator/'.$licence) {
                    $client->operator = $topic;
  		          }
  		          $newclient = false;
  		          break;
            }
	      }

	      if ($newclient) {

    		    $client = new \StdClass;
    		    $client->licence = $licence;
    		    $client->users = new \SplObjectStorage;
    		    $client->available = false;
            $client->operator = ($topic->getId() == 'operator/'.$licence) ? 
              $topic : new Topic('operator/'.$licence);
    		    $this->app->clients->attach($client);
    		    $this->config($licence);
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

      // Check if there is operator available to chat
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
		    
        // Set client config
        foreach ($this->app->clients as $client) {
            if ($client->licence == $licence) {
                $client->config = $config;
            }
	      }
    }
    
    public function removeOperator($licence, $id) {

        // For each clients
    		foreach ($this->app->clients as $client) {
      			if ($client->licence === $licence) {
        		    foreach ($client->users as $user) {

            		    if ($user->id == $id) {
              		      $user->available = false;
              		      $user->conn->close();
              		      $client->users->detach($user);
            		    }
        		    }
        		}
        }  
    }

    public function isAvailable($licence) {

        // For each clients
    		foreach ($this->app->clients as $client) {
      			if ($client->licence === $licence) {

      		    	$client->available = false;
      		    	$operators = 0;
      		    	$queue = 0;

      		    	foreach ($client->users as $user) {
      			    	  if ($user->type == 'operator' && $user->available) {
                          ++$operators;
                          if ($user->chats < $client->config->getMax()) {
                            $client->available = true;
      			    		    }
      			    	  }
                    if ($user->type == 'visitor' && !$user->operator && !$user->closed) {
      				          ++$queue;
      				      }
      		    	}

      			    if (!$client->available && $operators > 0) {
        			      $condition1 = $client->config->getQueue();
        			      $condition2 = $queue < $client->config->getMaxQueue() * $operators;
      					    if ($condition1 && $condition2) $client->available = true;
                    else $client->available = false;
      			    }
      			    // Set in the cache
                $this->cache->save('chat_available_'.$licence, $client->available, 0);
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
              
                if ($item->type === 'visitor') {

                    // If the user is an visitor
                    $condition1 = $item->lastConn < ( time() - 600 );
                    $condition2 = $item->lastMsgTime < ( time() - 600 );

                    if ($condition1 && $condition2) {

                        // If he is attached with an operator, decrease operator's chat counter
                        if ($item->operator) {
                            foreach ($client->users as $operator) {
                                if ($operator->type === 'operator' && $operator->id == $item->operator) {
                                    // Decrease chat numbers
                                    $operator->chats -= 1;
            							      }
            						    }
    					          }

          						  // Close the connection
                        $item->messages[] = array(
                          'id' => uniqid(), 
                          'from' => 'server', 
                          'action' => 'inactivity', 
                          'date' => time()
                        );

                        $item->topic->broadcast($item->messages);

                        $this->socket->send(json_encode(array(
    				              'licence' => $client->licence,
                          'action' => 'log',
                          'item' => $item)));

              					// Detach the client
              					$item->conn->close();
              					$client->users->detach($item);
          					}
		            }
                
                if ($item->type === 'operator') {

                    // Set the operator unavailable if he is disconnected
                    if ($item->lastPing < ( time() - 60 )) {

                        $chats = 0;

                        foreach ($client->users as $user) {
                
                            if (isset($user->operator) && $user->operator == $item->id) {
                
                                $user->operator = null;
                                $chats += 1;
                            }
                        }
                        
                        $item->available = false;
                        $item->chats -= $chats;
                    }
                }
			      }

            // Send users to client's operators
            $client->operator->broadcast($this->app->toArray($client->users));
		    }
    }
}
