<?php

namespace Lily\StatisticsBundle\Controller;

use Lily\BackOfficeBundle\Controller\BaseController as SuperBaseController;

use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\View;

use JMS\SecurityExtraBundle\Annotation\Secure;

class BaseController extends SuperBaseController
{

    protected function getInterval($timestampfrom, $timestampto) {
    
        // PERIODE
        $from = new \Datetime();
        $from->setTimestamp($timestampfrom);
    
        $to = new \Datetime();
        $to->setTimestamp($timestampto);
        $diff = $to->diff($from)->format('%a');
    
        // Parameters
        if ($diff <= 1) {
            $size = 1*60*60;    // (1 hour)     // interval in second between 2 points (here 1 hour)
            $step = 2;                                  // interval between 2 legend on x axis
            $period = 'hour';                           // unit
        } elseif ($diff <= 7) {
            $size = 1*24*60*60; // (1 day)
            $step = 1;
            $period = 'day';
        } elseif ($diff <= 31) {
            $size = 1*24*60*60; // (1 days)
            $step = 4;
            $period = 'day';
        } elseif ($diff <= 64) {
            $size = 2*24*60*60;  // (2 days)
            $step = 4;
            $period = 'day';
        } elseif ($diff <= 385) {
            $size = 1*31*24*60*60; // (1 month)
            $step = 1;
            $period = 'month';
        } else {
            $size = 1*31*24*60*60; // (1 month)
            $step = 4;
            $period = 'month';
        }
        
        return array('step' => $step, 'period' => $period, 'size' => $size);
    }
}
