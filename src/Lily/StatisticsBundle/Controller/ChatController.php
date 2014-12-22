<?php

namespace Lily\StatisticsBundle\Controller;

use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\View;

use JMS\SecurityExtraBundle\Annotation\Secure;

use Lily\StatisticsBundle\Controller\DefaultController;

class ChatController extends DefaultController
{
    /**
     * @Get("/graph/footer/{start}/{end}", requirements={"id" = "\d+", "start" = "\d+", "end" = "\d+"})
     * @Secure(roles="ROLE_USER")
     */
    public function getFooterAction($start, $end) {
    
        $rep = $this->getEntityManager()
        ->getRepository('LilyChatBundle:LogChat');
        
        $from = round($start/1000);
        $to = round($end/1000);
        
        $stats = array(
            'conversations' => $rep->hourlyNumberOfConversation(null, $from, $to),
            'duration' => $rep->averageConversationTime(null, $from, $to),
            'waited' => $rep->averageWaited(null, $from, $to),
            'satisfaction' => $rep->averageSatisfaction(null, $from, $to)
        );

        return $stats;
    }

    /**
     * @Get("/{function}/{start}/{end}", requirements={"id" = "\d+", "start" = "\d+", "end" = "\d+"})
     * @Secure(roles="ROLE_USER")
     */    
    public function getConversationsAction($function, $start, $end) {
        
        $em = $this->getEntityManager();
        $rep = $em->getRepository('LilyChatBundle:LogChat');
        
        $from = round($start/1000);
        $to = round($end/1000);
        $interval = $this->getInterval($from, $to);
        $size = $interval['size'];
        
        switch($function) {
            case 'conversations':
                $data = $rep->hourlyNumberOfConversation(null, $from, $to, $size);
                $type = 'int';
                break;

            case 'duration':
                $data = $rep->averageConversationTime(null, $from, $to, $size);
                $type = 'time';
                break;

            case 'waited':
                $data = $rep->averageWaited(null, $from, $to, $size);
                $type = 'time';
                break;

            case 'satisfaction':
                $data = $rep->averageSatisfaction(null, $from, $to, $size);
                $type = '%';
                break;

            default:
               throw $this->createNotFoundException();
               break;
        }
        
        foreach($data as $entry) {
            $nzData[$entry['intervalId']] = $entry['value'];
        }
        
        $data = [];
        $from = round($from/$size);
        $to = round($to/$size);
        
        for ($n = $from; $n < $to; $n++) { 
            $data[] = [(string) ($n * $size * 1000),   //x value: microtimestamp
                        (string) (isset($nzData[$n]) ? $nzData[$n] : 0)];  //y value : data
        }
        
        $values[] = $data;
        
        return array('type' => $type, 'period' => $interval['period'], 'step' => $interval['step'], 'values' => $values); 
    }
}
