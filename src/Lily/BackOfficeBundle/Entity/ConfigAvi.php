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
     * @JMS\SerializedName("questionInvitationMsg")
     * @ORM\Column(name="questionInvitationMsg", type="array")
     */
    protected $questionInvitationMsg;
    
    /**
     * @var array
     *
     * @JMS\SerializedName("unansweredMsg")
     * @ORM\Column(name="unansweredMsg", type="array")
     */
    protected $unansweredMsg;

    /**
     * @var array
     *
     * @JMS\SerializedName("unsatisfactoryMsg")
     * @ORM\Column(name="unsatisfactoryMsg", type="array")
     */
    protected $unsatisfactoryMsg;

    /**
     * @var array
     *
     * @JMS\SerializedName("satisfactoryMsg")
     * @ORM\Column(name="satisfactoryMsg", type="array")
     */
    protected $satisfactoryMsg;
    
    /**
     * @var array
     *
     * @JMS\SerializedName("redirectionMsg")
     * @ORM\Column(name="redirectionMsg", type="array")
     */
    protected $redirectionMsg;   
    
    
    public function __construct()
    {       
		    $this->active = true;
        $this->name = 'Lily';
        $this->aviIfNoOperator = true;
        $this->animations = true;
        $this->welcomeMsg = [
          "Bonjour, quelle est votre question ?",
          "Hello there, que puis-je faire pour vous ?"
        ];
        $this->unansweredMsg = [
          "Désolé de ne pas avoir compris votre question :(",
          "Je suis une vilaine, vilaine fille"
        ];
        $this->satisfactoryMsg = [
          "Haha je t'avais bien dit que j'étais une génie",
          "Merci pour votre feedback."
        ];

        $this->redirectionMsg = [
          "Souhaitez vous contacter un opérateur humain ?"
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
     * Set questionInvitationMsg
     *
     * @param array $questionInvitationMsg
     * @return ConfigAvi
     */
    public function setQuestionInvitationMsg($questionInvitationMsg)
    {
        $this->questionInvitationMsg = $questionInvitationMsg;

        return $this;
    }

    /**
     * Get questionInvitationMsg
     *
     * @return array 
     */
    public function getQuestionInvitationMsg()
    {
        return $this->questionInvitationMsg;
    }

    /**
     * Set unansweredMsg
     *
     * @param array $unansweredMsg
     * @return ConfigAvi
     */
    public function setUnansweredMsg($unansweredMsg)
    {
        $this->unansweredMsg = $unansweredMsg;

        return $this;
    }

    /**
     * Get unansweredMsg
     *
     * @return array 
     */
    public function getUnansweredMsg()
    {
        return $this->unansweredMsg;
    }

    /**
     * Set unsatisfactoryMsg
     *
     * @param array $unsatisfactoryMsg
     * @return ConfigAvi
     */
    public function setUnsatisfactoryMsg($unsatisfactoryMsg)
    {
        $this->unsatisfactoryMsg = $unsatisfactoryMsg;

        return $this;
    }

    /**
     * Get unsatisfactoryMsg
     *
     * @return array 
     */
    public function getUnsatisfactoryMsg()
    {
        return $this->unsatisfactoryMsg;
    }

    /**
     * Set satisfactoryMsg
     *
     * @param array $satisfactoryMsg
     * @return ConfigAvi
     */
    public function setSatisfactoryMsg($satisfactoryMsg)
    {
        $this->satisfactoryMsg = $satisfactoryMsg;

        return $this;
    }

    /**
     * Get satisfactoryMsg
     *
     * @return array 
     */
    public function getSatisfactoryMsg()
    {
        return $this->satisfactoryMsg;
    }

    /**
     * Set redirectionMsg
     *
     * @param array $redirectionMsg
     * @return ConfigAvi
     */
    public function setRedirectionMsg($redirectionMsg)
    {
        $this->redirectionMsg = $redirectionMsg;

        return $this;
    }

    /**
     * Get redirectionMsg
     *
     * @return array 
     */
    public function getRedirectionMsg()
    {
        return $this->redirectionMsg;
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
