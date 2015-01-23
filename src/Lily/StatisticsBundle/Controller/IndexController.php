<?php

namespace Lily\StatisticsBundle\Controller;

use Lily\BackOfficeBundle\Controller\BaseController as SuperBaseController;

class IndexController extends SuperBaseController
{
    public function statisticsAction()
    {   
        return $this->render('LilyStatisticsBundle:Statistics:index.html.twig');
    }
}
