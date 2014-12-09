<?php

namespace Lily\ApiBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;

class BaseController extends FOSRestController implements ClassResourceInterface
{	
    
	protected function getClient($licence)
    {
    	$cache = $this->get( 'aequasi_cache.instance.default' );
		$client = $cache->fetch( $licence.'_client' );
		
		if (!$client) {
		
	    	$client = $this->getDoctrine()
	    				   ->getManager()
						   ->getRepository('LilyClientBundle:Client')
				  		   ->findOneByLicence($licence);     	  			  
			
			$cache->save( $licence.'_client', $client, 3600 );
		
		}
		
        return $client;
    }
    
    protected function getConfig($licence)
    {
	    $cache = $this->get( 'aequasi_cache.instance.default' );
	    $config = $cache->fetch( $licence.'_config' );
		
		if (!$config) {
			
			$em = $this->getEntityManager($licence);
			
			$app = $em->getRepository('LilyBackOfficeBundle:Config')
					  ->findOneById(1);
			
			$app->getAvi()->getRedirections();
			$app->getChat();
			
			$em = $this->getDoctrine()->getManager();
			
			$client = $em->getRepository('LilyClientBundle:Client')
					  	 ->findOneByLicence($licence)
					  	 ->getConfig();
			
			$config = array('client' => $client, 'app' => $app);
      $cache->save( $licence.'_config', $config, 3600 );
		
		}
		
		return $config;
    }
    
    protected function getRedirection($licence)
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