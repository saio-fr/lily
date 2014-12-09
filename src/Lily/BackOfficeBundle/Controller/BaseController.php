<?php

namespace Lily\BackOfficeBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Request;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;

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
        $form = $this->createForm($type, $entity, array('csrf_protection' => false));
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

}