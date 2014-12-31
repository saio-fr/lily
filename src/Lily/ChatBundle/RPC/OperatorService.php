<?php

namespace Lily\ChatBundle\RPC;

use Ratchet\ConnectionInterface as Conn;

class OperatorService {

    protected $container;

    public function setContainer($container) {
        $this->container = $container;
    }

    public function getContainer() {
        return $this->container;
    }

    /**
     * Set an operator to the chat
     */
    public function setOperator(Conn $conn, $params, \StdClass $client) {
        // Security check
        if (!isset($conn->User)) { return; }
      
        foreach ($client->users as $item) {
            if ($item->id === $params['sid']) {

                $item->operator = $conn->User->getId();
                $item->startChatTime = time();
                $item->messages[] = array(
                    'id' => uniqid(), 
                    'from' => 'server', 
                    'date' => time(), 
                    'action' => 'startChat'
                );

            }
            // Increase the operator' active chats
            if ($item->id === $conn->User->getId()) {
                $item->chats += 1;
            }
        }

        return array('result' => true);
    }

    /**
     * Ban an visitor for his session time
     */
    public function ban(Conn $conn, $params, \StdClass $client) {
        // Security check
        if (!isset($conn->User)) { return; }
        
        foreach ($client->users as $item) {
            if ($item->id === $params['sid']) {
                $item->banned = true;
                $item->messages[] = array('id' => uniqid(), 'from' => 'operator', 'operator' => null, 'date' => time(), 'msg' => "Vous avez été banni du chat par l'opérateur.");
                $item->topic->broadcast($item->messages);
            }
            // Decrease the operator' active chats
            if ($item->id === $conn->User->getId()) {
                $item->chats -= 1;
            }
        }

        return array('result' => true);
    }

    /**
     * Update the personal informations of the visitor
     */
    public function updateInformations(Conn $conn, $params, \StdClass $client) {
        // Security check
        if (!isset($conn->User)) { return; }
        
        foreach ($client->users as $item) {
            if ($item->id === $params['sid']) {
                $item->firstname = $params['firstname'];
                $item->lastname = $params['lastname'];
                $item->email = $params['email'];
            }
        }
        return array('result' => true);
    }

    /**
     * Change chat's name
     */
    public function changeName(Conn $conn, $params, \StdClass $client) {
        // Security check
        if (!isset($conn->User)) { return; }
        
        foreach ($client->users as $item) {
            if ($item->id === $params['sid']) {
                $item->name = $params['name'];
            }
        }

        return array('result' => true);
    }

    /**
     * Close the conversation with the visitor
     */
    public function close(Conn $conn, $params, \StdClass $client) {
        // Security check
        if (!isset($conn->User)) { return; }
        
        foreach ($client->users as $item) {
            // Close the conversation
            if ($item->id === $params['sid']) {

                $item->operator = null;
                $item->lastMsgTime = time();
                $item->closed = true;
                $item->messages[] = array('id' => uniqid(), 'from' => 'operator', 'operator' => null, 'date' => time(), 'msg' => "L'opérateur a clôt la conversation.");
                $item->topic->broadcast($item->messages);

            }
            // Decrease the operator' active chats
            if ($item->id === $conn->User->getId()) {
                $item->chats -= 1;
            }
        }

        return array('result' => true);
    }

    /**
     * Transfer the visitor to another operator
     */
    public function transfer(Conn $conn, $params, \StdClass $client) {
        // Security check
        if (!isset($conn->User)) { return; }
        
        foreach ($client->users as $item) {
            // Close the conversation
            if ($item->id === $params['sid']) {
                $item->operator = $params['operator'];
                $item->transfered = true;
                $item->messages[] = array('id' => uniqid(), 'from' => 'server', 'date' => time(), 'action' => 'transfered', 'transfer_from' => $conn->User->getFirstname() . ' ' . $conn->User->getLastname());
            }

            // Decrease the operator' active chats
            if ($item->id === $conn->User->getId()) $item->chats -= 1;

            // Increase the new operator' active chats
            if ($item->id === $params['operator']) $item->chats += 1;
        }

        return array('result' => true);
    }


    /**
     * Set the operator as unavailable
     */
    public function unavailable(Conn $conn, $params, \StdClass $client) {
        // Security check
        if (!isset($conn->User)) { return; }
        
        $chats = 0;

        foreach ($client->users as $item) {

            if (isset($item->operator) && $item->operator == $conn->User->getId()) {

                $item->operator = null;
                $chats += 1;
            }
        }

        foreach ($client->users as $item) {
            if ($item->id === $conn->User->getId()) {
                $item->available = false;
                $item->chats -= $chats;
            }
        }

        return array('result' => true);
    }

    /**
     * Set the operator as available
     */
    public function available(Conn $conn, $params, \StdClass $client) {
        // Security check
        if (!isset($conn->User)) { return; }

        foreach ($client->users as $item) {
            if ($item->id === $conn->User->getId()) {
                $item->available = true;
            }
        }

        return array('result' => true);
    }

    /**
     * Is the operator available ?
     */
    public function isAvailable(Conn $conn, $params, \StdClass $client) {
        // Security check
        if (!isset($conn->User)) { return; }
        
        foreach ($client->users as $item) {
            if ($item->id === $conn->User->getId()) {
                if ($item->available) { $available = true; }
                else { $available = false; }
            }
        }
        return array('result' => $available);
    }

}