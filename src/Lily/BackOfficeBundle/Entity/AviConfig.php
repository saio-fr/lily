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
    protected $id;
  
    /**
     * @var boolean
     *
     * @ORM\Column(name="active", type="boolean")
     */
    protected $active;
    
    /**
     * @var string
     *
     * @JMS\SerializedName("name")
     * @ORM\Column(name="name", type="string")
     */
    protected $name;
    
    /**
     * @var string
     *
     * @JMS\SerializedName("welcomeMsg")
     * @ORM\Column(name="welcomeMsg", type="string")
     */
    protected $welcomeMsg;
    
    /**
     * @var boolean
     *
     * @JMS\SerializedName("aviIfNoOperator")
     * @ORM\Column(name="aviIfNoOperator", type="boolean")
     */
    protected $aviIfNoOperator;
    
    /**
     * @var boolean
     *
     * @JMS\SerializedName("animations")
     * @ORM\Column(name="animations", type="boolean")
     */
    protected $animations;
    
    public function __construct()
	{       
		$this->active = true;
		$this->name = 'Lily';
		$this->welcomeMsg = 'Bonjour, quelle est votre question ?';
		$this->aviIfNoOperator = true;
		$this->animations = true;
	}
    

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set active
     *
     * @param boolean $active
     * @return AviConfig
     */
    public function setActive($active)
    {
        $this->active = $active;

        return $this;
    }

    /**
     * Get active
     *
     * @return boolean 
     */
    public function getActive()
    {
        return $this->active;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return AviConfig
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set welcomeMsg
     *
     * @param string $welcomeMsg
     * @return AviConfig
     */
    public function setWelcomeMsg($welcomeMsg)
    {
        $this->welcomeMsg = $welcomeMsg;

        return $this;
    }

    /**
     * Get welcomeMsg
     *
     * @return string 
     */
    public function getWelcomeMsg()
    {
        return $this->welcomeMsg;
    }

    /**
     * Set aviIfNoOperator
     *
     * @param boolean $aviIfNoOperator
     * @return AviConfig
     */
    public function setAviIfNoOperator($aviIfNoOperator)
    {
        $this->aviIfNoOperator = $aviIfNoOperator;

        return $this;
    }

    /**
     * Get aviIfNoOperator
     *
     * @return boolean 
     */
    public function getAviIfNoOperator()
    {
        return $this->aviIfNoOperator;
    }

    /**
     * Set animations
     *
     * @param boolean $animations
     * @return AviConfig
     */
    public function setAnimations($animations)
    {
        $this->animations = $animations;

        return $this;
    }

    /**
     * Get animations
     *
     * @return boolean 
     */
    public function getAnimations()
    {
        return $this->animations;
    }
}
