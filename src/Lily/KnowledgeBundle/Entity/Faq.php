<?php

namespace Lily\KnowledgeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

use Gedmo\Mapping\Annotation as Gedmo;

/**
 * Faq
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Lily\KnowledgeBundle\Entity\FaqRepository")
 * @ExclusionPolicy("all")
 * @Gedmo\Loggable(logEntryClass="Lily\BackOfficeBundle\Loggable\Entity\LogEntry")
 */
class Faq
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
     * @ORM\ManyToOne(targetEntity="Lily\KnowledgeBundle\Entity\Faq", inversedBy="children")
     * @ORM\JoinColumn(nullable=true)
     **/
    private $parent;
    
    /**
     * @ORM\OneToMany(targetEntity="Lily\KnowledgeBundle\Entity\Faq", mappedBy="parent", cascade={"remove"})
     **/
    private $children;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255, nullable=true)
     * @Expose
     * @Gedmo\Versioned
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="content", type="string", length=1000, nullable=true)
     * @Expose
     * @Gedmo\Versioned
     */
    private $content;
    
    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=10)
     * @Expose
     */
    private $type;
    
    /**
     * @Gedmo\SortablePosition
     * @ORM\Column(name="position", type="integer")
     * @Expose
     */
    private $position;
    
    /**
     * @ORM\OneToMany(targetEntity="Lily\AppBundle\Entity\LogRequest", mappedBy="faq", cascade={"remove"})
     **/
    protected $logRequests;

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
     * @return Faq
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
     * Set content
     *
     * @param string $content
     * @return Faq
     */
    public function setContent($content)
    {
        $this->content = $content;
    
        return $this;
    }

    /**
     * Get content
     *
     * @return string 
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * Constructor
     */
    public function __construct()
    {
    }
    
    /**
     * Set type
     *
     * @param string $type
     * @return Faq
     */
    public function setType($type)
    {
        $this->type = $type;
    
        return $this;
    }

    /**
     * Get type
     *
     * @return string 
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set parent
     *
     * @param \Lily\KnowledgeBundle\Entity\Faq $parent
     * @return Faq
     */
    public function setParent(\Lily\KnowledgeBundle\Entity\Faq $parent = null)
    {
        $this->parent = $parent;
    
        return $this;
    }

    /**
     * Get parent
     *
     * @return \Lily\KnowledgeBundle\Entity\Faq 
     */
    public function getParent()
    {
        return $this->parent;
    }

    /**
     * Set position
     *
     * @param integer $position
     * @return Faq
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
     * Add children
     *
     * @param \Lily\KnowledgeBundle\Entity\Faq $children
     * @return Faq
     */
    public function addChildren(\Lily\KnowledgeBundle\Entity\Faq $children)
    {
        $this->children[] = $children;
    
        return $this;
    }

    /**
     * Remove children
     *
     * @param \Lily\KnowledgeBundle\Entity\Faq $children
     */
    public function removeChildren(\Lily\KnowledgeBundle\Entity\Faq $children)
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
     * Add children
     *
     * @param \Lily\KnowledgeBundle\Entity\Faq $children
     * @return Faq
     */
    public function addChild(\Lily\KnowledgeBundle\Entity\Faq $children)
    {
        $this->children[] = $children;

        return $this;
    }

    /**
     * Remove children
     *
     * @param \Lily\KnowledgeBundle\Entity\Faq $children
     */
    public function removeChild(\Lily\KnowledgeBundle\Entity\Faq $children)
    {
        $this->children->removeElement($children);
    }

    /**
     * Add logRequests
     *
     * @param \Lily\AppBundle\Entity\LogRequest $logRequests
     * @return Faq
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
}
