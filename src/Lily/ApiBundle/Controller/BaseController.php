<?php

namespace Lily\ApiBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;

class BaseController extends FOSRestController implements ClassResourceInterface
{	
    
	protected function getClient($licence)
    {
    	$memcache = $this->get('memcache.default');
		$client = $memcache->get('client_'.$licence);
		
		if (!$client) {
		
	    	$client = $this->getDoctrine()
	    				   ->getManager()
						   ->getRepository('LilyClientBundle:Client')
				  		   ->findOneByLicence($licence);     	  			  
			
			$memcache->set('client_'.$licence, $client, 3600);
		
		}
		
        return $client;
    }
    
    protected function getConfig($licence)
    {
	    $memcache = $this->get('memcache.default');
	    $config = $memcache->get('config_'.$licence);
		
		if (!$config) {
			
			$em = $this->getEntityManager($licence);
			
			$app = $em->getRepository('LilyBackOfficeBundle:Config')
					  ->findOneById(1);
			
			$app->getAvi();
			$app->getChat();
			$app->getRedirections();
			
			$em = $this->getDoctrine()->getManager();
			
			$client = $em->getRepository('LilyClientBundle:Client')
					  	 ->findOneByLicence($licence)
					  	 ->getConfig();
						   
			$memcache->set('config_'.$licence, $config, 3600);
			
			$config = array('client' => $client, 'app' => $app);
		
		}
		
		return $config;
    }
    
    protected function getRedirection($licence)
    {
	    $memcache = $this->get('memcache.default');
	    $redirection = $memcache->get('redirection_'.$licence);
		
		if (!$redirection) {
			
			$redirection = $this->getEntityManager($licence)
						   		->getRepository('LilyKnowledgeBundle:Redirection')
						   		->findOneByBydefault(true);
						   
			$memcache->set('redirection_'.$licence, $redirection, 3600);
		
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