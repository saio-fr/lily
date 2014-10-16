<?php

namespace Lily\ChatBundle\Topic;

use Lily\ChatBundle\Topic\TopicInterface;

use Ratchet\ConnectionInterface as Conn;
use Ratchet\Wamp\Topic;

class VisitorTopic implements TopicInterface
{
	
	protected $container;
	
    public function setContainer($container)
    {
        $this->container = $container;
    }

    /**
     * @return \Symfony\Component\DependencyInjection\Container
     */
    public function getContainer()
    {
        return $this->container;
    }

    /**
     * This will receive any Subscription requests for this exact topic.
     *
     * @param \Ratchet\ConnectionInterface $conn
     * @param $topic
     * @param array
     * @return mixed|void
     */
    public function onSubscribe(Conn $conn, $topic, $clients)
    {
    	// Session id
    	$sid = $conn->Session->getId();
    	    			
		// Delete the topic when the visitor leaves
		$topic->autoDelete = true;  
    	
    	// Test if visitor is already connected
    	foreach ($clients as $item) {
			if ($item->id === $sid && $item->type === 'visitor') { 
				
				$item->topic = $topic;
				$item->lastConn = time();
				
				// We send back the logged messages list
				$topic->broadcast($item->messages);
				return;
			}
		}

		// Else we create a new visitor class
    	$visitor = new \StdClass;
        $visitor->id = $sid;
        $visitor->topic = $topic;
        $visitor->name = 'ID'.substr($sid, 0, 9);
        $visitor->type = 'visitor';
        $visitor->firstname = null;
        $visitor->lastname = null;
        $visitor->email = null;
        $visitor->operator = null;
        $visitor->transfered = false;
        $visitor->satisfaction = null;
        $visitor->banned = false;
        $visitor->closed = true;
        $visitor->startTime = time();
        $visitor->lastConn = time();
        $visitor->lastMsgTime = time();
        // Is the visitor writing ?
        $visitor->writing = false;
        // Messages sent
        $visitor->messages = array();
        // Questions asked to the avatar
        $visitor->questions = array();
        // Pages seen by the visitor
        $visitor->pages = array();
        // Did the visitor auth on contact form screen ?
        $visitor->showContactForm = true;
        
        $clients->attach($visitor);
    }

    /**
     * This will receive any UnSubscription requests for this exact topic.
     *
     * @param \Ratchet\ConnectionInterface $conn
     * @param $topic
     * @param array
     * @return mixed|void
     */
    public function onUnSubscribe(Conn $conn, $topic, $clients)
    {    	
    }


    /**
     * This will receive any Publish requests for this exact topic.
     *
     * @param \Ratchet\ConnectionInterface $conn
     * @param $topic
     * @param $event
     * @param array $exclude
     * @param array $eligible
     * @param array $clients
     * @return mixed|void
     */
    public function onPublish(Conn $conn, $topic, $event, array $exclude, array $eligible, $clients)
    {   	
    	$visitorId = explode('/', $topic)[1];
    	$operator = array('id' => $conn->User->getId(), 'firstname' => $conn->User->getFirstname(), 'avatar' => $conn->User->getAvatar());
    	
		foreach ($clients as $item) {
		
			if ($item->id === $visitorId) { 
				
				$item->lastMsgTime = time();						
				$item->messages[] = array('id' => uniqid(), 'from' => 'operator', 'operator' => $operator, 'date' => time(), 'msg' => $event);	
				
				$messages = $item->messages;
				$topic->broadcast($messages);			
								
			}
		}
    }  
}