<?php

namespace Lily\ApiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DemoController extends Controller
{
    public function indexAction($licence, $url) {
        return $this->render('LilyApiBundle:demo:index.html.twig', array('url' => $url, 'licence' => $licence));  
    }
}