<?php

namespace Lily\BackOfficeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation AS JMS;

/**
 * ConfigAvi
 *
 * @ORM\Table(name="ConfigAvi")
 * @ORM\Entity
 */
class ConfigAvi
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
     * @ORM\OneToOne(targetEntity="Lily\BackOfficeBundle\Entity\ConfigAviRedirections", cascade={"persist", "remove"})
     */
    protected $redirections; 
    
    /**
     * @var string
     *
     * @JMS\SerializedName("name")
     * @ORM\Column(name="name", type="string")
     */
    protected $name;
    
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
    
    /**
     * @var array
     *
     * @JMS\SerializedName("welcomeMsg")
     * @ORM\Column(name="welcomeMsg", type="array")
     */
    protected $welcomeMsg;
    
    /**
     * @var array
     *
     * @JMS\SerializedName("onBoardingMsg")
     * @ORM\Column(name="onBoardingMsg", type="array")
     */
    protected $onBoardingMsg;
    
    
    public function __construct()
    {       
		    $this->active = true;
        $this->name = 'Lily';
        $this->aviIfNoOperator = true;
        $this->animations = true;
        $this->welcomeMsg = [
          "Bonjour ! En quoi puis-je vous aider ?"
        ];
        $this->onBoardingMsg = [
          "Posez vos questions à notre assistant virtuel"
        ];
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
     * @return ConfigAvi
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
     * @return ConfigAvi
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
     * Set aviIfNoOperator
     *
     * @param boolean $aviIfNoOperator
     * @return ConfigAvi
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
     * @return ConfigAvi
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

    /**
     * Set welcomeMsg
     *
     * @param array $welcomeMsg
     * @return ConfigAvi
     */
    public function setWelcomeMsg($welcomeMsg)
    {
        $this->welcomeMsg = $welcomeMsg;

        return $this;
    }

    /**
     * Get welcomeMsg
     *
     * @return array 
     */
    public function getWelcomeMsg()
    {
        return $this->welcomeMsg;
    }

    /**
     * Set onBoardingMsg
     *
     * @param array $onBoardingMsg
     * @return ConfigAvi
     */
    public function setOnBoardingMsg($onBoardingMsg)
    {
        $this->onBoardingMsg = $onBoardingMsg;

        return $this;
    }

    /**
     * Get onBoardingMsg
     *
     * @return array 
     */
    public function getOnBoardingMsg()
    {
        return $this->onBoardingMsg;
    }

    /**
     * Set redirections
     *
     * @param \Lily\BackOfficeBundle\Entity\ConfigAviRedirections $redirections
     * @return ConfigAvi
     */
    public function setRedirections(\Lily\BackOfficeBundle\Entity\ConfigAviRedirections $redirections = null)
    {
        $this->redirections = $redirections;

        return $this;
    }

    /**
     * Get redirections
     *
     * @return \Lily\BackOfficeBundle\Entity\ConfigAviRedirections 
     */
    public function getRedirections()
    {
        return $this->redirections;
    }
}
