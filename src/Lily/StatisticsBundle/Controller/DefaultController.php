<?php

namespace Lily\StatisticsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use Gedmo\Loggable\LoggableListener;

use Lily\BackOfficeBundle\Controller\BaseController;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\View\ViewHandler;
use FOS\RestBundle\Controller\Annotations\View;

use JMS\Serializer\SerializationContext;
use JMS\Serializer\Exception\RuntimeException;
use JMS\SecurityExtraBundle\Annotation\Secure;

class DefaultController extends BaseController
{

   /**
    * @Template()
    */
    public function indexAction()
    {
        $from = new \Datetime('-1 month');
        $to = new \Datetime();
    
        // Top categories
        $categories = $this->getEntityManager()
        ->getRepository('LilyApiBundle:LogRequest')
        ->statsTopCategories($from, $to);
    
        // Top questions
        $questions = $this->getEntityManager()
        ->getRepository('LilyApiBundle:LogRequest')
        ->statsTopQuestions($from, $to);

        return array('categories' => $categories, 'questions' => $questions);
    }
    
    
    /**
     * @Get("/loadings/{timestampfrom}/{timestampto}")
     * @Secure(roles="ROLE_USER")
     * @View()
     */
    public function getLoadingsAction($timestampfrom, $timestampto)
    {
        $em = $this->getEntityManager();
        $timestampfrom = round($timestampfrom/1000);
        $timestampto = round($timestampto/1000);
        $interval = $this->getInterval($timestampfrom, $timestampto);
           
        $loadings = $this->getEntityManager()
        ->getRepository('LilyApiBundle:LogConnection')
        ->uniqueVisitors($timestampfrom, $timestampto, $interval->size);
  
        foreach ($loadings as $key => $entry) {
            $nonzeroData[$entry["intervalId"]]=$entry["value"];
        }
  
        for ($n = round($timestampfrom/$intervalSize); $n < round($timestampto/$interval->size); $n++) { 
            $data[] = [(string) ($n*$intervalSize*1000), //x value: microtimestamp
            (string) (isset($nonzeroData[$n]) ? $nonzeroData[$n] : 0)];  //y value : data           
        }
        
        return array(
            'period' => $interval->period, 
            'step' => $interval->step, 
            'type' => 'loadings', 
            'values' => $data
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
        $timestampfrom = round($timestampfrom/1000);
        $timestampto = round($timestampto/1000);
        $interval = $this->getInterval($timestampfrom, $timestampto);
           
        $loadings = $this->getEntityManager()
        ->getRepository('LilyApiBundle:LogConnection')
        ->uniqueVisitors($timestampfrom, $timestampto, $intervalSize);
  
        $users = $this->getEntityManager()
        ->getRepository('LilyApiBundle:LogRequest')
        ->uniqueUsers($timestampfrom, $timestampto, $intervalSize);
  
        foreach ($loadings as $loading) {
            foreach ($users as $user) {
                if ($user['intervalId'] == $loading['intervalId']) {
                    $nonzeroData[$loading['intervalId']]=round($user['value']*100/$loading['value']);
                    break;
                }
                $nonzeroData[$loading['intervalId']]=0;
            }
        }
  
        for ($n = round($timestampfrom/$intervalSize); $n < round($timestampto/$intervalSize); $n++) {
            $data[] = [(string) ($n*$intervalSize*1000), //x value: microtimestamp
            (string) (isset($nonzeroData[$n]) ? $nonzeroData[$n] : 100)];  //y value : data
        } 
        
        return array(
            'period' => $interval->period, 
            'step' => $interval->step, 
            'type' => 'loadings', 
            'values' => $data
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
        $timestampfrom = round($timestampfrom/1000);
        $timestampto = round($timestampto/1000);
        $interval = $this->getInterval($timestampfrom, $timestampto);
        
        $satisfied = $this->getEntityManager()
        ->getRepository('LilyApiBundle:LogNotation')
        ->satisfaction($timestampfrom, $timestampto, $intervalSize, true);
  
        $notations = $this->getEntityManager()
        ->getRepository('LilyApiBundle:LogNotation')
        ->satisfaction($timestampfrom, $timestampto, $intervalSize, null);
  
        foreach ($notations as $notation) {
            foreach ($satisfied as $item) {
                if ($item['intervalId'] == $notation['intervalId']) {
                    $nonzeroData[$notation['intervalId']]=round($item['value']*100/$notation['value']);
                    break;
                }
                $nonzeroData[$notation['intervalId']]=100;
            }
        }
  
        for ($n = round($timestampfrom/$intervalSize); $n < round($timestampto/$intervalSize); $n++) {
  
          $data[] = [(string) ($n*$intervalSize*1000), //x value: microtimestamp
          (string) (isset($nonzeroData[$n]) ? $nonzeroData[$n] : 100)];  //y value : data
        }
        
        return array(
            'period' => $interval->period, 
            'step' => $interval->step, 
            'type' => 'loadings', 
            'values' => $data
        );
    }

    /**
     * @Get("/footer/usage/{timestampfrom}/{timestampto}")
     * @Secure(roles="ROLE_USER")
     * @View()
     */
    public function getFooterUsageAction($timestampfrom, $timestampto) {

        $em = $this->getEntityManager();

        $from = round($timestampfrom/1000);
        $to = round($timestampto/1000);

        // LOADINGS
        $loadings = $this->getEntityManager()
        ->getRepository('LilyApiBundle:LogConnection')
        ->uniqueVisitors($from, $to, null);

        // USAGE
        $users = $this->getEntityManager()
        ->getRepository('LilyApiBundle:LogRequest')
        ->uniqueUsers($from, $to, null);

        if ($loadings > 0) $usage = round(($users/$loadings)*100);
        else $usage = 0;

        // SATISFACTION
        $satisfied = $this->getEntityManager()
        ->getRepository('LilyApiBundle:LogNotation')
        ->satisfaction($from, $to, true, null);

        $notations = $this->getEntityManager()
        ->getRepository('LilyApiBundle:LogNotation')
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
        $mobiles = $this->getEntityManager()
        ->getRepository('LilyApiBundle:LogConnection')
        ->mobiles($from, $to);
    
        $mobiles = array('x' => 'Mobile', 'y' => $mobiles);
    
        $computers = $this->getEntityManager()
        ->getRepository('LilyApiBundle:LogConnection')
        ->computers($from, $to);
    
        $computers = array('x' => 'Ordinateur', 'y' => $computers);
    
        $tablets = $this->getEntityManager()
        ->getRepository('LilyApiBundle:LogConnection')
        ->tablets($from, $to);
    
        $tablets = array('x' => 'Tablette', 'y' => $tablets);
        $data = [$mobiles, $tablets, $computers];
    
        return $data;
  
    }

    public function getInterval($timestampfrom, $timestampto) {
    
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
