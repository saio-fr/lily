<?php

namespace Lily\BackOfficeBundle\Twig;

class GetAppVersionExtension extends \Twig_Extension
{
    
    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('getAppVersion', array($this, 'getAppVersion')),
        );
    }

    public function getAppVersion()
    {
        return exec('git rev-parse --short HEAD');
    }

    public function getName()
    {
        return 'getAppVersion_extension';
    }
}