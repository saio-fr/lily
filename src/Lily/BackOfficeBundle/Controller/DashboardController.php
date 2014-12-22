<?php

namespace Lily\BackOfficeBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class DashboardController extends BaseController
{
    /**
     * @Template()
     */
    public function indexAction() 
    {
        $client = $this->getClient()->getConfig();
        return array('client' => $client);
    }
}