<?php

namespace Lily\BackOfficeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation AS JMS;

/**
 * Config
 *
 * @ORM\Table(name="ChatConfig")
 * @ORM\Entity
 */
class ChatConfig
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
     * @var smallint
     *
     * @ORM\Column(name="max", type="smallint")
     */
    public $max;
    
    /**
     * @var boolean
     *
     * @ORM\Column(name="queue", type="boolean")
     */
    public $queue;
           
    /**
     * @var smallint
     *
     * @JMS\SerializedName("maxQueue")
     * @ORM\Column(name="maxQueue", type="smallint")
     */
    public $maxQueue;
    
    /**
     * @var boolean
     *
     * @JMS\SerializedName("autoSetOperator")
     * @ORM\Column(name="autoSetOperator", type="boolean")
     */
    public $autoSetOperator;
    
    /**
     * @var boolean
     *
     * @JMS\SerializedName("contactForm")
     * @ORM\Column(name="contactForm", type="boolean")
     */
    public $contactForm;
    
    /**
     * @var string
     *
     * @JMS\SerializedName("contactFormMsg")
     * @ORM\Column(name="contactFormMsg", type="string")
     */
    public $contactFormMsg;
    
    /**
     * @var boolean
     *
     * @JMS\SerializedName("contactFirstNameField")
     * @ORM\Column(name="contactFirstNameField", type="boolean")
     */
    public $contactFirstNameField;
    
    /**
     * @var boolean
     *
     * @JMS\SerializedName("contactLastNameField")
     * @ORM\Column(name="contactLastNameField", type="boolean")
     */
    public $contactLastNameField;

    /**
     * @var boolean
     *
     * @JMS\SerializedName("contactEmailField")
     * @ORM\Column(name="contactEmailField", type="boolean")
     */
    public $contactEmailField;  
    
    /**
     * @var boolean
     *
     * @JMS\SerializedName("contactFormAvoidable")
     * @ORM\Column(name="contactFormAvoidable", type="boolean")
     */
    public $contactFormAvoidable;       
 
    public function __construct()
	{
		$this->active = true;
		$this->queue = true;
		$this->max = 4;
		$this->autoSetOperator = true;
		$this->maxQueue = 4;
		$this->contactForm = false;
		$this->contactFormMsg = 'Merci de renseigner vos informations personnelles avant commencer à chatter avec un conseiller.';
		$this->contactFirstNameField = true;
		$this->contactLastNameField = true;
		$this->contactEmailField = true;  
	    $this->contactFormAvoidable = true;       
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
     * Set chatMax
     *
     * @param integer $chatMax
     * @return Config
     */
    public function setChatMax($chatMax)
    {
        $this->chatMax = $chatMax;

        return $this;
    }

    /**
     * Get chatMax
     *
     * @return integer 
     */
    public function getChatMax()
    {
        return $this->chatMax;
    }

    /**
     * Set chatAutoSetOperator
     *
     * @param boolean $chatAutoSetOperator
     * @return Config
     */
    public function setChatAutoSetOperator($chatAutoSetOperator)
    {
        $this->chatAutoSetOperator = $chatAutoSetOperator;

        return $this;
    }

    /**
     * Get chatAutoSetOperator
     *
     * @return boolean 
     */
    public function getChatAutoSetOperator()
    {
        return $this->chatAutoSetOperator;
    }

    /**
     * Set chatMaxQueue
     *
     * @param integer $chatMaxQueue
     * @return Config
     */
    public function setChatMaxQueue($chatMaxQueue)
    {
        $this->chatMaxQueue = $chatMaxQueue;

        return $this;
    }

    /**
     * Get chatMaxQueue
     *
     * @return integer 
     */
    public function getChatMaxQueue()
    {
        return $this->chatMaxQueue;
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
     * Set chatContactForm
     *
     * @param boolean $chatContactForm
     * @return Config
     */
    public function setChatContactForm($chatContactForm)
    {
        $this->chatContactForm = $chatContactForm;

        return $this;
    }

    /**
     * Get chatContactForm
     *
     * @return boolean 
     */
    public function getChatContactForm()
    {
        return $this->chatContactForm;
    }

    /**
     * Set chatContactFormMsg
     *
     * @param string $chatContactFormMsg
     * @return Config
     */
    public function setChatContactFormMsg($chatContactFormMsg)
    {
        $this->chatContactFormMsg = $chatContactFormMsg;

        return $this;
    }

    /**
     * Get chatContactFormMsg
     *
     * @return string 
     */
    public function getChatContactFormMsg()
    {
        return $this->chatContactFormMsg;
    }

    /**
     * Set chatContactFirstNameField
     *
     * @param boolean $chatContactFirstNameField
     * @return Config
     */
    public function setChatContactFirstNameField($chatContactFirstNameField)
    {
        $this->chatContactFirstNameField = $chatContactFirstNameField;

        return $this;
    }

    /**
     * Get chatContactFirstNameField
     *
     * @return boolean 
     */
    public function getChatContactFirstNameField()
    {
        return $this->chatContactFirstNameField;
    }

    /**
     * Set chatContactLastNameField
     *
     * @param boolean $chatContactLastNameField
     * @return Config
     */
    public function setChatContactLastNameField($chatContactLastNameField)
    {
        $this->chatContactLastNameField = $chatContactLastNameField;

        return $this;
    }

    /**
     * Get chatContactLastNameField
     *
     * @return boolean 
     */
    public function getChatContactLastNameField()
    {
        return $this->chatContactLastNameField;
    }

    /**
     * Set chatContactEmailField
     *
     * @param boolean $chatContactEmailField
     * @return Config
     */
    public function setChatContactEmailField($chatContactEmailField)
    {
        $this->chatContactEmailField = $chatContactEmailField;

        return $this;
    }

    /**
     * Get chatContactEmailField
     *
     * @return boolean 
     */
    public function getChatContactEmailField()
    {
        return $this->chatContactEmailField;
    }

    /**
     * Set chatContactFormAvoidable
     *
     * @param boolean $chatContactFormAvoidable
     * @return Config
     */
    public function setChatContactFormAvoidable($chatContactFormAvoidable)
    {
        $this->chatContactFormAvoidable = $chatContactFormAvoidable;

        return $this;
    }

    /**
     * Get chatContactFormAvoidable
     *
     * @return boolean 
     */
    public function getChatContactFormAvoidable()
    {
        return $this->chatContactFormAvoidable;
    }
}
