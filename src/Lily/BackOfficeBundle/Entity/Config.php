<?php

namespace Lily\BackOfficeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation AS JMS;

/**
 * Config
 *
 * @ORM\Table(name="LilyConfig")
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
    private $id;

    /**
     * @var boolean
     *
     * @ORM\Column(name="chat", type="boolean")
     */
    private $chat;
    
    /**
     * @var boolean
     *
     * @JMS\SerializedName("chatQueue")
     * @ORM\Column(name="chatQueue", type="boolean")
     */
    private $chatQueue;
    
    /**
     * @var smallint
     *
     * @JMS\SerializedName("chatQueueLimit")
     * @ORM\Column(name="chatQueueLimit", type="smallint")
     */
    private $chatQueueLimit;
    
    /**
     * @var boolean
     *
     * @ORM\Column(name="avi", type="boolean")
     */
    private $avi;
    
    /**
     * @var string
     *
     * @JMS\SerializedName("aviName")
     * @ORM\Column(name="aviName", type="string")
     */
    private $aviName;
    
    /**
     * @var string
     *
     * @JMS\SerializedName("aviWelcomeMsg")
     * @ORM\Column(name="aviWelcomeMsg", type="string")
     */
    private $aviWelcomeMsg;
    
    /**
     * @var boolean
     *
     * @JMS\SerializedName("aviIfNoOperator")
     * @ORM\Column(name="aviIfNoOperator", type="boolean")
     */
    private $aviIfNoOperator;
    
    /**
     * @var boolean
     *
     * @JMS\SerializedName("aviAnimations")
     * @ORM\Column(name="aviAnimations", type="boolean")
     */
    private $aviAnimations;


    /**
     * @var boolean
     *
     * @ORM\Column(name="faq", type="boolean")
     */
    private $faq;

    /**
     * @var boolean
     *
     * @JMS\SerializedName("topQuestions")
     * @ORM\Column(name="topQuestions", type="boolean")
     */
    private $topQuestions;

    /**
     * @var boolean
     *
     * @ORM\Column(name="maintenance", type="boolean")
     */
    private $maintenance;

    /**
     * @var boolean
     *
     * @JMS\SerializedName("redirectionChat")
     * @ORM\Column(name="redirectionChat", type="boolean")
     */
    private $redirectionChat;

    /**
     * @var boolean
     *
     * @JMS\SerializedName("redirectionMail")
     * @ORM\Column(name="redirectionMail", type="boolean")
     */
    private $redirectionMail;

    /**
     * @var boolean
     *
     * @JMS\SerializedName("redirectionTel")
     * @ORM\Column(name="redirectionTel", type="boolean")
     */
    private $redirectionTel;

    /**
     * @var string
     *
     * @JMS\SerializedName("home")
     * @ORM\Column(name="home", type="string", length=10)
     */
    private $home;

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
     * Set chat
     *
     * @param boolean $chat
     * @return Config
     */
    public function setChat($chat)
    {
        $this->chat = $chat;
    
        return $this;
    }

    /**
     * Get chat
     *
     * @return boolean 
     */
    public function getChat()
    {
        return $this->chat;
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
     * Set redirectionChat
     *
     * @param boolean $redirectionChat
     * @return Config
     */
    public function setRedirectionChat($redirectionChat)
    {
        $this->redirectionChat = $redirectionChat;
    
        return $this;
    }

    /**
     * Get redirectionChat
     *
     * @return boolean 
     */
    public function getRedirectionChat()
    {
        return $this->redirectionChat;
    }

    /**
     * Set redirectionMail
     *
     * @param boolean $redirectionMail
     * @return Config
     */
    public function setRedirectionMail($redirectionMail)
    {
        $this->redirectionMail = $redirectionMail;
    
        return $this;
    }

    /**
     * Get redirectionMail
     *
     * @return boolean 
     */
    public function getRedirectionMail()
    {
        return $this->redirectionMail;
    }

    /**
     * Set redirectionTel
     *
     * @param boolean $redirectionTel
     * @return Config
     */
    public function setRedirectionTel($redirectionTel)
    {
        $this->redirectionTel = $redirectionTel;
    
        return $this;
    }

    /**
     * Get redirectionTel
     *
     * @return boolean 
     */
    public function getRedirectionTel()
    {
        return $this->redirectionTel;
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
     * Set avi
     *
     * @param boolean $avi
     * @return Config
     */
    public function setAvi($avi)
    {
        $this->avi = $avi;
    
        return $this;
    }

    /**
     * Get avi
     *
     * @return boolean 
     */
    public function getAvi()
    {
        return $this->avi;
    }

    /**
     * Set aviName
     *
     * @param string $aviName
     * @return Config
     */
    public function setAviName($aviName)
    {
        $this->aviName = $aviName;
    
        return $this;
    }

    /**
     * Get aviName
     *
     * @return string 
     */
    public function getAviName()
    {
        return $this->aviName;
    }

    /**
     * Set aviWelcomeMsg
     *
     * @param string $aviWelcomeMsg
     * @return Config
     */
    public function setAviWelcomeMsg($aviWelcomeMsg)
    {
        $this->aviWelcomeMsg = $aviWelcomeMsg;
    
        return $this;
    }

    /**
     * Get aviWelcomeMsg
     *
     * @return string 
     */
    public function getAviWelcomeMsg()
    {
        return $this->aviWelcomeMsg;
    }

    /**
     * Set chatQueue
     *
     * @param boolean $chatQueue
     * @return Config
     */
    public function setChatQueue($chatQueue)
    {
        $this->chatQueue = $chatQueue;
    
        return $this;
    }

    /**
     * Get chatQueue
     *
     * @return boolean 
     */
    public function getChatQueue()
    {
        return $this->chatQueue;
    }

    /**
     * Set chatQueueLimit
     *
     * @param integer $chatQueueLimit
     * @return Config
     */
    public function setChatQueueLimit($chatQueueLimit)
    {
        $this->chatQueueLimit = $chatQueueLimit;
    
        return $this;
    }

    /**
     * Get chatQueueLimit
     *
     * @return integer 
     */
    public function getChatQueueLimit()
    {
        return $this->chatQueueLimit;
    }

    /**
     * Set aviIfNoOperator
     *
     * @param boolean $aviIfNoOperator
     * @return Config
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
     * Set aviAnimations
     *
     * @param boolean $aviAnimations
     * @return Config
     */
    public function setAviAnimations($aviAnimations)
    {
        $this->aviAnimations = $aviAnimations;
    
        return $this;
    }

    /**
     * Get aviAnimations
     *
     * @return boolean 
     */
    public function getAviAnimations()
    {
        return $this->aviAnimations;
    }
}