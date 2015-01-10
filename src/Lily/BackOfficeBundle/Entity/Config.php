<?php

namespace Lily\BackOfficeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

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
    protected $id;
    
    /**
     * @ORM\OneToOne(targetEntity="Lily\BackOfficeBundle\Entity\ConfigChat", cascade={"persist", "remove"})
     */
    protected $chat;
    
    /**
     * @ORM\OneToOne(targetEntity="Lily\BackOfficeBundle\Entity\ConfigAvi", cascade={"persist", "remove"})
     */
    protected $avi;  

    /**
     * @var boolean
     *
     * @ORM\Column(name="faq", type="boolean")
     */
    protected $faq;

    /**
     * @var boolean
     *
     * @ORM\Column(name="topquestions", type="boolean")
     */
    protected $topquestions;

    /**
     * @var string
     *
     * @ORM\Column(name="home", type="string", length=10)
     */
    protected $home;   
    
    /**
     * @var string
     *
     * @ORM\Column(name="theme", type="string", length=20)
     */
    protected $theme; 
        
    /**
     * @var text
     *
     * @ORM\Column(name="widget", type="text")
     */
    protected $widget; 
     
    
    /**
     * @var boolean
     *
     * @ORM\Column(name="maintenance", type="boolean")
     */
    protected $maintenance;
    
    public function __construct()
    {   
    		$this->theme = 'lily';
    		$this->faq = true;
    		$this->topquestions = true;
    		$this->maintenance = false;
        $this->widget = '<h3>Vous avez une question ?</h3>';
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
     * Set topquestions
     *
     * @param boolean $topquestions
     * @return Config
     */
    public function setTopquestions($topquestions)
    {
        $this->topquestions = $topquestions;

        return $this;
    }

    /**
     * Get topquestions
     *
     * @return boolean 
     */
    public function getTopquestions()
    {
        return $this->topquestions;
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
     * @param \Lily\BackOfficeBundle\Entity\ConfigChat $chat
     * @return Config
     */
    public function setChat(\Lily\BackOfficeBundle\Entity\ConfigChat $chat = null)
    {
        $this->chat = $chat;

        return $this;
    }

    /**
     * Get chat
     *
     * @return \Lily\BackOfficeBundle\Entity\ConfigChat
     */
    public function getChat()
    {
        return $this->chat;
    }

    /**
     * Set avi
     *
     * @param \Lily\BackOfficeBundle\Entity\ConfigAvi $avi
     * @return Config
     */
    public function setAvi(\Lily\BackOfficeBundle\Entity\ConfigAvi $avi = null)
    {
        $this->avi = $avi;

        return $this;
    }

    /**
     * Get avi
     *
     * @return \Lily\BackOfficeBundle\Entity\ConfigAvi 
     */
    public function getAvi()
    {
        return $this->avi;
    }

    /**
     * Set widget
     *
     * @param string $widget
     * @return Config
     */
    public function setWidget($widget)
    {
        $this->widget = $widget;

        return $this;
    }

    /**
     * Get widget
     *
     * @return string 
     */
    public function getWidget()
    {
        return $this->widget;
    }
}
