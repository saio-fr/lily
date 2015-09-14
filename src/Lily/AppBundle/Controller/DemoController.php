<?php

namespace Lily\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DemoController extends Controller
{
    public function indexAction($licence, $url) {
        return $this->render('LilyAppBundle:demo:index.html.twig', array(
          'url' => $url,
          'licence' => $licence)
        );
    }

    public function apiAction($licence) {
        return $this->render('LilyAppBundle:demo:api.html.twig', array(
          'licence' => $licence)
        );
    }
}
