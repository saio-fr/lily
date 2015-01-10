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
        
        for ($n = $from; $n <= $to; $n++) { 
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
  
        $users = $em->getRepository('LilyAppBundle:LogConnection')
        ->uniqueAppUsers($from, $to, $size);
        
        foreach($users as $entry) {
            $nzData[$entry['intervalId']] = $entry['value'];
        }
        
        $from = round($from / $size);
        $to = round($to / $size);
        
        for ($n = $from; $n <= $to; $n++) { 
            $data[] = [(string) ($n * $size * 1000), //x value: microtimestamp
            (string) (isset($nzData[$n]) ? $nzData[$n] : 1)];  //y value : data
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
        $satisfaction = [];
        
        // Satisfaction from AVI
        $avi = $em->getRepository('LilyAppBundle:LogNotation')
        ->satisfaction($from, $to, $size);
        
        // Satisfaction from Chat
        $chat = $em->getRepository('LilyChatBundle:LogChat')
        ->averageSatisfaction(null, $from, $to, $size);
        
        // Calcul satisfaction from Chat & Avi
        foreach ($chat as $key1 => $c) {
            foreach ($avi as $key2 => $a) {
                if ($a['intervalId'] == $c['intervalId']) {
                    $item = array('value' => ($a['value'] + $c['value'])/2, 'intervalId' => $a['intervalId']);
                    $satisfaction[] = $item;
                    unset($chat[$key1]);
                    unset($avi[$key2]);
                }
            }
        }
        
        $satisfaction = array_merge($satisfaction, $chat, $avi);
        usort($satisfaction, function ($a, $b) {
            return ($a['intervalId'] < $b['intervalId']) ? -1 : 1;
        });
        
        foreach ($satisfaction as $item) {
            $nzData[$item['intervalId']] = $item['value'];
        }
        
        $from = round($from/$size);
        $to = round($to/$size);
        
        for ($n = $from; $n <= $to; $n++) { 
          $data[] = [(string) ($n * $size * 1000), //x value: microtimestamp
          (string) (isset($nzData[$n]) ? $nzData[$n] : 1)];  //y value : data
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
        $usage = $em->getRepository('LilyAppBundle:LogConnection')
        ->uniqueAppUsers($from, $to, null);

        if ($usage) { $usage = $usage * 100; }
        else { $usage = 100; }

        // Satisfaction from AVI
        $avi = $em->getRepository('LilyAppBundle:LogNotation')
        ->satisfaction($from, $to, null);
        
        // Satisfaction from Chat
        $chat = $em->getRepository('LilyChatBundle:LogChat')
        ->averageSatisfaction(null, $from, $to, null);
        
        if ($chat && $avi) {
                           
            $satisfaction = round(($avi + $chat)/2, 1);
            if ($satisfaction) { $satisfaction *= 100; }
            else { $satisfaction = 100; }
        } else {
          
          ($chat) ? $satisfaction = round($chat*100, 1) 
                  : $satisfaction = round($avi*100, 1);
        }

        return array(
          'loadings' => $loadings, 
          'usage' => $usage, 
          'satisfaction' => $satisfaction
        );

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
