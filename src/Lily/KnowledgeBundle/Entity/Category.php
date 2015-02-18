<?php

namespace Lily\KnowledgeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use JMS\Serializer\Annotation as Serializer;

/**
 * Category
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Lily\KnowledgeBundle\Entity\CategoryRepository")
 *
 * @Serializer\ExclusionPolicy("all")
 */
class Category
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     * @Serializer\Expose
     * @Serializer\Groups({"categories", "list"})
     */
    protected $id;
    
    /**
     * @ORM\OneToMany(targetEntity="Lily\KnowledgeBundle\Entity\Category", 
     *    mappedBy="parent", cascade={"remove", "persist"})
     *
     * @Serializer\Expose
     * @Serializer\Groups({"categories"})
     **/
    protected $children;
    
    /**
     * @ORM\ManyToOne(targetEntity="Lily\KnowledgeBundle\Entity\Category", 
     *    inversedBy="children", cascade={"persist"})
     *
     * @Serializer\Expose
     * @Serializer\Groups({"categories"})
     **/
    protected $parent;
    
    /**
     * @ORM\OneToMany(targetEntity="Lily\KnowledgeBundle\Entity\Question", 
     *    mappedBy="category", cascade={"persist"})
     *
     * @Serializer\MaxDepth(1)
     * @Serializer\Expose
     * @Serializer\Groups({"categories"})
     */
    protected $questions;
	
    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=50)
     *
     * @Serializer\Expose
     * @Serializer\Groups({"categories", "list"})
     */
    protected $title;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->questions = new \Doctrine\Common\Collections\ArrayCollection();
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
     * @return Category
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
     * Add questions
     *
     * @param \Lily\KnowledgeBundle\Entity\Question $questions
     * @return Category
     */
    public function addQuestion(\Lily\KnowledgeBundle\Entity\Question $questions)
    {
        $this->questions[] = $questions;
        $questions->setCategory(this);
    
        return $this;
    }

    /**
     * Remove questions
     *
     * @param \Lily\KnowledgeBundle\Entity\Question $questions
     */
    public function removeQuestion(\Lily\KnowledgeBundle\Entity\Question $questions)
    {
        $this->questions->removeElement($questions);
    }

    /**
     * Get questions
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getQuestions()
    {
        return $this->questions;
    }

    /**
     * Add children
     *
     * @param \Lily\KnowledgeBundle\Entity\Question $children
     * @return Category
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
     * @param \Lily\KnowledgeBundle\Entity\Category $parent
     * @return Category
     */
    public function setParent(\Lily\KnowledgeBundle\Entity\Category $parent = null)
    {
        $this->parent = $parent;
    
        return $this;
    }

    /**
     * Get parent
     *
     * @return \Lily\KnowledgeBundle\Entity\Category 
     */
    public function getParent()
    {
        return $this->parent;
    }
}