<?php

namespace Lily\BackOfficeBundle\Twig;

class AvatarDirExtension extends \Twig_Extension
{
  
    private $cdn;
  
    public function __construct($cdn) {
        $this->cdn = $cdn;
    }
    
    public function getFilters()
    {
        return array(
            new \Twig_SimpleFilter('avatarDir', array($this, 'avatarDirFilter')),
        );
    }

    public function avatarDirFilter($user)
    {
        
        $client = $user->getClient();
        
        $url = 'http://' . $this->cdn . '/customer/' 
          . $client->getLicence()
          . '/images/avatars';
        return $url;
    }

    public function getName()
    {
        return 'avatarDir_extension';
    }
}