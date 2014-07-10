<?php

namespace Lily\KnowledgeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

use Solarium\QueryType\Select\Result\AbstractDocument;

use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation\Exclude;

/**
 * Question
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Lily\KnowledgeBundle\Entity\QuestionRepository")
 * @Gedmo\Loggable(logEntryClass="Lily\BackOfficeBundle\Loggable\Entity\LogEntry")
 */
class Question
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"unique", "list", "precision"})
     */
    protected $id;
    
    /**
     * @ORM\ManyToOne(targetEntity="Lily\KnowledgeBundle\Entity\Category", inversedBy="questions", cascade={"persist"})
     * @ORM\JoinColumn(nullable=true, onDelete="SET NULL")
     * @Groups({"unique", "list"})
     * @Gedmo\Versioned
     */
    protected $category;
    
    /**
     * @ORM\OneToMany(targetEntity="Lily\KnowledgeBundle\Entity\Question", mappedBy="parent", cascade={"remove"})
     * @Groups({"unique"})
     **/
    protected $children;
    
    /**
     * @ORM\OneToMany(targetEntity="Lily\ApiBundle\Entity\LogRequest", mappedBy="question", cascade={"remove"})
     * @Exclude
     **/
    protected $logRequests;
    
    /**
     * @ORM\OneToMany(targetEntity="Lily\ApiBundle\Entity\LogNotation", mappedBy="question", cascade={"remove"})
     * @Exclude
     **/
    protected $logNotation;

    /**
     * @ORM\ManyToOne(targetEntity="Lily\KnowledgeBundle\Entity\Question", inversedBy="children")
     * @Gedmo\Versioned
     **/
    protected $parent;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255)
     * @Groups({"unique", "api", "precision", "list"})
     * @Gedmo\Versioned
     */
    protected $title;

    /**
     * @var string
     *
     * @ORM\Column(name="answer", type="string", length=1000, nullable=true)
     * @Groups({"unique", "api", "answer", "precision"})
     * @Gedmo\Versioned
     */
    protected $answer;
    
    /**
     * @var string
     *
     * @ORM\Column(name="mood", type="string", length=10)
     * @Groups({"unique"})
     * @Gedmo\Versioned
     */
    protected $mood;

    /**
     * @var integer
     *
     * @ORM\Column(name="requests", type="integer")
     * @Groups({"unique", "list"})
     */
    protected $requests;
    
    /**
     * @var integer
     *
     * @ORM\Column(name="position", type="integer", nullable=true)
     * @Groups({"unique", "list"})
     */
    protected $position;
    
    /**
     * @var integer
     *
     * @ORM\Column(name="satisfaction", type="integer", nullable=true)
     * @Groups({"unique", "list"})
     */
    protected $satisfaction;
    
    /**
     * @var \DateTime
     *
     * @Gedmo\Timestampable(on="update")
     * @ORM\Column(name="date", type="datetime")
     * @Groups({"unique", "list"})
     */
    protected $date;
    
    /**
     * @var string
     *
     * @ORM\Column(name="label", type="string", length=10)
     * @Groups({"list"})
     */
    protected $label;
  
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
     * Set titre
     *
     * @param string $title
     * @return Question
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
     * @return Question
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
     * Set requests
     *
     * @param integer $requests
     * @return Question
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
     * Set category
     *
     * @param \Lily\KnowledgeBundle\Entity\Categorie $category
     * @return Question
     */
    public function setCategorie(\Lily\KnowledgeBundle\Entity\Category $category = null)
    {
        $this->category = $category;
    
        return $this;
    }

    /**
     * Get category
     *
     * @return \Lily\KnowledgeBundle\Entity\Category 
     */
    public function getCategory()
    {
        return $this->category;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->children = new \Doctrine\Common\Collections\ArrayCollection();
    }
    
    public function toSolrDocument(AbstractDocument $doc)
	{
    $doc->id         = $this->getId();
    $doc->title		 = $this->getTitle();
    $doc->answer     = $this->getAnswer();

    return $doc;
	}
    
    /**
     * Add children
     *
     * @param \Lily\KnowledgeBundle\Entity\Question $children
     * @return Question
     */
    public function addChildren(\Lily\KnowledgeBundle\Entity\Question $children)
    {
        $this->children[] = $children;
    
        return $this;
    }

    /**
     * Remove children
     *
     * @param \Lily\KnowledgeBundle\Entity\Question $children
     */
    public function removeChildren(\Lily\KnowledgeBundle\Entity\Question $children)
    {
        $this->children->removeElement($children);
    }

    /**
     * Get children
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getChildren()
    {
        return $this->children;
    }

    /**
     * Set parent
     *
     * @param \Lily\KnowledgeBundle\Entity\Question $parent
     * @return Question
     */
    public function setParent(\Lily\KnowledgeBundle\Entity\Question $parent = null)
    {
        $this->parent = $parent;
    
        return $this;
    }

    /**
     * Get parent
     *
     * @return \Lily\KnowledgeBundle\Entity\Question 
     */
    public function getParent()
    {
        return $this->parent;
    }

    /**
     * Set mood
     *
     * @param string $mood
     * @return Question
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
     * Set satisfaction
     *
     * @param integer $satisfaction
     * @return Question
     */
    public function setSatisfaction($satisfaction)
    {
        $this->satisfaction = $satisfaction;
    
        return $this;
    }

    /**
     * Get satisfaction
     *
     * @return integer 
     */
    public function getSatisfaction()
    {
        return $this->satisfaction;
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
     * Set position
     *
     * @param integer $position
     * @return Question
     */
    public function setPosition($position)
    {
        $this->position = $position;
    
        return $this;
    }

    /**
     * Get position
     *
     * @return integer 
     */
    public function getPosition()
    {
        return $this->position;
    }

    /**
     * Add logRequests
     *
     * @param \Lily\ApiBundle\Entity\LogRequete $logRequests
     * @return Question
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

    /**
     * Add logNotation
     *
     * @param \Lily\ApiBundle\Entity\LogNotation $logNotation
     * @return Question
     */
    public function addLogNotation(\Lily\ApiBundle\Entity\LogNotation $logNotation)
    {
        $this->logNotation[] = $logNotation;
    
        return $this;
    }

    /**
     * Remove logNotation
     *
     * @param \Lily\ApiBundle\Entity\LogNotation $logNotation
     */
    public function removeLogNotation(\Lily\ApiBundle\Entity\LogNotation $logNotation)
    {
        $this->logNotation->removeElement($logNotation);
    }

    /**
     * Get logNotation
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getLogNotation()
    {
        return $this->logNotation;
    }

    /**
     * Set category
     *
     * @param \Lily\KnowledgeBundle\Entity\Category $category
     * @return Question
     */
    public function setCategory(\Lily\KnowledgeBundle\Entity\Category $category = null)
    {
        $this->category = $category;
    
        return $this;
    }

    /**
     * Set label
     *
     * @param string $label
     * @return Question
     */
    public function setLabel($label)
    {
        $this->label = $label;
    
        return $this;
    }

    /**
     * Get label
     *
     * @return string 
     */
    public function getLabel()
    {
        return $this->label;
    }
}