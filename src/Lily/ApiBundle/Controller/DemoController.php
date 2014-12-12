<?php

namespace Lily\ApiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

use JMS\Serializer\Exception\RuntimeException;
use JMS\Serializer\SerializationContext;

class DemoController extends Controller
{
     public function indexAction($cname, $url) {
	     
	     $licence = $this->get('doctrine')->getManager()
	     				 ->getRepository('LilyUserBundle:Enterprise')
	     				 ->findOneByCname($cname)
	     				 ->getKey();
	     				 
	     return $this->render('LilyApiBundle:demo:index.html.twig', array('url' => $url, 'licence' => $licence)); 
	     
     }
     
}