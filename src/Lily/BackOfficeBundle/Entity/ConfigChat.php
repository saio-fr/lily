<?php

namespace Lily\BackOfficeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation AS JMS;

/**
 * ConfigChat
 *
 * @ORM\Table(name="ConfigChat")
 * @ORM\Entity
 */
class ConfigChat
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
     * @var smallint
     *
     * @ORM\Column(name="max", type="smallint")
     */
    protected $max;
    
    /**
     * @var boolean
     *
     * @ORM\Column(name="queue", type="boolean")
     */
    protected $queue;
           
    /**
     * @var smallint
     *
     * @JMS\SerializedName("maxQueue")
     * @ORM\Column(name="maxQueue", type="smallint")
     */
    protected $maxQueue;
    
    /**
     * @var boolean
     *
     * @JMS\SerializedName("autoSetOperator")
     * @ORM\Column(name="autoSetOperator", type="boolean")
     */
    protected $autoSetOperator;
    
    /**
     * @var boolean
     *
     * @JMS\SerializedName("contactForm")
     * @ORM\Column(name="contactForm", type="boolean")
     */
    protected $contactForm;
    
    /**
     * @var string
     *
     * @JMS\SerializedName("contactFormMsg")
     * @ORM\Column(name="contactFormMsg", type="string")
     */
    protected $contactFormMsg;
    
    /**
     * @var boolean
     *
     * @JMS\SerializedName("contactFirstNameField")
     * @ORM\Column(name="contactFirstNameField", type="boolean")
     */
    protected $contactFirstNameField;
    
    /**
     * @var boolean
     *
     * @JMS\SerializedName("contactLastNameField")
     * @ORM\Column(name="contactLastNameField", type="boolean")
     */
    protected $contactLastNameField;

    /**
     * @var boolean
     *
     * @JMS\SerializedName("contactEmailField")
     * @ORM\Column(name="contactEmailField", type="boolean")
     */
    protected $contactEmailField;  
    
    /**
     * @var boolean
     *
     * @JMS\SerializedName("contactFormAvoidable")
     * @ORM\Column(name="contactFormAvoidable", type="boolean")
     */
    protected $contactFormAvoidable; 

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
        $this->onBoardingMsg = [
          "Posez votre question. Un conseiller vous répondra le plus rapidement possible."
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
     * @return ConfigChat
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
     * Set max
     *
     * @param integer $max
     * @return ConfigChat
     */
    public function setMax($max)
    {
        $this->max = $max;

        return $this;
    }

    /**
     * Get max
     *
     * @return integer 
     */
    public function getMax()
    {
        return $this->max;
    }

    /**
     * Set queue
     *
     * @param boolean $queue
     * @return ConfigChat
     */
    public function setQueue($queue)
    {
        $this->queue = $queue;

        return $this;
    }

    /**
     * Get queue
     *
     * @return boolean 
     */
    public function getQueue()
    {
        return $this->queue;
    }

    /**
     * Set maxQueue
     *
     * @param integer $maxQueue
     * @return ConfigChat
     */
    public function setMaxQueue($maxQueue)
    {
        $this->maxQueue = $maxQueue;

        return $this;
    }

    /**
     * Get maxQueue
     *
     * @return integer 
     */
    public function getMaxQueue()
    {
        return $this->maxQueue;
    }

    /**
     * Set autoSetOperator
     *
     * @param boolean $autoSetOperator
     * @return ConfigChat
     */
    public function setAutoSetOperator($autoSetOperator)
    {
        $this->autoSetOperator = $autoSetOperator;

        return $this;
    }

    /**
     * Get autoSetOperator
     *
     * @return boolean 
     */
    public function getAutoSetOperator()
    {
        return $this->autoSetOperator;
    }

    /**
     * Set contactForm
     *
     * @param boolean $contactForm
     * @return ConfigChat
     */
    public function setContactForm($contactForm)
    {
        $this->contactForm = $contactForm;

        return $this;
    }

    /**
     * Get contactForm
     *
     * @return boolean 
     */
    public function getContactForm()
    {
        return $this->contactForm;
    }

    /**
     * Set contactFormMsg
     *
     * @param string $contactFormMsg
     * @return ConfigChat
     */
    public function setContactFormMsg($contactFormMsg)
    {
        $this->contactFormMsg = $contactFormMsg;

        return $this;
    }

    /**
     * Get contactFormMsg
     *
     * @return string 
     */
    public function getContactFormMsg()
    {
        return $this->contactFormMsg;
    }

    /**
     * Set contactFirstNameField
     *
     * @param boolean $contactFirstNameField
     * @return ConfigChat
     */
    public function setContactFirstNameField($contactFirstNameField)
    {
        $this->contactFirstNameField = $contactFirstNameField;

        return $this;
    }

    /**
     * Get contactFirstNameField
     *
     * @return boolean 
     */
    public function getContactFirstNameField()
    {
        return $this->contactFirstNameField;
    }

    /**
     * Set contactLastNameField
     *
     * @param boolean $contactLastNameField
     * @return ConfigChat
     */
    public function setContactLastNameField($contactLastNameField)
    {
        $this->contactLastNameField = $contactLastNameField;

        return $this;
    }

    /**
     * Get contactLastNameField
     *
     * @return boolean 
     */
    public function getContactLastNameField()
    {
        return $this->contactLastNameField;
    }

    /**
     * Set contactEmailField
     *
     * @param boolean $contactEmailField
     * @return ConfigChat
     */
    public function setContactEmailField($contactEmailField)
    {
        $this->contactEmailField = $contactEmailField;

        return $this;
    }

    /**
     * Get contactEmailField
     *
     * @return boolean 
     */
    public function getContactEmailField()
    {
        return $this->contactEmailField;
    }

    /**
     * Set contactFormAvoidable
     *
     * @param boolean $contactFormAvoidable
     * @return ConfigChat
     */
    public function setContactFormAvoidable($contactFormAvoidable)
    {
        $this->contactFormAvoidable = $contactFormAvoidable;

        return $this;
    }

    /**
     * Get contactFormAvoidable
     *
     * @return boolean 
     */
    public function getContactFormAvoidable()
    {
        return $this->contactFormAvoidable;
    }

    /**
     * Set onBoardingMsg
     *
     * @param array $onBoardingMsg
     * @return ConfigChat
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
}
