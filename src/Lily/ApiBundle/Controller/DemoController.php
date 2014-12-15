<?php

namespace Lily\ApiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DemoController extends Controller
{
    public function indexAction($cname, $url) {
        $licence = $this->get('doctrine')->getManager()
        ->getRepository('LilyClientBundle:Enterprise')
        ->findOneByCname($cname)
        ->getKey();
    	     				 
        return $this->render('LilyApiBundle:demo:index.html.twig', array('url' => $url, 'licence' => $licence));  
    }
}