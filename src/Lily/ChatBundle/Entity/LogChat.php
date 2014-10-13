<?php

namespace Lily\ChatBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * LogChat
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Lily\ChatBundle\Entity\LogChatRepository")
 */
class LogChat
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
     * @var integer
     *
     * @ORM\Column(name="operator", type="integer", nullable=true)
     */
    private $operator;

    /**
     * @var string
     *
     * @ORM\Column(name="session", type="string", length=50, nullable=true)
     */
    private $session;
    
    /**
     * @var string
     *
     * @ORM\Column(name="firstname", type="string", length=50, nullable=true)
     */
    private $firstname;
    
    /**
     * @var string
     *
     * @ORM\Column(name="lastname", type="string", length=50, nullable=true)
     */
    private $lastname;
    
    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=50, nullable=true)
     */
    private $email;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="startTime", type="datetime", nullable=true)
     */
    private $startTime;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="endTime", type="datetime", nullable=true)
     */
    private $endTime;

    /**
     * @var integer
     *
     * @ORM\Column(name="waited", type="integer", nullable=true)
     */
    private $waited;

    /**
     * @var boolean
     *
     * @ORM\Column(name="satisfaction", type="boolean", nullable=true)
     */
    private $satisfaction;
    
    /**
     * @var array $messages
     *
     * @ORM\Column(type="array", nullable=true)
     */
    protected $messages;


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
     * Set session
     *
     * @param string $session
     * @return LogChat
     */
    public function setSession($session)
    {
        $this->session = $session;

        return $this;
    }

    /**
     * Get session
     *
     * @return string 
     */
    public function getSession()
    {
        return $this->session;
    }

    /**
     * Set startTime
     *
     * @param \DateTime $startTime
     * @return LogChat
     */
    public function setStartTime($startTime)
    {
        $this->startTime = $startTime;
    
        return $this;
    }

    /**
     * Get startTime
     *
     * @return \DateTime 
     */
    public function getStartTime()
    {
        return $this->startTime;
    }

    /**
     * Set endTime
     *
     * @param \DateTime $endTime
     * @return LogChat
     */
    public function setEndTime($endTime)
    {
        $this->endTime = $endTime;
    
        return $this;
    }

    /**
     * Get endTime
     *
     * @return \DateTime 
     */
    public function getEndTime()
    {
        return $this->endTime;
    }

    /**
     * Set waited
     *
     * @param integer $waited
     * @return LogChat
     */
    public function setWaited($waited)
    {
        $this->waited = $waited;
    
        return $this;
    }

    /**
     * Get waited
     *
     * @return integer 
     */
    public function getWaited()
    {
        return $this->waited;
    }

    /**
     * Set operator
     *
     * @param integer $operator
     * @return LogChat
     */
    public function setOperator($operator)
    {
        $this->operator = $operator;
    
        return $this;
    }

    /**
     * Get operator
     *
     * @return integer 
     */
    public function getOperator()
    {
        return $this->operator;
    }

    /**
     * Set satisfaction
     *
     * @param boolean $satisfaction
     * @return LogChat
     */
    public function setSatisfaction($satisfaction)
    {
        $this->satisfaction = $satisfaction;

        return $this;
    }

    /**
     * Get satisfaction
     *
     * @return boolean 
     */
    public function getSatisfaction()
    {
        return $this->satisfaction;
    }

    /**
     * Set firstname
     *
     * @param string $firstname
     * @return LogChat
     */
    public function setFirstname($firstname)
    {
        $this->firstname = $firstname;

        return $this;
    }

    /**
     * Get firstname
     *
     * @return string 
     */
    public function getFirstname()
    {
        return $this->firstname;
    }

    /**
     * Set lastname
     *
     * @param string $lastname
     * @return LogChat
     */
    public function setLastname($lastname)
    {
        $this->lastname = $lastname;

        return $this;
    }

    /**
     * Get lastname
     *
     * @return string 
     */
    public function getLastname()
    {
        return $this->lastname;
    }

    /**
     * Set email
     *
     * @param string $email
     * @return LogChat
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string 
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set messages
     *
     * @param array $messages
     * @return LogChat
     */
    public function setMessages($messages)
    {
        $this->messages = $messages;

        return $this;
    }

    /**
     * Get messages
     *
     * @return array 
     */
    public function getMessages()
    {
        return $this->messages;
    }
}
