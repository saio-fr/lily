<?php

namespace Lily\BackOfficeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation AS JMS;

/**
 * Config
 *
 * @ORM\Table(name="RedirectionsConfig")
 * @ORM\Entity
 */
class RedirectionsConfig
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
     * @ORM\Column(name="chat", type="boolean")
     */
    protected $chat;

    /**
     * @var boolean
     *
     * @ORM\Column(name="mail", type="boolean")
     */
    protected $mail;

    /**
     * @var boolean
     *
     * @ORM\Column(name="phone", type="boolean")
     */
    protected $phone;
    
    public function __construct()
	{       
		$this->chat = true;
		$this->mail = true;
		$this->phone = true;
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
     * @return RedirectionsConfig
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
     * Set mail
     *
     * @param boolean $mail
     * @return RedirectionsConfig
     */
    public function setMail($mail)
    {
        $this->mail = $mail;

        return $this;
    }

    /**
     * Get mail
     *
     * @return boolean 
     */
    public function getMail()
    {
        return $this->mail;
    }

    /**
     * Set phone
     *
     * @param boolean $phone
     * @return RedirectionsConfig
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * Get phone
     *
     * @return boolean 
     */
    public function getPhone()
    {
        return $this->phone;
    }
}
