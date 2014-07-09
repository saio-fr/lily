<?php

namespace Lily\ChatBundle\Topic;

use Ratchet\ConnectionInterface as Conn;

interface TopicInterface
{
    /**
     * A request to subscribe to a topic has been made
     * @param \Ratchet\ConnectionInterface $conn
     * @param string|Topic                 $topic The topic to subscribe to
     * @param array                        $clients A list of all chat activities
     */
     public function onSubscribe(Conn $conn, $topic, $clients);

    /**
     * A request to unsubscribe from a topic has been made
     * @param \Ratchet\ConnectionInterface $conn
     * @param string|Topic                 $topic The topic to unsubscribe from
     * @param array                        $clients A list of all chat activities
     */
     public function onUnSubscribe(Conn $conn, $topic, $clients);

    /**
     * A client is attempting to publish content to a subscribed connections on a URI
     * @param \Ratchet\ConnectionInterface $conn
     * @param string|Topic                 $topic The topic the user has attempted to publish to
     * @param string                       $event Payload of the publish
     * @param array                        $exclude A list of session IDs the message should be excluded from (blacklist)
     * @param array                        $eligible A list of session Ids the message should be send to (whitelist)
     * @param array                        $clients A list of all chat activities
     */
     public function onPublish(Conn $conn, $topic, $event, array $exclude, array $eligible, $clients);

}