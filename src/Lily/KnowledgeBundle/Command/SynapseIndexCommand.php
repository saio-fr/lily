<?php

namespace Lily\KnowledgeBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class SynapseIndexCommand extends ContainerAwareCommand {

   protected function configure()
   {
        $this
            ->setName('synapse:index')
            ->setDescription('index our questions in synapse db')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {

        $clients = $this->getContainer()
                       ->get('doctrine')
                       ->getManager('default')
                       ->getRepository('LilyUserBundle:Client')
                       ->findAll();

        foreach ($clients as $client) {

            $licence = $client->getLicence();

            // Switch db connection to client database
            $this->setConnection($licence);

            // Get all the questions in our client db index
            $questions = $this->getContainer()
                              ->get('doctrine')
                              ->getManager('client')
                              ->getRepository('LilyKnowledgeBundle:Question')
                              ->findAll();

            // Init synapse service
            $synapse = $this->getContainer()->get('synapse_connector');

            // Delete the previous registered questions in synapse db
            $synapse->resetData($client);

            foreach ($questions as $question) {

                // Now add the parent question to synpase
                $synapse->addQuestionAnswer($client, $question);

                // And then add the alternatives
                foreach ($question->getAlternatives() as $alt) {
                    $synapse->addAdditionalQuestion($client, $alt);
                }
            }
            // Build the new synapse index
            $synapse->buildIndex($client);
        }

        $output->writeln('<info>All done fella</info>');
    }

    protected function setConnection($licence)
    {
     		$connection = $this->getContainer()->get(sprintf('doctrine.dbal.%s_connection', 'client'));

  	    $refConn = new \ReflectionObject($connection);
  	    $refParams = $refConn->getProperty('_params');
  	    $refParams->setAccessible('public'); //we have to change it for a moment

  	    $params = $refParams->getValue($connection);
  	    $params['dbname'] = $licence;

  	    $refParams->setAccessible('private');
  	    $refParams->setValue($connection, $params);
    }
}
