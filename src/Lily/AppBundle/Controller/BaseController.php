<?php

namespace Lily\AppBundle\Controller;

use Symfony\Component\HttpFoundation\Request;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;

class BaseController extends FOSRestController implements ClassResourceInterface
{	

	  protected function setMedia($entity)
    {
        $mobileDetector = $this->get('mobile_detect.mobile_detector');
        // Support d'utilisation
        if ($mobileDetector->isMobile()) { $entity->setMedia('mobile'); }
        if ($mobileDetector->isTablet()) { $entity->setMedia('tablet'); }
        if (!$mobileDetector->isMobile() && !$mobileDetector->isTablet()) { $entity->setMedia('pc'); }
        
        return $entity;
    }
    
	  protected function getClient($licence)
    {
    	  $cache = $this->get('aequasi_cache.instance.default');
        $client = $cache->fetch($licence.'_client');
		
        if (!$client) {
		
	    	    $client = $this->getDoctrine()
            ->getManager()
            ->getRepository('LilyUserBundle:Client')
            ->findOneByLicence($licence);     	  			  
			
            $cache->save($licence.'_client', $client, 0);
		
		    }
        return $client;
    }
    
    protected function getAppConfig($licence)
    {
  	    $cache = $this->get('aequasi_cache.instance.default');
  	    $config = $cache->fetch($licence.'_config_app');
  		
        if (!$config) {	
            // App
            $config = $this->getEntityManager($licence)
            ->getRepository('LilyBackOfficeBundle:Config')
            ->findOneById(1);
            
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

            $cache->save( $licence.'_config_app', $config, 0);
		    }
        return $config;
    }
    
    protected function getChatConfig($licence)
    {
  	    $cache = $this->get('aequasi_cache.instance.default');
  	    $config = $cache->fetch($licence.'_config_app_chat');

        if (!$config) {	
      			$em = $this->getEntityManager($licence);
      			$config = $em->getRepository('LilyBackOfficeBundle:Config')
            ->findOneById(1);
            $config = $config->getChat();

            $cache->save( $licence.'_config_app_chat', $config, 0 );
		    }
        return $config;
    }
    
    protected function getAviConfig($licence)
    {
  	    $cache = $this->get('aequasi_cache.instance.default');
  	    $config = $cache->fetch($licence.'_config_app_avi');
  		
        if (!$config) {	
      			$em = $this->getEntityManager($licence);
      			$config = $em->getRepository('LilyBackOfficeBundle:Config')
            ->findOneById(1);
            $config = $config->getAvi();

            $cache->save( $licence.'_config_app_avi', $config, 0 );
		    }
        return $config;
    }
    
    protected function getClientConfig($licence)
    {
  	    $cache = $this->get('aequasi_cache.instance.default');
  	    $config = $cache->fetch($licence.'_config');
  		
        if (!$config) {	
      			$em = $this->getDoctrine()->getManager();
      			$config = $em->getRepository('LilyUserBundle:Client')
            ->findOneByLicence($licence)
            ->getConfig();

            $cache->save( $licence.'_config', $config, 0 );
		    }
        return $config;
    }
    
    protected function isChatAvailable($licence)
    {
        $cache = $this->get('aequasi_cache.instance.default');
        $available = $cache->fetch('chat_available_'.$licence);
        return $available;
    }
    
    protected function getDefaultRedirection($licence)
    {
	      $cache = $this->get( 'aequasi_cache.instance.default' );
        $redirection = $cache->fetch( $licence.'_redirection' );
		
        if (!$redirection) {
			
            $redirection = $this->getEntityManager($licence)
						->getRepository('LilyKnowledgeBundle:Redirection')
						->findOneByBydefault(true);
						   
            $cache->save( $licence.'_redirection', $redirection, 3600 );
		
		    }
        return $redirection;
    }
        
    protected function getEntityManager($licence)
    {	   	  			  
     		$connection = $this->container->get('doctrine.dbal.client_connection');
  	
  	    $refConn = new \ReflectionObject($connection);
  	    $refParams = $refConn->getProperty('_params');
  	    $refParams->setAccessible('public'); //we have to change it for a moment
  	
  	    $params = $refParams->getValue($connection);
  	    $params['dbname'] = $licence;
  	
  	    $refParams->setAccessible('private');
  	    $refParams->setValue($connection, $params);
	    
        return $this->get('doctrine')->getManager('client');
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

}