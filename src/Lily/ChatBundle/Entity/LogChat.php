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
     * @ORM\Column(name="operatorId", type="integer")
     */
    private $operatorId;

    /**
     * @var string
     *
     * @ORM\Column(name="sessionId", type="string", length=50)
     */
    private $sessionId;
    
    /**
     * @var integer
     *
     * @ORM\Column(name="transferedId", type="integer")
     */
    private $transferedId;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="startTime", type="datetime")
     */
    private $startTime;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="endTime", type="datetime")
     */
    private $endTime;

    /**
     * @var integer
     *
     * @ORM\Column(name="waited", type="integer")
     */
    private $waited;

    /**
     * @var string
     *
     * @ORM\Column(name="satisfaction", type="string", length=5)
     */
    private $satisfaction;


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
     * Set sessionId
     *
     * @param string $sessionId
     * @return LogChat
     */
    public function setSessionId($sessionId)
    {
        $this->sessionId = $sessionId;
    
        return $this;
    }

    /**
     * Get sessionId
     *
     * @return string 
     */
    public function getSessionId()
    {
        return $this->sessionId;
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
     * Set satisfaction
     *
     * @param string $satisfaction
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
     * @return string 
     */
    public function getSatisfaction()
    {
        return $this->satisfaction;
    }

    /**
     * Set operatorId
     *
     * @param integer $operatorId
     * @return LogChat
     */
    public function setOperatorId($operatorId)
    {
        $this->operatorId = $operatorId;
    
        return $this;
    }

    /**
     * Get operatorId
     *
     * @return integer 
     */
    public function getOperatorId()
    {
        return $this->operatorId;
    }

    /**
     * Set transferedId
     *
     * @param integer $transferedId
     * @return LogChat
     */
    public function setTransferedId($transferedId)
    {
        $this->transferedId = $transferedId;
    
        return $this;
    }

    /**
     * Get transferedId
     *
     * @return integer 
     */
    public function getTransferedId()
    {
        return $this->transferedId;
    }
}