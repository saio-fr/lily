<?php

namespace Lily\ClientBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;

use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use Lily\ClientBundle\Entity\Client;

class CreateClientCommand extends ContainerAwareCommand
{
    /**
     * @see Command
     */
    protected function configure()
    {
    	$this
            ->setName('lily:client:create')
            ->setDescription('Create a new firm')
            ->addArgument('name')
            ->addArgument('cname')
            ->addArgument('faq')
            ->addArgument('livechat')
            ->addArgument('avi')
            ->addArgument('topquestions')
            ->addArgument('maxusers')
            ->addArgument('theme')
            
        ;
    }
    
        
    /**
     * @see Command
     */
    protected function interact(InputInterface $input, OutputInterface $output)
	{
	        if (!$input->getArgument('name')) {
            $name = $this->getHelper('dialog')->askAndValidate(
                $output,
                'Please choose a name:',
                function($name) {
                    if (empty($name)) {
                        throw new \Exception('Name can not be empty');
                    }

                    return $name;
                }
            );
            $input->setArgument('name', $name);
            }
            
            if (!$input->getArgument('cname')) {
            $cname = $this->getHelper('dialog')->askAndValidate(
                $output,
                'Please choose a concatenated name:',
                function($cname) {
                    if (empty($cname)) {
                        throw new \Exception('Cname can not be empty');
                    }

                    return $cname;
                }
            );
            $input->setArgument('cname', $cname);
            }
            
            if (!$input->getArgument('theme')) {
            $theme = $this->getHelper('dialog')->askAndValidate(
                $output,
                'Please choose a theme (default lily):',
                function($theme) {
                    if (empty($theme)) {
                        throw new \Exception('Theme can not be empty');
                    }

                    return $theme;
                }
            );
            $input->setArgument('theme', $theme);
            }
            
            if (!$input->getArgument('livechat')) {
            $livechat = $this->getHelper('dialog')->askAndValidate(
                $output,
                'Is livechat activated ? (true or false):',
                function($livechat) {
                    if (empty($livechat)) {
                        throw new \Exception('Can not be empty');
                    }

                    return $livechat;
                }
            );
            $input->setArgument('livechat', $livechat);
            }
            
            if (!$input->getArgument('avi')) {
            $avi = $this->getHelper('dialog')->askAndValidate(
                $output,
                'Is avi activated ? (true or false):',
                function($avi) {
                    if (empty($avi)) {
                        throw new \Exception('Can not be empty');
                    }

                    return $avi;
                }
            );
            $input->setArgument('avi', $avi);
            }
            
            if (!$input->getArgument('faq')) {
            $faq = $this->getHelper('dialog')->askAndValidate(
                $output,
                'Is Faq activated ? (true or false):',
                function($faq) {
                    if (empty($faq)) {
                        throw new \Exception('Can not be empty');
                    }

                    return $faq;
                }
            );
            $input->setArgument('faq', $faq);
            }
            
            if (!$input->getArgument('topquestions')) {
            $topquestions = $this->getHelper('dialog')->askAndValidate(
                $output,
                'Is Top Questions activated ? (true or false):',
                function($topquestions) {
                    if (empty($topquestions)) {
                        throw new \Exception('Can not be empty');
                    }

                    return $topquestions;
                }
            );
            $input->setArgument('topquestions', $topquestions);
            }
            
            if (!$input->getArgument('maxusers')) {
            $maxusers = $this->getHelper('dialog')->askAndValidate(
                $output,
                'How many max users ? (int):',
                function($maxusers) {
                    if (empty($maxusers)) {
                        throw new \Exception('Can not be empty');
                    }

                    return $maxusers;
                }
            );
            $input->setArgument('maxusers', $maxusers);
            }                        
	}

    /**
     * @see Command
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $name   = $input->getArgument('name');
        $cname      = $input->getArgument('cname');
        $theme      = $input->getArgument('theme');
        $avi      = $input->getArgument('avi');
        $livechat      = $input->getArgument('livechat');
        $faq      = $input->getArgument('faq');
        $topquestions      = $input->getArgument('topquestions');
        $maxusers      = $input->getArgument('maxusers');
        
        $licence =  uniqid();
        $logo = 'http://saio.fr/web/customer/'.$cname.'/images/'.$cname.'_logo.png';

        $client = new Client();
        
        $client->setName($name);
        $client->setCname($cname);
        $client->setTheme($theme);
        $client->setAvi($avi);
        $client->setChat($livechat);
        $client->setFaq($faq);
        $client->setTopquestions($topquestions);
        $client->setMaxusers($maxusers);
        $client->setLicence($licence);
        $client->setMaintenance(true);
        $client->setLogo($logo);

		$em = $this->getContainer()->get('doctrine')->getManager();
		$em->persist($client);
		$em->flush();

        $output->writeln(sprintf('Created client <comment>%s</comment>', $name));
    }

}

