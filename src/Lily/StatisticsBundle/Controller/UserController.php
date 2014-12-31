<?php

namespace Lily\StatisticsBundle\Controller;

use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\View;

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
        
        $from = round($start/1000);
        $to = round($end/1000);
        
        $stats = array(
            'conversations' => $rep->numberOfConversations($id, $from, $to),
            'duration' => $rep->averageConversationTime($id, $from, $to),
            'waited' => $rep->averageWaited($id, $from, $to),
            'satisfaction' => $rep->averageSatisfaction($id, $from, $to)
        );

        return $stats;
    }
    
    /**
     * @Get("/{id}/chat/{function}/{start}/{end}", requirements={"id" = "\d+", "start" = "\d+", "end" = "\d+"})
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
        $from = round($start/1000);
        $to = round($end/1000);
        $interval = $this->getInterval($from, $to);
        $size = $interval['size'];
        
        $rep = $this->getEntityManager()
        ->getRepository('LilyChatBundle:LogChat');
        
        switch($function) {
            case 'conversations':
                $data = $rep->numberOfConversations($id, $from, $to, $size);
                $type = 'int';
                $default = 0;
                break;

            case 'duration':
                $data = $rep->averageConversationTime($id, $from, $to, $size);
                $type = 'time';
                $default = 0;
                break;

            case 'waited':
                $data = $rep->averageWaited($id, $from, $to, $size);
                $type = 'int';
                $default = 0;
                break;

            case 'satisfaction':
                $data = $rep->averageSatisfaction($id, $from, $to, $size);
                $type = '%';
                $default = 1;
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
    
        for ($n = $from; $n <= $to; $n++) { 
            $data[] = [(string) ($n * $size * 1000),   //x value: microtimestamp
                        (string) (isset($nzData[$n]) ? $nzData[$n] : $default)];  //y value : data
        }
        
        $values[] = $data;
        
        return array('type' => $type, 'period' => $interval['period'], 'step' => $interval['step'], 'values' => $values);
    }
    
    
    /**
     * @Get("/{id}/history/chats/{start}/{end}", 
     *   requirements={"id" = "\d+", "start" = "\d+", "end" = "\d+"})
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
        
        $from = round($start/1000);
        $to = round($end/1000);
                
        $rep = $this->getEntityManager()->getRepository('LilyChatBundle:LogChat');
        $chats = $rep->conversations($id, $from, $to);
        
        return $chats;
    }
    
    /**
     * @Get("/{id}/history/logs/{start}/{end}", 
     *  requirements={"id" = "\d+", "start" = "\d+", "end" = "\d+"})
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
        
        $from = round($start/1000);
        $to = round($end/1000);
                
        $rep = $this->getEntityManager()->getRepository('Lily\BackOfficeBundle\Loggable\Entity\LogEntry');
        $activities = $rep->getLogs($user->getUsername(), $from, $to);
        
        return $activities;
    }
}
