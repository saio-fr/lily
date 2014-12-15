<?php

namespace Lily\UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * ClientConfig
 *
 * @ORM\Table()
 * @ORM\Entity
 */
class ClientConfig
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
     * @return ClientConfig
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
     * @return ClientConfig
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
     * @return ClientConfig
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
     * @return ClientConfig
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
     * @return ClientConfig
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
     * @return ClientConfig
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
