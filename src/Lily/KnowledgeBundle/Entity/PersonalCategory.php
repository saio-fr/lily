<?php

namespace Lily\KnowledgeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation\Exclude;

/**
 * PersonalCategory
 *
 * @ORM\Table()
 * @ORM\Entity
 */
class PersonalCategory
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"list", "unique"})
     */
    protected $id;
    
    /**
     * @ORM\OneToMany(targetEntity="Lily\KnowledgeBundle\Entity\Question", mappedBy="parent", cascade={"remove"})
     * @Groups({"unique"})
     **/
    protected $children;
    
    /**
     * @ORM\ManyToOne(targetEntity="Lily\KnowledgeBundle\Entity\Question", inversedBy="children")
     **/
    protected $parent;
    
    /**
     * @ORM\OneToMany(targetEntity="Lily\KnowledgeBundle\Entity\PersonalQuestion", mappedBy="category")
     * @Exclude
     */
    protected $questions;
	
    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=50)
     * @Groups({"list", "unique"})
     */
    protected $title;

    /**
     * @var string
     *
     * @ORM\Column(name="color", type="string", length=7)
     * @Groups({"list", "unique"})
     */
    protected $color;


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
     * Set color
     *
     * @param string $color
     * @return Category
     */
    public function setColor($color)
    {
        $this->color = $color;
    
        return $this;
    }

    /**
     * Get color
     *
     * @return string 
     */
    public function getColor()
    {
        return $this->color;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->questions = new \Doctrine\Common\Collections\ArrayCollection();
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
     * @param \Lily\KnowledgeBundle\Entity\Question $parent
     * @return Category
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