<?php

namespace Lily\KnowledgeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Solarium\QueryType\Select\Result\AbstractDocument;

use Gedmo\Mapping\Annotation as Gedmo;

use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * UnansweredQuestion
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Lily\KnowledgeBundle\Entity\UnansweredQuestionRepository")
 * @ExclusionPolicy("all")
 */
class UnansweredQuestion
{    
    
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @Expose
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255)
     * @Expose
     */
    private $title;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date", type="datetime")
     */
    protected $date;
    
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
     * Set title
     *
     * @param string $title
     *
     * @return UnansweredQuestion
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set date
     *
     * @param \DateTime $date
     *
     * @return UnansweredQuestion
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
}
