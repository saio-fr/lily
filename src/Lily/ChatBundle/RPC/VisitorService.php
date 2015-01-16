<?php

namespace Lily\ChatBundle\RPC;

use Ratchet\ConnectionInterface as Conn;

class VisitorService {
  
    protected $container;

    public function setContainer($container) {
        $this->container = $container;
    }

    public function getContainer() {
        return $this->container;
    }

    /**
     * When connect on ws, set current page + check if the visitor is already chatting
     */
    public function connect(Conn $conn, $params, \StdClass $client) {
      
        foreach ($client->users as $item) {
            if ($item->id === $conn->Session->getId()) {
              
                $item->pages[] = array('href' => $params['href'], 'pathname' => $params['pathname']);
                
                $result = array(
                    'display' => $item->display, 
                    'chatting' => !$item->closed, 
                    'showContactForm' => $item->showContactForm
                ); 
                
                return $result;
            }
        }
    }

    /**
     * Set that visitors used the app (used in logConnection)
     */
    public function display(Conn $conn, $params, \StdClass $client) {
      
        foreach ($client->users as $item) {
            if ($item->id === $conn->Session->getId()) {
              
                // Set displayed to true for usage statistics
                if ($params['display']) {
                  $item->displayed = true;
                }
                // Show or not the app on new page
                $item->display = $params['display'];
            }
        }
        return array('result' => true);
    }

    /**
     * Set visitors' contact informations from contact from
     */
    public function contactForm(Conn $conn, $params, \StdClass $client) {
      
        foreach ($client->users as $item) {
            if ($item->id === $conn->Session->getId()) {
                $item->firstname = $params['firstname'];
                $item->lastname = $params['lastname'];
                $item->email = $params['email'];
                $item->showContactForm = false;
            }
        }
        return array('result' => true);
    }

    /**
     * Set asked question to the avatar
     */
    public function newAviQuestion(Conn $conn, $params, \StdClass $client) {
      
        foreach ($client->users as $item) {
            if ($item->id === $conn->Session->getId()) {
                $item->questions[] = $params['question'];
            }
        }

        return array('result' => true);
    }

    /**
     * Open the conversation with the visitor
     */
    public function open(Conn $conn, $params, \StdClass $client) {
      
        foreach ($client->users as $item) {

            if ($item->type === 'operator' && 
                $item->available && 
                $item->chats < $client->config->getMax()) {
                  
                $availables[] = $item;
            }
        }

        foreach ($client->users as $item) {

            if ($item->id === $conn->Session->getId()) {

                if ($item->operator) {
                    $item->topic->broadcast($item->messages);
                    return;
                }
                
                // Start chat
                $item->messages[] = array(
                  'id' => uniqid(), 
                  'from' => 'server', 
                  'date' => time(), 
                  'action' => 'startChat'
                );

                if (!empty($availables) && $client->config->getAutoSetOperator()) {

                    $key = array_rand($availables, 1);
                    $availables[$key]->chats += 1;

                    $operator = array(
                        'id' => $availables[$key]->id,
                        'firstname' => $availables[$key]->firstname,
                        'avatar' => $availables[$key]->avatar);

                    $item->operator = $availables[$key]->id;
                    $item->startChatTime = time();
                    $item->received += 1;
                    $item->messages[] = array(
                        'id' => uniqid(),
                        'from' => 'operator',
                        'operator' => $operator,
                        'date' => time(),
                        'msg' => $availables[$key]->welcome);
                }

                $item->topic->broadcast($item->messages);
                $item->closed = false;
            }
        }
        return array('result' => true);
    }

    /**
     * Is the visitor writing ?
     */
    public function writing(Conn $conn, $params, \StdClass $client) {
      
        foreach ($client->users as $item) {
            if ($item->id === $conn->Session->getId()) {
                $item->writing = $params['writing'];
            }
        }
        return array('result' => true);
    }

    /**
     * Set chat satisfaction
     */
    public function satisfaction(Conn $conn, $params, \StdClass $client) {
      
        foreach ($client->users as $item) {
            if ($item->id === $conn->Session->getId()) {
                $item->satisfaction = $params['satisfaction'];
            }
        }
        return array('result' => true);
    }

}