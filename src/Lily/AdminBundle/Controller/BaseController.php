<?php

namespace Lily\AdminBundle\Controller;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpFoundation\Request;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;

use JMS\Serializer\Exception\RuntimeException;

class BaseController extends FOSRestController implements ClassResourceInterface
{

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
    
    protected function setConnection($licence)
    {	   	  			  
   		$connection = $this->container->get(sprintf('doctrine.dbal.%s_connection', 'client'));
	
	    $refConn = new \ReflectionObject($connection);
	    $refParams = $refConn->getProperty('_params');
	    $refParams->setAccessible('public'); //we have to change it for a moment
	
	    $params = $refParams->getValue($connection);
	    $params['dbname'] = $licence;
	
	    $refParams->setAccessible('private');
	    $refParams->setValue($connection, $params);
	    
    }

}