<?php

namespace Lily\UserBundle\Command;

use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use FOS\UserBundle\Model\User;
use FOS\UserBundle\Command\CreateUserCommand as BaseCommand;

class CreateUserCommand extends BaseCommand
{
    /**
     * @see Command
     */
    protected function configure()
    {
        parent::configure();
        $this
            ->setName('lily:user:create')
            ->getDefinition()->addArguments(array(
            	new InputArgument('client', InputArgument::REQUIRED, 'Client'),
                new InputArgument('lastname', InputArgument::REQUIRED, 'Lastname'),
                new InputArgument('firstname', InputArgument::REQUIRED, 'Firstname')
            ))
        ;
        $this->setHelp(<<<EOT
// Write first name and last name
EOT
            );
    }

    /**
     * @see Command
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
    	$client   = $input->getArgument('client');
        $username   = $input->getArgument('username');
        $email      = $input->getArgument('email');
        $password   = $input->getArgument('password');
        $lastname  = $input->getArgument('lastname');
        $firstname   = $input->getArgument('firstname');
        $inactive   = $input->getOption('inactive');
        $superadmin = $input->getOption('super-admin');

        /** @var \FOS\UserBundle\Model\UserManager $user_manager */
        $user_manager = $this->getContainer()->get('fos_user.user_manager');

        /** @var \Lily\LilyUserBundle\Entity\User $user */
        $user = $user_manager->createUser();
        $user->setUsername($username);
        $user->setEmail($email);
        $user->setClient($client);
        $user->setPlainPassword($password);
        $user->setEnabled((Boolean) !$inactive);
        $user->setSuperAdmin((Boolean) $superadmin);
        $user->setLastname($lastname);
        $user->setFirstname($firstname);

        $user_manager->updateUser($user);

        $output->writeln(sprintf('Created user <comment>%s</comment>', $username));
    }

    /**
     * @see Command
     */
    protected function interact(InputInterface $input, OutputInterface $output)
    {
        parent::interact($input, $output);
        if (!$input->getArgument('lastname')) {
            $lastname = $this->getHelper('dialog')->askAndValidate(
                $output,
                'Please choose a last name:',
                function($lastname) {
                    if (empty($lastname)) {
                        throw new \Exception('last name can not be empty');
                    }

                    return $lastname;
                }
            );
            $input->setArgument('lastname', $lastname);
        }
        if (!$input->getArgument('firstname')) {
            $firstname = $this->getHelper('dialog')->askAndValidate(
                $output,
                'Please choose a firstname:',
                function($firstname) {
                    if (empty($firstname)) {
                        throw new \Exception('firstname can not be empty');
                    }

                    return $firstname;
                }
            );
            $input->setArgument('firstname', $firstname);
        }
        
        if (!$input->getArgument('client')) {
            $client = $this->getHelper('dialog')->askAndValidate(
                $output,
                'Please choose a client (by licence):',
                function($licence) {
                    if (empty($licence)) {
                        throw new \Exception('licence can not be empty');
                    }
                    
                    $em = $this->getContainer()->get('doctrine')->getManager();
					$client = $em->getRepository('LilyClientBundle:Client')->findOneByLicence($licence);
			
					if (!$client) {
						throw new \Exception('client has not been fund');
					}

                    return $client;
                }
            );
            $input->setArgument('client', $client);
        }
        
        
    }
}

