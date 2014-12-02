<?php

namespace Lily\ClientBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

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
     * @var boolean
     * @ORM\Column(name="maintenance", type="boolean")
     */
    protected $maintenance = false;
    
    /**
     * @var boolean
     * @Assert\NotBlank()
     * @ORM\Column(name="chat", type="boolean")
     */
    protected $chat;
    
    /**
     * @var boolean
     * @Assert\NotBlank()
     * @ORM\Column(name="avi", type="boolean")
     */
    protected $avi;
    
    /**
     * @var boolean
     * @Assert\NotBlank()
     * @ORM\Column(name="faq", type="boolean")
     */
    protected $faq;
    
    /**
     * @var boolean
     * @Assert\NotBlank()
     * @ORM\Column(name="topquestions", type="boolean")
     */
    protected $topquestions;
    
    /**
     * @var integer
     * @Assert\NotBlank()
     * @ORM\Column(name="maxusers", type="integer")
     */
    protected $maxusers;

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
     * Set maxusers
     *
     * @param integer $maxusers
     * @return Config
     */
    public function setMaxusers($maxusers)
    {
        $this->maxusers = $maxusers;

        return $this;
    }

    /**
     * Get maxusers
     *
     * @return integer 
     */
    public function getMaxusers()
    {
        return $this->maxusers;
    }
}
