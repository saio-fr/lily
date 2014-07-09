<?php

namespace Lily\ApiBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Statistique
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Lily\ApiBundle\Entity\LogNotationRepository")
 */
class LogNotation
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
     * @ORM\ManyToOne(targetEntity="Lily\KnowledgeBundle\Entity\Question")
     * @ORM\JoinColumn(nullable=true)
     */
    protected $question;

    /**
     * @var boolean
     *
     * @ORM\Column(name="satisfied", type="boolean", nullable=true)
     */
    protected $satisfied;
    
    /**
     * @var string
     *
     * @ORM\Column(name="reason", type="string", nullable=true)
     */
    protected $reason;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date", type="date")
     */
    protected $date;
    
    /**
     * Constructor
     */
    public function __construct()
    {
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
     * Set satisfied
     *
     * @param boolean $satisfied
     * @return LogNotation
     */
    public function setSatisfied($satisfied)
    {
        $this->satisfied = $satisfied;
    
        return $this;
    }

    /**
     * Get satisfied
     *
     * @return boolean 
     */
    public function getSatisfied()
    {
        return $this->satisfied;
    }

    /**
     * Set date
     *
     * @param \DateTime $date
     * @return Statistique
     */
    public function setDate($date)
    {
        $this->date = $date;
    
        return $this;
    }

    /**
     * Get date
     *
     * @return \DateTime 
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set reason
     *
     * @param string $reason
     * @return LogNotation
     */
    public function setReason($reason)
    {
        $this->reason = $reason;
    
        return $this;
    }

    /**
     * Get reason
     *
     * @return string 
     */
    public function getReason()
    {
        return $this->reason;
    }

    /**
     * Set question
     *
     * @param \Lily\KnowledgeBundle\Entity\Question $question
     * @return LogNotation
     */
    public function setQuestion(\Lily\KnowledgeBundle\Entity\Question $question = null)
    {
        $this->question = $question;
    
        return $this;
    }

    /**
     * Get question
     *
     * @return \Lily\KnowledgeBundle\Entity\Question 
     */
    public function getQuestion()
    {
        return $this->question;
    }
}