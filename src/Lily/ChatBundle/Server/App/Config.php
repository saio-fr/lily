<?php

namespace Lily\ChatBundle\Server\App;

use Ratchet\ConnectionInterface as Conn;
use Ratchet\Wamp\WampServerInterface;
use Ratchet\MessageComponentInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class Config implements WampServerInterface, MessageComponentInterface {

    /**
     * @var \Ratchet\MessageComponentInterface
     */
    protected $_app;

    /**
     * @var \Symfony\Component\DependencyInjection\ContainerInterface
     */
    protected $_container;
    
    protected $key;
    protected $config;

    public function __construct(WampServerInterface $app, ContainerInterface $container) {
    
        $this->app = $app;
        $this->container = $container;
        
        $this->key = null;
        
        $this->memcache = $this->container->get('memcache.default');
    }
	// Trick to set key and config on first connect (how to get this from symfony2 router ?)
    public function onOpen(Conn $conn) {
    	
    	if ($this->key == null) { 
    	
    		$this->key = $conn->WebSocket->request->getQuery()->get('key');
    		
	    	$this->config = $this->memcache->get('config_'.$this->key);
			
			if (!$this->config) {
	
	    		$enterprise = $this->container->get('doctrine')->getManager()
					   	   		   ->getRepository('LilyUserBundle:Enterprise')
					   	   		   ->findOneByKey($this->key);
					   	   		 	 	 
				$this->config = $this->container->get('doctrine')->getManager($enterprise->getCname())
									 ->getRepository('LilyBackOfficeBundle:Config')
									 ->findOneById(1);
			   	  			  			
			    $this->memcache->set('config_'.$this->key, $this->config, 0);
		
			}
			
			$this->app->key = $this->key;
			$this->app->config = $this->config;   		
    		
    	}
    	
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
    
    public function setConfig($key) {

    	if ($key == $this->key) {

	    	$this->config = $this->memcache->get('config_'.$this->key);
			
			if (!$this->config) {
	
	    		$enterprise = $this->container->get('doctrine')->getManager()
					   	   		   ->getRepository('LilyUserBundle:Enterprise')
					   	   		   ->findOneByKey($this->key);
					   	   		 	 	 
				$this->config = $this->container->get('doctrine')->getManager($enterprise->getCname())
									 ->getRepository('LilyBackOfficeBundle:Config')
									 ->findOneById(1);
			   	  			  			
			    $this->memcache->set('config_'.$this->key, $this->config, 0);
		
			}
			$this->app->config = $this->config; 	    	
    	}
		
    }

}