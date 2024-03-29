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

                $item->pages[] = array(
                    'href' => $params['href'],
                    'pathname' => $params['pathname']);

                $item->media = $params['media'];
                $options = $params['apiOptions'];

                if ($options) {

                    if ($options['operatorsGroupWanted']) {
                        $item->operatorsGroupWanted = intval($options['operatorsGroupWanted']);
                    }

                    if ($options['operatorsGroupWantedShouldFallback']) {

                        if (is_string($options['operatorsGroupWantedShouldFallback'])) {
                            $item->operatorsGroupWantedShouldFallback = $options['operatorsGroupWantedShouldFallback'] ? true : false;
                        }

                        if (is_bool($options['operatorsGroupWantedShouldFallback'])) {
                            $item->operatorsGroupWantedShouldFallback = $options['operatorsGroupWantedShouldFallback'];
                        }
                    }
                }

                $result = array(
                    'appDisplay' => $item->appDisplay,
                    'isConversationClosed' => $item->closed,
                    'showContactForm' => $item->showContactForm,
                    'time' => time()
                );

                return $result;
            }
        }
    }

    /**
     * Set that visitors used the app (used in logConnection)
     */
    public function appDisplay(Conn $conn, $params, \StdClass $client) {

        foreach ($client->users as $item) {
            if ($item->id === $conn->Session->getId()) {

                // Set displayed to true for usage statistics
                if ($params['display']) {
                  $item->widgetUsed = true;
                }
                // Show or not the app on new page
                $item->appDisplay = $params['display'];
            }
        }
        return array('result' => true);
    }


    /**
     * Identify visitor through front api
     */
    public function identify(Conn $conn, $params, \StdClass $client) {

        foreach ($client->users as $item) {
            if ($item->id === $conn->Session->getId()) {

                if (isset($params['externalId'])) {
                    $item->externalId = $params['externalId'];
                }

                if (isset($params['firstname'])) {
                    $item->firstname = $params['firstname'];
                }

                if (isset($params['lastname'])) {
                    $item->lastname = $params['lastname'];
                }

                if (isset($params['email'])) {
                    $item->email = $params['email'];
                }

                if (isset($params['customFields'])) {
                    $item->customFields = $params['customFields'];
                }

                return array('result' => true);
            }
        }

    }

    /**
     * Set that visitors used the app (used in logConnection)
     */
    public function widgetDisplayed(Conn $conn, $params, \StdClass $client) {

        foreach ($client->users as $item) {
            if ($item->id === $conn->Session->getId()) {

                $item->widgetDisplayed = true;
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
     * Start the conversation with the visitor
     */
    public function startChat(Conn $conn, $params, \StdClass $client) {

        foreach ($client->users as $item) {

            if ($item->type === 'operator' &&
                $item->available &&
                $item->chats < $client->config->getMax()) {

                $availables[] = $item;
            }
        }

        foreach ($client->users as $item) {

            if ($item->id === $conn->Session->getId()) {

                if ($item->closed) {
                    // Start chat
                    $item->messages[] = array(
                      'id' => uniqid(),
                      'from' => 'server',
                      'date' => time(),
                      'action' => 'startChat'
                    );
                }

                if ($item->operator) {
                    return;
                }

                if (!empty($availables) && $client->config->getAutoSetOperator()) {
                  
                    $groupWanted = $item->operatorsGroupWanted;

                    if ($groupWanted) {
                        $availablesInGroup = array_filter($availables, function($operator) use($groupWanted) {

                            foreach($operator->groups as $group) {
                                if ($group->getId() === $groupWanted) {
                                    return true;
                                }
                            }
                            return false;
                        });

                        if (!empty($availablesInGroup)) {
                            $availables = $availablesInGroup;
                        } else {
                            $item->closed = false;
                            return array('result' => true);
                        }
                    }
                  
                    $key = array_rand($availables, 1);
                    $availables[$key]->chats += 1;

                    $operator = array(
                        'id' => $availables[$key]->id,
                        'firstname' => $availables[$key]->firstname,
                        'avatar' => $availables[$key]->avatar);

                    $item->operator = $availables[$key]->id;
                    $item->operators[] = $availables[$key]->id;
                    $item->startChatTime = time();
                }

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
