<?php
namespace Lily\ChatBundle\Command;

use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;

class AnalyticsCommand extends ContainerAwareCommand
{
    protected function getEntityManager($licence)
    {
        // Get the client' entity manager
        $connection = $this->getContainer()->get(sprintf('doctrine.dbal.%s_connection', 'client'));
        $connection->close();

        $refConn = new \ReflectionObject($connection);
        $refParams = $refConn->getProperty('_params');
        $refParams->setAccessible('public'); //we have to change it for a moment

        $params = $refParams->getValue($connection);
        $params['dbname'] = $licence;

        $refParams->setAccessible('private');
        $refParams->setValue($connection, $params);

        $em = $this->getContainer()->get('doctrine')->getManager('client');
        return $em;
    }

    protected function configure()
    {
        $this->setName('ws:analytics')
             ->setDescription('Send daily analytics to segment io');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $analytics = $this->getContainer()->get('analytics');

        $clients = $this->getContainer()
            ->get('doctrine')
            ->getManager('default')
            ->getRepository('LilyUserBundle:Client')
            ->findAll();

        foreach ($clients as $client) {

            $licence = $client->getLicence();
            $em = $this->getEntityManager($licence);

            $logs = $em->getRepository('LilyChatBundle:LogChat')
                ->dailyClientConversations();

            foreach ($logs as $log) {

                // create a new array messages without server msg
                $iterator = 0;
                $conversations = [];
                $operator = $log->getOperators()[0];

                if (!$operator) {
                  break;
                }

                foreach ($log->getMessages() as $message) {
                    // If the chat is transfered, it's a new conversation & a new operator
                    if ($message['from'] === 'server' && $message['action'] === 'transfer') {
                      ++$iterator;
                      $operator = $log->getOperators()[$iterator];
                    }
                    // Keep only human messages
                    if ($message['from'] !== 'server') {
                        $conversations[$iterator]['messages'][] = $message;
                        $conversations[$iterator]['operator'] = $operator;
                    }
                }

                foreach ($conversations as $conversation) {

                    $firstOperatorMsg = false;
                    $endMsg = end($conversation['messages']);

                    $firstMsg = reset($conversation['messages']);
                    $totalTime = $endMsg['date'] - $firstMsg['date'];

                    // Arbitrary high value
                    $maxTimeToFirstAnswer = 99999;

                    foreach ($conversation['messages'] as $message) {
                        if (!$firstOperatorMsg && $message['from'] === 'operator') {
                            $firstOperatorMsg = $message;
                        }
                    }

                    // Calculate delta time between first visitor msg & first operator msg
                    if ($firstOperatorMsg) {
                        $timeToFirstAnswer = ($firstOperatorMsg['date'] - reset($conversation['messages'])['date']);
                    } else {
                        $timeToFirstAnswer = $maxTimeToFirstAnswer;
                    }

                    $properties = array(
                      "timeToFirstAnswer" => $timeToFirstAnswer,
                      "totalTime" => $totalTime,
                      "operatorId" => $operator,
                      "visitorId" => $log->getSession(),
                      "satisfaction" => $log->getSatisfaction()
                    );

                    // Now determinate if the conversation is completed, dropped, or missed
                    if ($timeToFirstAnswer <= $maxTimeToFirstAnswer) {
                        // completed or dropped ?
                        if (end($conversation['messages'])['from'] === 'server'
                            || end($conversation['messages'])['from'] === 'operator') {
                            // complete
                            $event = "conversation was completed";
                        } else {
                            // dropped
                            $event = "conversation was dropped";
                        }
                    } else {
                        //missed
                        $event = "conversation was missed";
                    }
                    // Send event
                    $analytics->track($operator, $event, $properties);
                }
            }
        }
    }
}
