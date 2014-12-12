<?php

namespace Lily\StatisticsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\View\ViewHandler;

use JMS\Serializer\SerializationContext;
use JMS\Serializer\Exception\RuntimeException;
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
        $rep = $this->getEntityManager()
        ->getRepository('LilyChatBundle:LogChat');
        
        $timestampfrom = round($start/1000);
        $timestampto = round($end/1000);
        $interval = $this->getInterval($timestampfrom, $timestampto);
        
        switch($type) {
            case "conversations":
                $data = $rep->hourlyNumberOfConversation(null, $timestampfrom, $timestampto, $interval->size);
                break;

            case "conversationsTime":
                $data = $rep->averageConversationTime(null, $timestampfrom, $timestampto, $interval->size);
                break;

            case "waited":
                $data = $rep->averageWaited(null, $timestampfrom, $timestampto, $interval->size);
                break;

            case "satisfaction":
                $data = $rep->averageSatisfaction(null, $timestampfrom, $timestampto, $interval->size);
                break;

            default:
               throw $this->createNotFoundException();
               break;
        }
        
        foreach($data as $entry) {
            $nonzeroData[$entry["intervalId"]]=$entry["value"];
        }
        
        $graph = [];
        for($n = round($timestampfrom/$interval->size); $n < round($timestampto/$interval->size); $n++) {
            $graph[] = [(string) ($n*$intervalSize*1000),   //x value: microtimestamp
                        (string) (isset($nonzeroData[$n]) ? $nonzeroData[$n] : 0)];  //y value : data
        }
        
        $graph = array_reverse($graph);
        return array('type' => $type, 'period' => $interval->period, 'step' => $interval->step, 'values' => $graph); 
    }
}
