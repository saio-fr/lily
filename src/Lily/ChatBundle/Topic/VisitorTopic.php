<?php

namespace Lily\ChatBundle\Topic;

use Lily\ChatBundle\Topic\TopicInterface;

use Ratchet\ConnectionInterface as Conn;

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
    public function onSubscribe(Conn $conn, $topic, $users)
    {
    	  // Session id
        $sid = $conn->Session->getId();

        // Delete the topic when the visitor leaves
        $topic->autoDelete = true;

        // Test if visitor is already connected
        foreach ($users as $item) {
            if ($item->id === $sid && $item->type === 'visitor') {

				$item->topic = $topic;
				$item->conn = $conn;
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
        $visitor->conn = $conn;

        // PERSONAL INFOS
        $visitor->name = 'ID'.substr($sid, 0, 9);
        $visitor->type = 'visitor';
        $visitor->externalId = null;
        $visitor->firstname = null;
        $visitor->lastname = null;
        $visitor->email = null;
		$visitor->customFields = [];

        // APP INFOS
        $visitor->appDisplay = false; // Display the app ?
        $visitor->widgetUsed = false; // Is the app been displayed ?
        $visitor->widgetDisplayed = false; // Is the widget been displayed ?
        $visitor->questions = array(); // Questions asked to the avatar
        $visitor->pages = array(); // Pages seen by the visitor
        $visitor->media = 'pc';

        // CHAT INFOS
        $visitor->operator = null;
        $visitor->operators = array();
        $visitor->transfered = false;
        $visitor->satisfaction = null;
        $visitor->banned = false;
        $visitor->closed = true;
        $visitor->startTime = time();
        $visitor->lastConn = time();
        $visitor->waited = 0; // Waited time in second
        $visitor->sent = 0; // Number of messages sent
        $visitor->received = 0; // Number of operator's messages received
        $visitor->lastMsgTime = time();
        $visitor->writing = false; // Is the visitor writing ?
        $visitor->messages = array(); // Messages sent
        $visitor->showContactForm = true; // Did the visitor auth on contact form screen ?

        $users->attach($visitor);
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
    	  $visitorId = explode('/', $topic)[2];

        $operator = array(
            'id' => $conn->User->getId(),
            'firstname' => $conn->User->getFirstname(),
            'avatar' => $conn->User->getConfig()->getAvatar()
        );

        foreach ($users as $item) {
            if ($item->id === $visitorId) {

                $item->received += 1;

                if (count($item->messages) > 0 && end($item->messages)['from'] == 'visitor') {
                    $item->waited += time() - $item->lastMsgTime;
				}

                $item->lastMsgTime = time();
                $item->messages[] = array(
                    'id' => uniqid(), 'from' =>
                    'operator', 'operator' => $operator,
                    'date' => time(),
                    'msg' => $event
                );

                $topic->broadcast($item->messages);
			}
		}
    }
}
