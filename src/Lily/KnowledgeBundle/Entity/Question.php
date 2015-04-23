<?php

namespace Lily\KnowledgeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

use Solarium\QueryType\Select\Result\AbstractDocument;

use JMS\Serializer\Annotation AS JMS;
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
     * @Groups({"list", "app", "categories"})
     */
    protected $id;
    
    /**
     * @ORM\ManyToOne(targetEntity="Lily\KnowledgeBundle\Entity\Category", inversedBy="questions", 
     *    cascade={"persist"})
     * @ORM\JoinColumn(nullable=true, onDelete="SET NULL")
     * @Groups({"list"})
     * @Gedmo\Versioned
     */
    protected $category;
    
    /**
     * @ORM\ManyToMany(targetEntity="Lily\KnowledgeBundle\Entity\Tag", inversedBy="questions", 
     *    cascade={"persist"})
     * @ORM\JoinColumn(nullable=true, onDelete="SET NULL")
     * @Groups({"list"})
     */
    protected $tag;
    
    /**
     * @ORM\OneToMany(targetEntity="Lily\KnowledgeBundle\Entity\Question", mappedBy="parent", 
     *    cascade={"persist", "remove"})
     * @Groups({"list", "app"})
     **/
    protected $children;
    
    /**
     * @ORM\OneToMany(targetEntity="Lily\AppBundle\Entity\LogRequest", mappedBy="question",
     *    cascade={"remove"})
     * @Groups({"logs"})
     **/
    protected $logRequests;
    
    /**
     * @ORM\OneToMany(targetEntity="Lily\AppBundle\Entity\LogNotation", mappedBy="question", 
     *    cascade={"remove"})
     * @Groups({"logs"})
     **/
    protected $logNotations;

    /**
     * @ORM\ManyToOne(targetEntity="Lily\KnowledgeBundle\Entity\Question", inversedBy="children")
     * @Gedmo\Versioned
     * @Groups({"parent"})
     **/
    protected $parent;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255)
     * @Groups({"app", "list"})
     * @Gedmo\Versioned
     */
    protected $title;

    /**
     * @var text
     *
     * @ORM\Column(name="answer", type="string", nullable=true)
     * @Groups({"answer", "app", "list"})
     * @Gedmo\Versioned
     */
    protected $answer;

    /**
     * @var string
     *
     * @ORM\Column(name="questionType", type="string", length=10, nullable=true)
     * @Groups({"app", "list"})
     * @JMS\SerializedName("questionType")
     * @Gedmo\Versioned
     */
    protected $questionType;

    /**
     * @var string
     *
     * @ORM\Column(name="answerType", type="string", length=10, nullable=true)
     * @Groups({"app", "list"})
     * @JMS\SerializedName("answerType")
     * @Gedmo\Versioned
     */
    protected $answerType;
    
    /**
     * @var string
     *
     * @ORM\Column(name="mood", type="string", length=10, nullable=true)
     * @Groups({"list"})
     * @Gedmo\Versioned
     */
    protected $mood;

    /**
     * @var integer
     *
     * @ORM\Column(name="requests", type="integer", nullable=true)
     * @Groups({"list"})
     */
    protected $requests;
    
    /**
     * @var integer
     *
     * @ORM\Column(name="position", type="integer", nullable=true)
     * @Groups({"list"})
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
     * @var string
     *
     * @ORM\Column(name="modifiedBy", type="string", length=100, nullable=true)
     * @Groups({"list"})
     * @JMS\SerializedName("modifiedBy")
     * @Gedmo\Versioned
     */
    protected $modifiedBy;
    
    /**
     * @var \DateTime
     *
     * @Gedmo\Timestampable(on="update")
     * @ORM\Column(name="date", type="datetime")
     * @Groups({"list"})
     */
    protected $date;
    
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->children = new \Doctrine\Common\Collections\ArrayCollection();
        $this->satisfaction = 0;
        $this->requests = 0;
    }
    
    public function toSolrDocument(AbstractDocument $doc)
    {
        $doc->id         = $this->getId();
        $doc->title		 = $this->getTitle();
        $doc->answer     = $this->getAnswer();
    
        return $doc;
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
     * Set questionType
     *
     * @param string $questionType
     * @return Question
     */
    public function setQuestionType($questionType)
    {
        $this->questionType = $questionType;

        return $this;
    }

    /**
     * Get questionType
     *
     * @return string 
     */
    public function getQuestionType()
    {
        return $this->questionType;
    }

    /**
     * Set answerType
     *
     * @param string $answerType
     * @return Question
     */
    public function setAnswerType($answerType)
    {
        $this->answerType = $answerType;

        return $this;
    }

    /**
     * Get answerType
     *
     * @return string 
     */
    public function getAnswerType()
    {
        return $this->answerType;
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
     * Set modifiedBy
     *
     * @param string $modifiedBy
     * @return Question
     */
    public function setModifiedBy($modifiedBy)
    {
        $this->modifiedBy = $modifiedBy;

        return $this;
    }

    /**
     * Get modifiedBy
     *
     * @return string 
     */
    public function getModifiedBy()
    {
        return $this->modifiedBy;
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
     * Get category
     *
     * @return \Lily\KnowledgeBundle\Entity\Category 
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Add tag
     *
     * @param \Lily\KnowledgeBundle\Entity\Tag $tag
     * @return Question
     */
    public function addTag(\Lily\KnowledgeBundle\Entity\Tag $tag)
    {
        $this->tag[] = $tag;

        return $this;
    }

    /**
     * Remove tag
     *
     * @param \Lily\KnowledgeBundle\Entity\Tag $tag
     */
    public function removeTag(\Lily\KnowledgeBundle\Entity\Tag $tag)
    {
        $this->tag->removeElement($tag);
    }

    /**
     * Get tag
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getTag()
    {
        return $this->tag;
    }

    /**
     * Add children
     *
     * @param \Lily\KnowledgeBundle\Entity\Question $children
     * @return Question
     */
    public function addChild(\Lily\KnowledgeBundle\Entity\Question $children)
    {
      
        $children->setParent($this);
        $this->children[] = $children;

        return $this;
    }

    /**
     * Remove children
     *
     * @param \Lily\KnowledgeBundle\Entity\Question $children
     */
    public function removeChild(\Lily\KnowledgeBundle\Entity\Question $children)
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
     * Set children
     *
     * @return Question
     */    
    public function setChildren(\Doctrine\Common\Collections\ArrayCollection $children)
    {
        foreach ($children as $child) {
            $child->setParent($this);
        }
    
        $this->children = $children;
    }

    /**
     * Add logRequests
     *
     * @param \Lily\AppBundle\Entity\LogRequest $logRequests
     * @return Question
     */
    public function addLogRequest(\Lily\AppBundle\Entity\LogRequest $logRequests)
    {
        $this->logRequests[] = $logRequests;

        return $this;
    }

    /**
     * Remove logRequests
     *
     * @param \Lily\AppBundle\Entity\LogRequest $logRequests
     */
    public function removeLogRequest(\Lily\AppBundle\Entity\LogRequest $logRequests)
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
     * Add logNotations
     *
     * @param \Lily\AppBundle\Entity\LogNotation $logNotations
     * @return Question
     */
    public function addLogNotation(\Lily\AppBundle\Entity\LogNotation $logNotations)
    {
        $this->logNotations[] = $logNotations;

        return $this;
    }

    /**
     * Remove logNotations
     *
     * @param \Lily\AppBundle\Entity\LogNotation $logNotations
     */
    public function removeLogNotation(\Lily\AppBundle\Entity\LogNotation $logNotations)
    {
        $this->logNotations->removeElement($logNotations);
    }

    /**
     * Get logNotations
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getLogNotations()
    {
        return $this->logNotations;
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
}
