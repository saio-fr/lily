<?php

namespace Lily\KnowledgeBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class SolrIndexCommand extends ContainerAwareCommand
{

   protected function configure()
    {
        $this
            ->setName('lily:solrindex')
            ->setDescription('indexer les questions')
            ->addArgument('client', InputArgument::OPTIONAL, 'Pour quel client?')
        ;
    }
    
    protected function execute(InputInterface $input, OutputInterface $output)
    {
    	$cname = $input->getArgument('client');
	    $client = $this->getContainer()->get('solarium.client.' . $cname);
	
		// Obtenir une update de la query
		$update = $client->createUpdate();
		
		// On crée les documents
		$documents = array();
	
	    $em = $this->getContainer()->get('doctrine')->getManager($cname);
	    $repo = $em->getRepository('LilyKnowledgeBundle:Question');
	    $questions = $repo->findAll();
		
		foreach ($questions as $question) {
			$documents[] = $question->toSolrDocument($update->CreateDocument());
		}
		
		// On ajoute Documents et une Commit Command à l'update query
		$update->addDocuments($documents);
		$update->addCommit();
		
		// On exécute la query
		$client->update($update);
	}
}