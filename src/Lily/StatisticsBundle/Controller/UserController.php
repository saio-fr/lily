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

class UserController extends DefaultController
{
    /**
     * @Get("/{id}/chat/footer/{start}/{end}", requirements={"id" = "\d+", "start" = "\d+", "end" = "\d+"})
     */
    public function getFooterAction($id, $start, $end) {
      
        $manager = $this->get('fos_user.user_manager');
        $user = $manager->findUserBy(Array('id' => $id));
        
        // conditions
        $admin = $this->get('security.context')->isGranted('ROLE_ADMIN');
        $conditions1 = !$admin && $user !== $this->getUser();
        $conditions2 = $user->getClient() !== $this->getClient();       
        
        if (!$user || $conditions1 || $conditions2) {
            throw $this->createNotFoundException();
        }
        
        $rep = $this->getEntityManager()
        ->getRepository('LilyChatBundle:LogChat');
        
        $timestampfrom = round($start/1000);
        $timestampto = round($end/1000);
        
        $stats = array(
            'conversations' => $rep->hourlyNumberOfConversation($id, $timestampfrom, $timestampto),
            'duration' => $rep->averageConversationTime($id, $timestampfrom, $timestampto),
            'waited' => $rep->averageWaited($id, $timestampfrom, $timestampto),
            'satisfaction' => $rep->averageSatisfaction($id, $timestampfrom, $timestampto)
        );

        return $stats;
    }
    
    /**
     * @Get("/{id}/chat/graph/{function}/{start}/{end}", requirements={"id" = "\d+", "start" = "\d+", "end" = "\d+"})
     */
    public function getUserStatsAction($id, $function, $start, $end) {
      
        $manager = $this->get('fos_user.user_manager');
        $user = $manager->findUserBy(Array('id' => $id));
        
        // conditions
        $admin = $this->get('security.context')->isGranted('ROLE_ADMIN');
        $conditions1 = !$admin && $user !== $this->getUser();
        $conditions2 = $user->getClient() !== $this->getClient();       
        
        if (!$user || $conditions1 || $conditions2) {
            throw $this->createNotFoundException();
        }
        
        //Convert the microtimestamp to timestamp and then Datetime.
        $timestampfrom = round($start/1000);
        $timestampto = round($end/1000);
        $interval = $this->getInterval($timestampfrom, $timestampto);
        
        $rep = $this->getEntityManager()
        ->getRepository('LilyChatBundle:LogChat');
        
        switch($function) {
            case 'conversations':
                $data = $rep->hourlyNumberOfConversation($id, $timestampfrom, $timestampto, $interval['size']);
                $type = 'int';
                break;

            case 'duration':
                $data = $rep->averageConversationTime($id, $timestampto, $timestampto, $interval['size']);
                $type = 'time';
                return $data;
                break;

            case 'waited':
                $data = $rep->averageWaited($id, $timestampfrom, $timestampto, $interval['size']);
                $type = 'time';
                break;

            case 'satisfaction':
                $data = $rep->averageSatisfaction($id, $timestampfrom, $timestampto, $interval['size']);
                $type = '%';
                break;

            default:
               throw $this->createNotFoundException();
               break;
        }
        
        foreach($data as $entry) {
            $nonzeroData[$entry['intervalId']]=$entry['value'];
        }
        
        $graph = [];
        for($n = round($timestampfrom/$interval['size']); $n < round($timestampto/$interval['size']); $n++) {
            $graph[] = [(string) ($n*$interval['size']*1000),   //x value: microtimestamp
                        (string) (isset($nonzeroData[$n]) ? $nonzeroData[$n] : 0)];  //y value : data
        }
        
        $graph = array_reverse($graph);
        return array('type' => $type, 'period' => $interval['period'], 'step' => $interval['step'], 'values' => $graph);
    }
    
    
    /**
     * @Get("/{id}/chat/history/{start}/{end}", requirements={"id" = "\d+", "start" = "\d+", "end" = "\d+"})
     * @Secure(roles="ROLE_ADMIN")
     */
    public function getUserConversationsAction($id, $start, $end) {
    
        $manager = $this->get('fos_user.user_manager');
        $user = $manager->findUserBy(Array('id' => $id));
        
        // conditions
        $admin = $this->get('security.context')->isGranted('ROLE_ADMIN');
        $conditions1 = !$admin && $user !== $this->getUser();
        $conditions2 = $user->getClient() !== $this->getClient();       
        
        if (!$user || $conditions1 || $conditions2) {
            throw $this->createNotFoundException();
        }
        
        $timestampfrom = round($start/1000);
        $timestampto = round($end/1000);
                
        $rep = $this->getEntityManager()->getRepository('LilyChatBundle:LogChat');
        $conversations = $rep->conversations($id, $timestampfrom, $timestampto);
        
        return $conversations;
    }
    
    /**
     * @Get("/{id}/logs/{start}/{end}", requirements={"id" = "\d+", "start" = "\d+", "end" = "\d+"})
     */
    public function getUserActivitiesAction($id, $start, $end) {
    
        $manager = $this->get('fos_user.user_manager');
        $user = $manager->findUserBy(Array('id' => $id));
        
        // conditions
        $admin = $this->get('security.context')->isGranted('ROLE_ADMIN');
        $conditions1 = !$admin && $user !== $this->getUser();
        $conditions2 = $user->getClient() !== $this->getClient();       
        
        if (!$user || $conditions1 || $conditions2) {
            throw $this->createNotFoundException();
        }
        
        $timestampfrom = round($start/1000);
        $timestampto = round($end/1000);
                
        $rep = $this->getEntityManager()->getRepository('LilyBackOfficeBundle:Loggable:Entity:LogEntry');
        $activities = $rep->getLogs($user->getUsername(), $timestampfrom, $timestampto);
        
        return $activities;
    }
}
