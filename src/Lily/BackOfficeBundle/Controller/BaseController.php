<?php

namespace Lily\BackOfficeBundle\Controller;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpFoundation\Request;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;

use \ZMQContext;
use \ZMQ;

class BaseController extends FOSRestController implements ClassResourceInterface
{
    
    protected function getClient()
    {
        $client = $this->getUser()->getClient();   		     
        return $client;
    }
    
    protected function getLicence()
    {
        $licence = $this->getClient()->getLicence();  		     
        return $licence;
    }
    
    protected function getEntityManager()
    {	   	  			  
        $connection = $this->container->get(sprintf('doctrine.dbal.%s_connection', 'client'));
	
        $refConn = new \ReflectionObject($connection);
        $refParams = $refConn->getProperty('_params');
        $refParams->setAccessible('public'); //we have to change it for a moment
	
        $params = $refParams->getValue($connection);
        $params['dbname'] = $this->getLicence();
	
        $refParams->setAccessible('private');
        $refParams->setValue($connection, $params);
	    
        return $this->get('doctrine')->getManager('client');
    }
    
    protected function getForm($type, $entity, $request) 
    {      
        $request = json_decode($request->getContent(), true);
        $form = $this->createForm($type, $entity);
        $form->bind($request);
        return $form;
    }

    protected function deserialize($class, Request $request, $format = 'json')
    {
        $serializer = $this->get('serializer');
        $validator = $this->get('validator');

        try {
            $entity = $serializer->deserialize($request->getContent(), $class, $format);
        } catch (RuntimeException $e) {
            throw new HttpException(400, $e->getMessage());
        }

        if (count($errors = $validator->validate($entity))) {
            return $errors;
        }

        return $entity;
    }
    
    protected function publishConfig($config) {

        $licence = $this->getLicence();
        $cache = $this->get('aequasi_cache.instance.default');
        
        // Client Config
  			$em = $this->getDoctrine()->getManager();
  			$client = $em->getRepository('LilyUserBundle:Client')
        ->findOneByLicence($licence)
        ->getConfig();
                    
        $avi = $config->getAvi();
        $redirections = $avi->getRedirections();
        $chat = $config->getChat();
        
        $avi->setActive($avi->getActive() && $client->getAvi());  
        $chat->setActive($chat->getActive() && $client->getChat());
        // Little hack to persist entity into memcached
        $redirections->setMail($redirections->getMail());
        
        $config->setMaintenance($config->getMaintenance() && $client->getMaintenance());
        $config->setTopquestions($config->getTopquestions() && $client->getTopquestions());
        $config->setFaq($config->getFaq() && $client->getFaq());
        $config->setAvi($avi);
        $config->setChat($chat);

        // Save config for front app
        $cache->save($licence.'_config_app', $config, 0);

        // Save config for chat servers
        $cache->save($licence.'_config_app_chat', $config->getChat(), 0);

        // Tell our chat app that config changed
        $context = new ZMQContext();
        $socket = $context->getSocket(ZMQ::SOCKET_PUSH, 'pusher');
        $socket->connect("tcp://172.16.0.2:5555");
        $socket->connect("tcp://172.16.0.3:5555");
        $socket->connect("tcp://172.16.0.4:5555");

        $socket->send(json_encode(array('action' => 'config', 'licence' => $licence)));

    }

}