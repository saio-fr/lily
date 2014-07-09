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
    	
    	// Test if visitor is already connected
    	foreach ($clients as $item) {
			if ($item->id === $sid && $item->type === 'visitor') { 
				// We send back the logged messages list
				$topic->broadcast($item->messages);
				return;
			}
		}
		
		$date = new \Datetime();
		
		// Else we create a new visitor class
    	$visitor = new \StdClass;
        $visitor->id = $sid;
        $visitor->name = substr($sid, 0, 9);
        $visitor->type = 'visitor';
        $visitor->firstname = null;
        $visitor->lastname = null;
        $visitor->email = null;
        $visitor->operator = null;
        $visitor->banned = false;
        $visitor->closed = false;
        $visitor->startTime = $date->getTimestamp();
        $visitor->lastMsgTime = $date->getTimestamp();
        $visitor->messages = array();
        // Questions asked to the avatar
        $visitor->questions = array();
        // Pages seen by the visitor
        $visitor->pages = array();
        $visitor->topic = $topic;
        
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
    	$clients->detach($visitor);
        $topic->broadcast($conn->resourceId . " has left " . $topic->getId());
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
    	
		foreach ($clients as $item) {
		
			if ($item->id === $visitorId) { 
				
				$date = new \Datetime();
				$timestamp = $date->getTimestamp();
				
				$item->lastMsgTime = $timestamp;
						
				$item->messages[] = array('id' => uniqid(), 'from' => 'operator', 'date' => $timestamp, 'msg' => $event);	
				
				$messages = $item->messages;
				$topic->broadcast($messages);			
								
			}
		}
    }  
}