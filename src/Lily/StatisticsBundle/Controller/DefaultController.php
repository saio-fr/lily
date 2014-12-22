<?php

namespace Lily\StatisticsBundle\Controller;

use Lily\BackOfficeBundle\Controller\BaseController;

use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\View;

use JMS\SecurityExtraBundle\Annotation\Secure;

class DefaultController extends BaseController
{

    public function indexAction()
    {   
        return $this->render('LilyStatisticsBundle:Statistics:index.html.twig');
    }
    
    
    /**
     * @Get("/loadings/{timestampfrom}/{timestampto}")
     * @Secure(roles="ROLE_USER")
     * @View()
     */
    public function getLoadingsAction($timestampfrom, $timestampto)
    {
        $em = $this->getEntityManager();
        
        $from = round($timestampfrom/1000);
        $to = round($timestampto/1000);
        $interval = $this->getInterval($from, $to);
        $size = $interval['size'];
           
        $loadings = $em->getRepository('LilyAppBundle:LogConnection')
        ->uniqueVisitors($from, $to, $size);
  
        foreach ($loadings as $item) {
            $nzData[$item['intervalId']] = $item['value'];
        }
        
        $from = round($from / $size);
        $to = round($to / $size);
        
        for ($n = $from; $n < $to; $n++) { 
            $data[] = [(string) ($n * $size * 1000), //x value: microtimestamp
            (string) (isset($nzData[$n]) ? $nzData[$n] : 0)];  //y value : data           
        }
        
        $values[] = $data; 
        
        return array(
            'period' => $interval['period'], 
            'step' => $interval['step'], 
            'type' => 'int', 
            'values' => $values
        );
    }
    
    /**
     * @Get("/usage/{timestampfrom}/{timestampto}")
     * @Secure(roles="ROLE_USER")
     * @View()
     */
    public function getUsageAction($timestampfrom, $timestampto)
    {
        $em = $this->getEntityManager();
        
        $from = round($timestampfrom/1000);
        $to = round($timestampto/1000);
        $interval = $this->getInterval($from, $to);
        $size = $interval['size'];
           
        $loadings = $em->getRepository('LilyAppBundle:LogConnection')
        ->uniqueVisitors($from, $to, $size);
  
        $users = $em->getRepository('LilyAppBundle:LogRequest')
        ->uniqueUsers($from, $to, $size);
  
        foreach ($loadings as $l) {
            foreach ($users as $u) {
                if ($u['intervalId'] == $l['intervalId']) {
                    $nzData[$l['intervalId']] = round($u['value']*100/$l['value']);
                    break;
                }
                $nzData[$l['intervalId']] = 0;
            }
        }
        
        $from = round($from / $size);
        $to = round($to / $size);
        
        for ($n = $from; $n < $to; $n++) { 
            $data[] = [(string) ($n * $size * 1000), //x value: microtimestamp
            (string) (isset($nz[$n]) ? $nz[$n] : 100)];  //y value : data
        }
        
        // Wrap our data into an array
        $values[] = $data;
        
        return array(
            'period' => $interval['period'], 
            'step' => $interval['step'], 
            'type' => '%', 
            'values' => $values
        );
    }

    /**
     * @Get("/satisfaction/{timestampfrom}/{timestampto}")
     * @Secure(roles="ROLE_USER")
     * @View()
     */
    public function getSatisfactionAction($timestampfrom, $timestampto)
    {
        $em = $this->getEntityManager();
        
        $from = round($timestampfrom/1000);
        $to = round($timestampto/1000);
        $interval = $this->getInterval($from, $to);
        $size = $interval['size'];
        
        $satisfied = $em->getRepository('LilyAppBundle:LogNotation')
        ->satisfaction($from, $to, $size, true);
  
        $notations = $em->getRepository('LilyAppBundle:LogNotation')
        ->satisfaction($from, $to, $size, null);
  
        foreach ($notations as $n) {
            foreach ($satisfied as $s) {
                if ($n['intervalId'] == $n['intervalId']) {
                    $nzData[$n['intervalId']] = round($s['value']*100/$n['value']);
                    break;
                }
                $nzData[$n['intervalId']] = 100;
            }
        }
        
        $from = round($from/$size);
        $to = round($to/$size);
        
        for ($n = $from; $n < $to; $n++) { 
          $data[] = [(string) ($n * $size * 1000), //x value: microtimestamp
          (string) (isset($nzData[$n]) ? $nzData[$n] : 100)];  //y value : data
        }
        
        $values[] = $data;
        
        return array(
            'period' => $interval['period'], 
            'step' => $interval['step'], 
            'type' => '%', 
            'values' => $values
        );
    }

    /**
     * @Get("/usage/footer/{timestampfrom}/{timestampto}")
     * @Secure(roles="ROLE_USER")
     * @View()
     */
    public function getFooterUsageAction($timestampfrom, $timestampto) {

        $em = $this->getEntityManager();

        $from = round($timestampfrom/1000);
        $to = round($timestampto/1000);

        // LOADINGS
        $loadings = $em->getRepository('LilyAppBundle:LogConnection')
        ->uniqueVisitors($from, $to, null);

        // USAGE
        $users = $em->getRepository('LilyAppBundle:LogRequest')
        ->uniqueUsers($from, $to, null);

        if ($loadings > 0) $usage = round(($users/$loadings)*100);
        else $usage = 100;

        // SATISFACTION
        $satisfied = $em->getRepository('LilyAppBundle:LogNotation')
        ->satisfaction($from, $to, true, null);

        $notations = $em->getRepository('LilyAppBundle:LogNotation')
        ->satisfaction($from, $to, null, null);

        if ($notations > 0) $satisfaction = round($satisfaction, 0);
        else $satisfaction = 100;

        return array('loadings' => $loadings, 'usage' => $usage, 'satisfaction' => $satisfaction);

    }

    /**
     * @Get("/media")
     * @Secure(roles="ROLE_USER")
     * @View()
     */
    public function getMediaAction() {
        $em = $this->getEntityManager();
    
        // PERIODE
        $from = new \Datetime('-1 month');
        $to = new \Datetime();
    
        // SUPPORTS
        $mobiles = $em->getRepository('LilyAppBundle:LogConnection')
        ->mobiles($from, $to);
    
        $mobiles = array('x' => 'Mobile', 'y' => $mobiles);
    
        $computers = $em->getRepository('LilyAppBundle:LogConnection')
        ->computers($from, $to);
    
        $computers = array('x' => 'Ordinateur', 'y' => $computers);
    
        $tablets = $em->getRepository('LilyAppBundle:LogConnection')
        ->tablets($from, $to);
    
        $tablets = array('x' => 'Tablette', 'y' => $tablets);
        $data = [$mobiles, $tablets, $computers];
    
        return $data;
    }

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
        } elseif ($diff <= 40) {
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
