<?php

namespace Lily\ChatBundle\Controller;


use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

use Lily\BackOfficeBundle\Controller\BaseController;

class OperatorController extends BaseController
{
	/**
	 * 
	 * @Template()
	 */
    public function indexAction()
    { 
        if (!$this->getUser()->getEnterprise()->getChat()) {
    	
	    	throw new AccessDeniedException();
	    	
    	}
    	
    	$key = $this->getUser()->getEnterprise()->getKey();
    	return array('key' => $key);
    	
    }
}