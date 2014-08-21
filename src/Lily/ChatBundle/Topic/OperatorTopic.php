<?php

namespace Lily\ChatBundle\Topic;

use Lily\ChatBundle\Topic\TopicInterface;

use Ratchet\ConnectionInterface as Conn;
use Symfony\Component\Serializer\Serializer;

class OperatorTopic implements TopicInterface
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
    	
    	// Test if opeartor is already connected
    	foreach ($clients as $item) {
			if ($item->id === $conn->User->getId() && $item->type === 'operator') { 
				return;
			}
		}
		
    	$operator = new \StdClass;
        $operator->id = $conn->User->getId();
        $operator->enterprise = $conn->User->getEnterprise()->getKey();
        $operator->welcome = $conn->User->getWelcomeMsg();
        $operator->avatar = $conn->User->getAvatar();
        $operator->firstname = $conn->User->getFirstname();
        $operator->type = 'operator';
        $operator->messages = array();
        $operator->available = false;
        $operator->chats = 0;
        
        $clients->attach($operator);
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
    	foreach ($clients as $item) {
			if ($item->id === $conn->User->getId() && $item->type === 'operator') {
				$clients->detach($item);
			}
		}
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
		foreach ($clients as $item) {
		
			if ($item->id === $conn->Session->getId()) { 
				
				$item->closed = false;
				
				$item->messages[] = array('id' => uniqid(), 'from' => 'visitor', 'date' => time(), 'msg' => $event);
				$item->topic->broadcast($item->messages);
				
			}
		}
    }

}