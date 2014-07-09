<?php

namespace Lily\ChatBundle\Server\App\Handler;

use Ratchet\ConnectionInterface as Conn;

interface TopicHandlerInterface
{
    public function onSubscribe(Conn $conn, $topic, $clients);

    public function onUnSubscribe(Conn $conn, $topic, $clients);

    public function onPublish(Conn $conn, $topic, $event, array $exclude, array $eligible, $clients);
}