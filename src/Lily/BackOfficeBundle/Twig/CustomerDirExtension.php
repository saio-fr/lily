<?php

namespace Lily\BackOfficeBundle\Twig;

class CustomerDirExtension extends \Twig_Extension
{
  
    private $cdn;
  
    public function __construct($cdn) {
        $this->cdn = $cdn;
    }
    
    public function getFilters()
    {
        return array(
            new \Twig_SimpleFilter('customerDir', array($this, 'customerDirFilter')),
        );
    }

    public function customerDirFilter($licence)
    {        
        $url = 'http://'.$this->cdn.'/customer/'.$licence;
        return $url;
    }

    public function getName()
    {
        return 'customerDir_extension';
    }
}