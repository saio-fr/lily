<?php

namespace Lily\StatisticsBundle\Controller;

use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\View;

use JMS\SecurityExtraBundle\Annotation\Secure;

use Lily\StatisticsBundle\Controller\DefaultController;

class ChatController extends DefaultController
{
    /**
     * @Get("/chat/footer/{start}/{end}", requirements={"id" = "\d+", "start" = "\d+", "end" = "\d+"})
     * @Secure(roles="ROLE_USER")
     */
    public function getFooterAction($start, $end) {
    
        $rep = $this->getEntityManager()
        ->getRepository('LilyChatBundle:LogChat');
        
        $timestampfrom = round($start/1000);
        $timestampto = round($end/1000);
        
        $stats = array(
            'conversations' => $rep->hourlyNumberOfConversation(null, $timestampfrom, $endTimestamp),
            'time' => $rep->averageConversationTime(null, $timestampfrom, $timestampto),
            'waited' => $rep->averageWaited(null, $timestampfrom, $timestampto),
            'satisfaction' => $rep->averageSatisfaction(null, $timestampfrom, $timestampto)
        );

        return $stats;
    }

    /**
     * @Get("/{type}/{start}/{end}", requirements={"id" = "\d+", "start" = "\d+", "end" = "\d+"})
     * @Secure(roles="ROLE_USER")
     */    
    public function getConversationsAction($start, $end) {
        
        $em = $this->getEntityManager();
        $rep = $em->getRepository('LilyChatBundle:LogChat');
        
        $timestampfrom = round($start/1000);
        $timestampto = round($end/1000);
        $interval = $this->getInterval($timestampfrom, $timestampto);
        
        switch($type) {
            case 'conversations':
                $data = $rep->hourlyNumberOfConversation(null, $timestampfrom, $timestampto, $interval->size);
                break;

            case 'duration':
                $data = $rep->averageConversationTime(null, $timestampfrom, $timestampto, $interval->size);
                break;

            case 'waited':
                $data = $rep->averageWaited(null, $timestampfrom, $timestampto, $interval->size);
                break;

            case 'satisfaction':
                $data = $rep->averageSatisfaction(null, $timestampfrom, $timestampto, $interval->size);
                break;

            default:
               throw $this->createNotFoundException();
               break;
        }
        
        foreach($data as $entry) {
            $nonzeroData[$entry['intervalId']] = $entry['value'];
        }
        
        $graph = [];
        $from = round($timestampfrom/$interval['size']);
        $to = round($timestampto/$interval['size']);
        
        for ($n = $from; $n < $to; $n++) { 
            $graph[] = [(string) ($n*$interval['size']*1000),   //x value: microtimestamp
                        (string) (isset($nonzeroData[$n]) ? $nonzeroData[$n] : 0)];  //y value : data
        }
        
        $graph = array_reverse($graph);
        return array('type' => $type, 'period' => $interval['period'], 'step' => $interval['step'], 'values' => $graph); 
    }
}
