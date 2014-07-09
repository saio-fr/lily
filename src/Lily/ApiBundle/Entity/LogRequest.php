<?php

namespace Lily\ApiBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Requete
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Lily\ApiBundle\Entity\LogRequestRepository")
 */
class LogRequest
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
     * @ORM\ManyToOne(targetEntity="Lily\KnowledgeBundle\Entity\Faq")
     * @ORM\JoinColumn(nullable=true)
     */
    protected $faq;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date", type="datetime")
     */
    protected $date;
    
    /**
     * @var string
     *
     * @ORM\Column(name="session", type="string", length=255, nullable=true)
     */
    protected $session;
    
    /**
     * @var string
     *
     * @ORM\Column(name="query", type="string", length=255, nullable=true)
     */
    protected $query;
    
    /**
     * @var string
     *
     * @ORM\Column(name="media", type="string", length=10)
     */
    protected $media;
    
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->date = new \Datetime();
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
     * Set date
     *
     * @param \DateTime $date
     * @return Requete
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
     * Set media
     *
     * @param string $media
     * @return Request
     */
    public function setMedia($media)
    {
        $this->media = $media;
    
        return $this;
    }

    /**
     * Get media
     *
     * @return string 
     */
    public function getMedia()
    {
        return $this->media;
    }

    /**
     * Set question
     *
     * @param \Lily\KnowledgeBundle\Entity\Question $question
     * @return Request
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

    /**
     * Set faq
     *
     * @param \Lily\KnowledgeBundle\Entity\Faq $faq
     * @return Requete
     */
    public function setFaq(\Lily\KnowledgeBundle\Entity\Faq $faq = null)
    {
        $this->faq = $faq;
    
        return $this;
    }

    /**
     * Get faq
     *
     * @return \Lily\KnowledgeBundle\Entity\Faq 
     */
    public function getFaq()
    {
        return $this->faq;
    }

    /**
     * Set session
     *
     * @param string $session
     * @return LogRequest
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
     * Set query
     *
     * @param string $query
     * @return LogRequest
     */
    public function setQuery($query)
    {
        $this->query = $query;
    
        return $this;
    }

    /**
     * Get query
     *
     * @return string 
     */
    public function getQuery()
    {
        return $this->query;
    }
}