<?php

namespace Lily\KnowledgeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Solarium\QueryType\Select\Result\AbstractDocument;

use Gedmo\Mapping\Annotation as Gedmo;

use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\Groups;

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
     * @var integer
     *
     * @ORM\Column(name="requests", type="integer")
     * @Expose
     */
    private $requests;
    
    /**
     * @var \DateTime
     *
     * @Gedmo\Timestampable(on="update")
     * @ORM\Column(name="date", type="date")
     * @Expose
     */
    private $date;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }
    
    public function toSolrDocument(AbstractDocument $doc)
	{
    $doc->id          = $this->getId();
    $doc->title		  = $this->getTitle();

    return $doc;
	}

    /**
     * Set titre
     *
     * @param string $title
     * @return UnasweredQuestion
     */
    public function setTitle($title)
    {
        $this->title = $title;
    
        return $this;
    }

    /**
     * Get titre
     *
     * @return string 
     */
    public function getTitre()
    {
        return $this->titre;
    }

    /**
     * Set requests
     *
     * @param integer $requests
     * @return UnasweredQuestion
     */
    public function setRequests($requests)
    {
        $this->requests = $requests;
    
        return $this;
    }

    /**
     * Get requests
     *
     * @return integer 
     */
    public function getRequests()
    {
        return $this->requests;
    }
    
    /**
     * Set date
     *
     * @param \DateTime $date
     * @return Question
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
     * Get title
     *
     * @return string 
     */
    public function getTitle()
    {
        return $this->title;
    }
}