<?php
namespace Lily\ChatBundle\Server;

use React\EventLoop\Factory as LoopFactory;
use React\ZMQ\Context;

/**
 * A Ratchet component that wraps Monolog loggers tracking received messages
 * @todo Get outgoing working; could create LoggingConnection decorator
 */
class DatabaseLogger implements MessageComponentInterface, WsServerInterface {

    try {
        $em = new PDO("sqlite:{$root}/reports/portLog.sqlite");
    } catch (PDOException $pe) {
        die($pe->getMessage() . "\n");
    }

    $loop    = new LoopFactory();
    $context = new Context($loop);

    $pull = $context->getSocket(ZMQ::SOCKET_PULL);
    $pull->bind('tcp://127.0.0.1:5555');

    $pull->on('error', function ($e) {
        echo "Error: {$e->getMessage()}\n";
    });

    $pull->on('message', function ($port) use ($db) {
        $db->prepare("INSERT OR IGNORE INTO portCounter VALUES (?, 0)")->execute(array((int)$port));
        $db->prepare("UPDATE portCounter SET count = count + 1 WHERE port LIKE ?")->execute(array((int)$port));
    });

    $loop->run();

}