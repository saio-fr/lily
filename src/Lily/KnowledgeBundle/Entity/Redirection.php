<?php

namespace Lily\KnowledgeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation\Exclude;


/**
 * Redirection
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Lily\KnowledgeBundle\Entity\RedirectionRepository")
 * @Gedmo\Loggable(logEntryClass="Lily\BackOfficeBundle\Loggable\Entity\LogEntry")
 */
class Redirection
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;
    
    /**
     * @ORM\OneToMany(targetEntity="Lily\KnowledgeBundle\Entity\Category", mappedBy="redirection")
     * @ORM\JoinColumn(nullable=true)
     * @Exclude
     */
    private $categories;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255)
     * @Gedmo\Versioned
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="mail", type="string", length=255, nullable=true)
     * @Gedmo\Versioned
     */
    private $mail;

    /**
     * @var string
     *
     * @ORM\Column(name="phone", type="string", length=255, nullable=true)
     * @Gedmo\Versioned
     */
    private $phone;
    
    /**
     * @var string
     *
     * @ORM\Column(name="object", type="string", length=255, nullable=true)
     * @Gedmo\Versioned
     */
    private $object;
    
    /**
     * @var boolean
     *
     * @ORM\Column(name="bydefault", type="boolean")
     */
    private $bydefault;
    
    /**
     * @var integer
     *
     * @ORM\Column(name="frequency", type="integer")
     */
    private $frequency;
    
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
     * @return Redirection
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
     * Set mail
     *
     * @param string $mail
     * @return Redirection
     */
    public function setMail($mail)
    {
        $this->mail = $mail;
    
        return $this;
    }

    /**
     * Get mail
     *
     * @return string 
     */
    public function getMail()
    {
        return $this->mail;
    }

    /**
     * Set phone
     *
     * @param string $phone
     * @return Redirection
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;
    
        return $this;
    }

    /**
     * Get phone
     *
     * @return string 
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * Set object
     *
     * @param string $object
     * @return Redirection
     */
    public function setObject($object)
    {
        $this->object = $object;
    
        return $this;
    }

    /**
     * Get object
     *
     * @return string 
     */
    public function getObject()
    {
        return $this->object;
    }

    /**
     * Set bydefault
     *
     * @param boolean $bydefault
     * @return Redirection
     */
    public function setBydefault($bydefault)
    {
        $this->bydefault = $bydefault;
    
        return $this;
    }

    /**
     * Get bydefault
     *
     * @return boolean 
     */
    public function getBydefault()
    {
        return $this->bydefault;
    }

    /**
     * Set category
     *
     * @param \Lily\KnowledgeBundle\Entity\Category $category
     * @return Redirection
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
     * Constructor
     */
    public function __construct()
    {
        $this->categories = new \Doctrine\Common\Collections\ArrayCollection();
    }
    
    /**
     * Add categories
     *
     * @param \Lily\KnowledgeBundle\Entity\Categorie $categories
     * @return Redirection
     */
    public function addCategory(\Lily\KnowledgeBundle\Entity\Category $categories)
    {
        $this->categories[] = $categories;
    
        return $this;
    }

    /**
     * Remove categories
     *
     * @param \Lily\KnowledgeBundle\Entity\Category $categories
     */
    public function removeCategory(\Lily\KnowledgeBundle\Entity\Category $categories)
    {
        $this->categories->removeElement($categories);
    }

    /**
     * Get categories
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getCategories()
    {
        return $this->categories;
    }

    /**
     * Set frequency
     *
     * @param integer $frequency
     * @return Redirection
     */
    public function setFrequency($frequency)
    {
        $this->frequency = $frequency;
    
        return $this;
    }

    /**
     * Get frequency
     *
     * @return integer 
     */
    public function getFrequency()
    {
        return $this->frequency;
    }

    /**
     * Add categories
     *
     * @param \Lily\KnowledgeBundle\Entity\Category $categories
     * @return Redirection
     */
    public function addCategorie(\Lily\KnowledgeBundle\Entity\Category $categories)
    {
        $this->categories[] = $categories;
    
        return $this;
    }

    /**
     * Remove categories
     *
     * @param \Lily\KnowledgeBundle\Entity\Category $categories
     */
    public function removeCategorie(\Lily\KnowledgeBundle\Entity\Category $categories)
    {
        $this->categories->removeElement($categories);
    }
}