<?php

namespace Lily\BackOfficeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation AS JMS;

/**
 * Config
 *
 * @ORM\Table(name="RedirectionsConfig")
 * @ORM\Entity
 */
class RedirectionsConfig
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;
  
    /**
     * @var boolean
     *
     * @ORM\Column(name="chat", type="boolean")
     */
    public $chat;

    /**
     * @var boolean
     *
     * @ORM\Column(name="mail", type="boolean")
     */
    public $mail;

    /**
     * @var boolean
     *
     * @ORM\Column(name="phone", type="boolean")
     */
    public $phone;
    
    public function __construct()
	{       
		$this->chat = true;
		$this->mail = true;
		$this->phone = true;
	}
    
}
