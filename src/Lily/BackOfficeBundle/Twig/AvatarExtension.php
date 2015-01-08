<?php

namespace Lily\BackOfficeBundle\Twig;

class AvatarExtension extends \Twig_Extension
{
  
    private $cdn;
  
    public function __construct($cdn) {
        $this->cdn = $cdn;
    }
    
    public function getFilters()
    {
        return array(
            new \Twig_SimpleFilter('avatar', array($this, 'avatarFilter')),
        );
    }

    public function avatarFilter($user)
    {
        $client = $user->getClient();
        $avatar = $user->getConfig()->getAvatar();
        
        if ($avatar) {
          $url = 'http://' . $this->cdn . '/customer/' .
            $client->getLicence() .
            '/images/avatars/' .
            $avatar;
        } else {
          $url = 'http://' . $this->cdn . '/images/default-avatar.png';
        }

        return $url;
    }

    public function getName()
    {
        return 'avatar_extension';
    }
}