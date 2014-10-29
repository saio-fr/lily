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
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=150, nullable=true)
     */
    private $name;
    
    /**
     * @var integer
     *
     * @ORM\Column(name="operator", type="integer", nullable=true)
     */
    private $operator;
    
    /**
     * @var boolean
     *
     * @ORM\Column(name="transfered", type="boolean")
     */
    private $transfered;

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
     * @ORM\Column(name="start", type="datetime", nullable=true)
     */
    private $start;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="end", type="datetime", nullable=true)
     */
    private $end;

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
     * @var boolean
     *
     * @ORM\Column(name="banned", type="boolean", nullable=true)
     */
    private $banned;
    
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
     * Get start
     *
     * @return \DateTime 
     */
    public function getStart()
    {
        return $this->start;
    }

    /**
     * Set end
     *
     * @param \DateTime $end
     * @return LogChat
     */
    public function setEndTime($end)
    {
        $this->end = $end;
    
        return $this;
    }

    /**
     * Get end
     *
     * @return \DateTime 
     */
    public function getEnd()
    {
        return $this->end;
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

    /**
     * Set banned
     *
     * @param boolean $banned
     * @return LogChat
     */
    public function setBanned($banned)
    {
        $this->banned = $banned;

        return $this;
    }

    /**
     * Get banned
     *
     * @return boolean 
     */
    public function getBanned()
    {
        return $this->banned;
    }

    /**
     * Set transfered
     *
     * @param boolean $transfered
     * @return LogChat
     */
    public function setTransfered($transfered)
    {
        $this->transfered = $transfered;

        return $this;
    }

    /**
     * Get transfered
     *
     * @return boolean 
     */
    public function getTransfered()
    {
        return $this->transfered;
    }

    /**
     * Set start
     *
     * @param \DateTime $start
     * @return LogChat
     */
    public function setStart($start)
    {
        $this->start = $start;

        return $this;
    }

    /**
     * Set end
     *
     * @param \DateTime $end
     * @return LogChat
     */
    public function setEnd($end)
    {
        $this->end = $end;

        return $this;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return LogChat
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
}
