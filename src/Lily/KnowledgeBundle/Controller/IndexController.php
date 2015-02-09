<?php

namespace Lily\KnowledgeBundle\Controller;

use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\HttpFoundation\Request;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use JMS\SecurityExtraBundle\Annotation\Secure;

use Lily\BackOfficeBundle\Controller\BaseController;

class IndexController extends BaseController
{
    public function knowledgeAction()
    {
        
        $questions = $this->getEntityManager()
        ->getRepository('LilyKnowledgeBundle:Question')
        ->countAll();
        
        $counters['questions'] = $questions;
        
        return $this->render('LilyKnowledgeBundle::index.html.twig',
            array('counters' => $counters));
    }
}
