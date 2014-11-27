<?php

namespace Lily\BackOfficeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation AS JMS;

/**
 * Config
 *
 * @ORM\Table(name="Config")
 * @ORM\Entity
 */
class Config
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
     * @ORM\OneToOne(targetEntity="Lily\BackOfficeBundle\Entity\ChatConfig", cascade={"persist", "remove"})
     */
    public $chat;
    
    /**
     * @ORM\OneToOne(targetEntity="Lily\BackOfficeBundle\Entity\AviConfig", cascade={"persist", "remove"})
     */
    public $avi;
    
    /**
     * @ORM\OneToOne(targetEntity="Lily\BackOfficeBundle\Entity\RedirectionsConfig", cascade={"persist", "remove"})
     */
    public $redirections;   

    /**
     * @var boolean
     *
     * @ORM\Column(name="faq", type="boolean")
     */
    public $faq;

    /**
     * @var boolean
     *
     * @JMS\SerializedName("topQuestions")
     * @ORM\Column(name="topQuestions", type="boolean")
     */
    public $topQuestions;

    /**
     * @var string
     *
     * @ORM\Column(name="home", type="string", length=10)
     */
    public $home;   
    
    /**
     * @var string
     *
     * @ORM\Column(name="theme", type="string", length=20)
     */
    public $theme; 
     
    
    /**
     * @var boolean
     *
     * @ORM\Column(name="maintenance", type="boolean")
     */
    public $maintenance;
    
    public function __construct()
	{   
		$this->theme = 'lily';
		$this->faq = true;
		$this->topQuestions = true;
		$this->maintenance = false;
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
     * Set faq
     *
     * @param boolean $faq
     * @return Config
     */
    public function setFaq($faq)
    {
        $this->faq = $faq;

        return $this;
    }

    /**
     * Get faq
     *
     * @return boolean 
     */
    public function getFaq()
    {
        return $this->faq;
    }

    /**
     * Set topQuestions
     *
     * @param boolean $topQuestions
     * @return Config
     */
    public function setTopQuestions($topQuestions)
    {
        $this->topQuestions = $topQuestions;

        return $this;
    }

    /**
     * Get topQuestions
     *
     * @return boolean 
     */
    public function getTopQuestions()
    {
        return $this->topQuestions;
    }

    /**
     * Set home
     *
     * @param string $home
     * @return Config
     */
    public function setHome($home)
    {
        $this->home = $home;

        return $this;
    }

    /**
     * Get home
     *
     * @return string 
     */
    public function getHome()
    {
        return $this->home;
    }

    /**
     * Set theme
     *
     * @param string $theme
     * @return Config
     */
    public function setTheme($theme)
    {
        $this->theme = $theme;

        return $this;
    }

    /**
     * Get theme
     *
     * @return string 
     */
    public function getTheme()
    {
        return $this->theme;
    }

    /**
     * Set maintenance
     *
     * @param boolean $maintenance
     * @return Config
     */
    public function setMaintenance($maintenance)
    {
        $this->maintenance = $maintenance;

        return $this;
    }

    /**
     * Get maintenance
     *
     * @return boolean 
     */
    public function getMaintenance()
    {
        return $this->maintenance;
    }

    /**
     * Set chat
     *
     * @param \Lily\BackOfficeBundle\Entity\ChatConfig $chat
     * @return Config
     */
    public function setChat(\Lily\BackOfficeBundle\Entity\ChatConfig $chat = null)
    {
        $this->chat = $chat;

        return $this;
    }

    /**
     * Get chat
     *
     * @return \Lily\BackOfficeBundle\Entity\ChatConfig 
     */
    public function getChat()
    {
        return $this->chat;
    }

    /**
     * Set avi
     *
     * @param \Lily\BackOfficeBundle\Entity\AviConfig $avi
     * @return Config
     */
    public function setAvi(\Lily\BackOfficeBundle\Entity\AviConfig $avi = null)
    {
        $this->avi = $avi;

        return $this;
    }

    /**
     * Get avi
     *
     * @return \Lily\BackOfficeBundle\Entity\AviConfig 
     */
    public function getAvi()
    {
        return $this->avi;
    }

    /**
     * Set redirections
     *
     * @param \Lily\BackOfficeBundle\Entity\RedirectionsConfig $redirections
     * @return Config
     */
    public function setRedirections(\Lily\BackOfficeBundle\Entity\RedirectionsConfig $redirections = null)
    {
        $this->redirections = $redirections;

        return $this;
    }

    /**
     * Get redirections
     *
     * @return \Lily\BackOfficeBundle\Entity\RedirectionsConfig 
     */
    public function getRedirections()
    {
        return $this->redirections;
    }
}
