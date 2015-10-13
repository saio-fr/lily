<?php

namespace Lily\ChatBundle\Topic;

use Lily\ChatBundle\Topic\TopicInterface;

use Ratchet\ConnectionInterface as Conn;

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
    public function onSubscribe(Conn $conn, $topic, $users)
    {
        // Security check
        if (!isset($conn->User)) { return; }

    	  // Test if opeartor is already connected
        foreach ($users as $item) {
            if ($item->id === $conn->User->getId() && $item->type === 'operator') {
                $item->lastPing = time();
                $item->conn = $conn;
				return;
			}
		}

    	$operator = new \StdClass;
        $operator->id = $conn->User->getId();
        $operator->conn = $conn;
        $operator->lastPing = time();
        $operator->type = 'operator';
        $operator->welcome = $conn->User->getConfig()->getWelcomeMsg();
        $operator->avatar = $conn->User->getConfig()->getAvatar();
        $operator->firstname = $conn->User->getFirstname();
        $operator->lastname = $conn->User->getLastname();
        $operator->groups = $conn->User->getGroupNames();
        $operator->messages = array();
        $operator->available = false;
        $operator->chats = 0;

        $users->attach($operator);
    }

    /**
     * This will receive any UnSubscription requests for this exact topic.
     *
     * @param \Ratchet\ConnectionInterface $conn
     * @param $topic
     * @param array
     * @return mixed|void
     */
    public function onUnSubscribe(Conn $conn, $topic, $users)
    {

        // Security check
        if (!isset($conn->User)) { return; }

    	foreach ($users as $item) {
            if ($item->id === $conn->User->getId() && $item->type === 'operator') {
			    $users->detach($item);
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
     * @param array $users
     * @return mixed|void
     */
    public function onPublish(Conn $conn, $topic, $event, array $exclude, array $eligible, $users)
    {
		foreach ($users as $item) {

            if ($item->id === $conn->Session->getId()) {

                $item->sent += 1;
                $item->lastMsgTime = time();
                $item->messages[] = array(
                    'id' => uniqid(),
                    'from' => 'visitor',
                    'date' => time(),
                    'msg' => $event);
                $item->topic->broadcast($item->messages);

        	}
        }
    }
}
