<?php

namespace Lily\KnowledgeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Gedmo\Mapping\Annotation as Gedmo;

use Solarium\QueryType\Select\Result\AbstractDocument;

use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * PersonalQuestion
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Lily\KnowledgeBundle\Entity\PersonalQuestionRepository")
 * @ExclusionPolicy("all")
 */
class PersonalQuestion
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Expose
     */
    private $id;
    
        
    /**
     * @ORM\ManyToOne(targetEntity="Lily\KnowledgeBundle\Entity\PersonalCategory", inversedBy="questions", cascade={"persist"})
     * @ORM\JoinColumn(nullable=true, onDelete="SET NULL")
     * @Expose
     */
    protected $category;
    
    /**
     * @ORM\OneToMany(targetEntity="Lily\ApiBundle\Entity\LogRequest", mappedBy="question", cascade={"remove"})
     **/
    private $logRequests;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255)
     * @Expose
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="answer", type="string", length=255)
     * @Expose
     */
    private $answer;

    /**
     * @var string
     *
     * @ORM\Column(name="mood", type="string", length=10)
     * @Expose
     */
    private $mood;
    
    /**
     * @var \DateTime
     *
     * @Gedmo\Timestampable(on="update")
     * @ORM\Column(name="date", type="datetime")
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

    /**
     * Set title
     *
     * @param string $title
     * @return PersonalQuestion
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
     * Set answer
     *
     * @param string $answer
     * @return PersonalQuestion
     */
    public function setAnswer($answer)
    {
        $this->answer = $answer;
    
        return $this;
    }

    /**
     * Get answer
     *
     * @return string 
     */
    public function getAnswer()
    {
        return $this->answer;
    }

    /**
     * Set mood
     *
     * @param string $mood
     * @return PersonalQuestion
     */
    public function setMood($mood)
    {
        $this->mood = $mood;
    
        return $this;
    }

    /**
     * Get mood
     *
     * @return string 
     */
    public function getMood()
    {
        return $this->mood;
    }

    /**
     * Set requests
     *
     * @param integer $requests
     * @return PersonalQuestion
     */
    public function setRequests($requests)
    {
        $this->requests = $requests;
    
        return $this;
    }
    
    /**
     * Set date
     *
     * @param \DateTime $date
     * @return QuestionPersonnelle
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
     * Add logRequests
     *
     * @param \Lily\ApiBundle\Entity\LogRequest $logRequests
     * @return PersonalQuestion
     */
    public function addLogRequest(\Lily\ApiBundle\Entity\LogRequest $logRequests)
    {
        $this->logRequests[] = $logRequests;
    
        return $this;
    }

    /**
     * Remove logRequests
     *
     * @param \Lily\ApiBundle\Entity\LogRequest $logRequests
     */
    public function removeLogRequest(\Lily\ApiBundle\Entity\LogRequest $logRequests)
    {
        $this->logRequests->removeElement($logRequests);
    }

    /**
     * Get logRequests
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getLogRequests()
    {
        return $this->logRequests;
    }
    
    public function toSolrDocument(AbstractDocument $doc)
	{
    $doc->id          = $this->getId();
    $doc->title	      = $this->getTitle();
    $doc->answer      = $this->getAnswer();

    return $doc;
	}
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->logRequests = new \Doctrine\Common\Collections\ArrayCollection();
    }
    
}