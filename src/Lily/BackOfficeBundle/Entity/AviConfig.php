<?php

namespace Lily\BackOfficeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation AS JMS;

/**
 * Config
 *
 * @ORM\Table(name="AviConfig")
 * @ORM\Entity
 */
class AviConfig
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
     * @ORM\Column(name="active", type="boolean")
     */
    public $active;
    
    /**
     * @var string
     *
     * @JMS\SerializedName("name")
     * @ORM\Column(name="name", type="string")
     */
    public $name;
    
    /**
     * @var string
     *
     * @JMS\SerializedName("welcomeMsg")
     * @ORM\Column(name="welcomeMsg", type="string")
     */
    public $welcomeMsg;
    
    /**
     * @var boolean
     *
     * @JMS\SerializedName("aviIfNoOperator")
     * @ORM\Column(name="aviIfNoOperator", type="boolean")
     */
    public $aviIfNoOperator;
    
    /**
     * @var boolean
     *
     * @JMS\SerializedName("animations")
     * @ORM\Column(name="animations", type="boolean")
     */
    public $animations;
    
    public function __construct()
	{       
		$this->active = true;
		$this->name = 'Lily';
		$this->welcomeMsg = 'Bonjour, quelle est votre question ?';
		$this->aviIfNoOperator = true;
		$this->animations = true;
	}
    
}
