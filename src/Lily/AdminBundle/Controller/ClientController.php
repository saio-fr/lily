<?php

namespace Lily\AdminBundle\Controller;

use Lily\AdminBundle\Controller\BaseController;
use Lily\UserBundle\Entity\Client;
use Lily\UserBundle\Entity\ClientConfig;

use Lily\BackOfficeBundle\Entity\Config as LilyConfig;
use Lily\BackOfficeBundle\Entity\ConfigAvi;
use Lily\BackOfficeBundle\Entity\ConfigAviRedirections;
use Lily\BackOfficeBundle\Entity\ConfigChat;

use Symfony\Bundle\FrameworkBundle\Console\Application as Console;
use Symfony\Component\Console\Output\BufferedOutput;
use Symfony\Component\HttpFoundation\Request;

use FOS\RestBundle\Controller\Annotations\Post;

use JMS\SecurityExtraBundle\Annotation\Secure;

class ClientController extends BaseController
{

    /**
     * @Post("/")
     * @Secure(roles="ROLE_SUPER_ADMIN")
     */
    public function addAction(Request $request) {
  
        // We get the client's informations
        $client = $this->deserialize('Lily\UserBundle\Entity\Client', $request);
        $config = $this->deserialize('Lily\UserBundle\Entity\ClientConfig', $request);
    
        // If there is an error, return
        if ($client instanceof Client === false || $config instanceof ClientConfig === false ) {
            $view = $this->view(array('client' => $client, 'config' => $config), 400);
            return $this->handleView($view);
        }
        $licence = uniqid();
        $client->setLicence($licence);
        $client->setConfig($config);
    
        // We persist the new client entity
        $em = $this->getDoctrine()->getManager('default');
        $em->persist($client);
        $em->flush();
    
        // We initiliaze the database creation
        $kernel = $this->get('kernel');
        $console = new Console($kernel);
        $console->setAutoExit(false);
        $output = new BufferedOutput();
        $this->setConnection($licence);
    
        // We create the database
        $options = array('command' => 'doctrine:database:create', '--connection' => 'client');
        $errors = $console->run(new \Symfony\Component\Console\Input\ArrayInput($options), $output);
    
        // If there is an error, return
        if ($errors !== 0) {
            $view = $this->view('An error happened while creating database', 400);
            return $this->handleView($view);
        }
    
        // Schema update
        $options = array('command' => 'doctrine:schema:update', '--em' => 'client', '--force' => true);
        $errors = $console->run(new \Symfony\Component\Console\Input\ArrayInput($options), $output);
    
        // If there is an error, return
        if ($errors !== 0) {
            $view = $this->view('An error happened while updating database', 400);
            return $this->handleView($view);
        }
    
        // Then we create a new lily config entity
        $config = new LilyConfig();
        
        $configChat = new ConfigChat();
        $configAvi = new ConfigAvi();
        
        $configAviRedirections = new ConfigAviRedirections();       
        $configAvi->setRedirections($configAviRedirections);
        
        $config->setChat($configChat);
        $config->setAvi($configAvi);
    
        // If the client got chat option, then set default home page to chat
        if ($client->getConfig()->getChat()) $config->setHome('chat');
        else $config->setHome('avi');
    
        // Persist the config
        $em = $this->getDoctrine()->getManager('client');
        $em->persist($config);
        $em->flush();
    
        $this->createClientDir($licence);
    
        $view = $this->view($client);
        return $this->handleView($view);
  
    }
  
    private function createClientDir($licence) {
      
        $fs = $this->container->get('oneup_flysystem.cdn_filesystem');
        $fs->createDir('customer/'.$licence.'/images/avatars/tmp');
        $fs->write('customer/'.$licence.'/css/lily-custom.css', $fs->read('themes/lily/css/lily-custom.css'));
        $fs->write('customer/'.$licence.'/css/lily-float.css', $fs->read('themes/lily/css/lily-float.css'));
        $fs->write('customer/'.$licence.'/images/universe.png', $fs->read('themes/lily/images/universe.png'));
        $fs->write('customer/'.$licence.'/js/avatar.js', $fs->read('themes/lily/js/avatar.js'));
        $fs->write('customer/'.$licence.'/templates/avatar-svg.html', $fs->read('themes/lily/templates/avatar-svg.html'));
        
    }

}
