<?php

namespace Lily\UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * Entreprise
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Lily\UserBundle\Entity\EnterpriseRepository")
 */
class Enterprise
{
    
    /**
     * @ORM\OneToMany(targetEntity="Lily\UserBundle\Entity\User", mappedBy="enterprise", cascade={"persist"})
     */
    private $users;
	
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;
    
    /**
     * @var string
     *
     * @ORM\Column(name="cname", type="string", length=255)
     */
    private $cname;
    
    /**
     * @var string
     *
     * @ORM\Column(name="logo", type="string", length=255, nullable=true)
     */
    private $logo;
    
    /**
     * @var string
     *
     * @ORM\Column(name="`key`", type="string", length=50)
     */
    private $key;
    
    /**
     * @var boolean
     *
     * @ORM\Column(name="maintenance", type="boolean")
     */
    private $maintenance;
    
    /**
     * @var boolean
     *
     * @ORM\Column(name="chat", type="boolean")
     */
    private $chat;
    
    /**
     * @var boolean
     *
     * @ORM\Column(name="avi", type="boolean")
     */
    private $avi;
    
    /**
     * @var boolean
     *
     * @ORM\Column(name="faq", type="boolean")
     */
    private $faq;
    
    /**
     * @var boolean
     *
     * @ORM\Column(name="topquestions", type="boolean")
     */
    private $topquestions;
    
    /**
     * @var integer
     *
     * @ORM\Column(name="maxusers", type="integer")
     */
    protected $maxusers;
    
    /**
     * @var string
     *
     * @ORM\Column(name="theme", type="string", length=50)
     */
    private $theme;


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
     * Set name
     *
     * @param string $name
     * @return Entreprise
     */
    public function setName($name)
    {
        $this->name = $name;
    
        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
    }

    /**
     * Set logo
     *
     * @param string $logo
     * @return Entreprise
     */
    public function setLogo($logo)
    {
        $this->logo = $logo;
    
        return $this;
    }

    /**
     * Get logo
     *
     * @return string 
     */
    public function getLogo()
    {
        return $this->logo;
    }

    /**
     * Set cname
     *
     * @param string $cname
     * @return Entreprise
     */
    public function setCname($cname)
    {
        $this->cname = $cname;
    
        return $this;
    }

    /**
     * Get cname
     *
     * @return string 
     */
    public function getCname()
    {
        return $this->cname;
    }

    /**
     * Set key
     *
     * @param string $key
     * @return Entreprise
     */
    public function setKey($key)
    {
        $this->key = $key;
    
        return $this;
    }

    /**
     * Get key
     *
     * @return string 
     */
    public function getKey()
    {
        return $this->key;
    }

    /**
     * Set maintenance
     *
     * @param boolean $maintenance
     * @return Entreprise
     */
    public function setMaintenance($maintenance)
    {
        $this->maintenance = $maintenance;
    
        return $this;
    }

    /**
     * Get maintenance
     *
     * @return boolean 
     */
    public function getMaintenance()
    {
        return $this->maintenance;
    }

    /**
     * Set theme
     *
     * @param string $theme
     * @return Entreprise
     */
    public function setTheme($theme)
    {
        $this->theme = $theme;
    
        return $this;
    }

    /**
     * Get theme
     *
     * @return string 
     */
    public function getTheme()
    {
        return $this->theme;
    }

    /**
     * Set chat
     *
     * @param boolean $chat
     * @return Entreprise
     */
    public function setChat($chat)
    {
        $this->chat = $chat;
    
        return $this;
    }

    /**
     * Get chat
     *
     * @return boolean 
     */
    public function getChat()
    {
        return $this->chat;
    }

    /**
     * Set faq
     *
     * @param boolean $faq
     * @return Entreprise
     */
    public function setFaq($faq)
    {
        $this->faq = $faq;
    
        return $this;
    }

    /**
     * Get faq
     *
     * @return boolean 
     */
    public function getFaq()
    {
        return $this->faq;
    }

    /**
     * Set topquestions
     *
     * @param boolean $topquestions
     * @return Entreprise
     */
    public function setTopquestions($topquestions)
    {
        $this->topquestions = $topquestions;
    
        return $this;
    }

    /**
     * Get topquestions
     *
     * @return boolean 
     */
    public function getTopquestions()
    {
        return $this->topquestions;
    }

    /**
     * Set maxusers
     *
     * @param integer $maxusers
     * @return Entreprise
     */
    public function setMaxusers($maxusers)
    {
        $this->maxusers = $maxusers;
    
        return $this;
    }

    /**
     * Get maxusers
     *
     * @return integer 
     */
    public function getMaxusers()
    {
        return $this->maxusers;
    }

    /**
     * Set avi
     *
     * @param boolean $avi
     * @return Enterprise
     */
    public function setAvi($avi)
    {
        $this->avi = $avi;
    
        return $this;
    }

    /**
     * Get avi
     *
     * @return boolean 
     */
    public function getAvi()
    {
        return $this->avi;
    }

    /**
     * Add users
     *
     * @param \Lily\UserBundle\Entity\User $users
     * @return Enterprise
     */
    public function addUser(\Lily\UserBundle\Entity\User $users)
    {
        $this->users[] = $users;
    
        return $this;
    }

    /**
     * Remove users
     *
     * @param \Lily\UserBundle\Entity\User $users
     */
    public function removeUser(\Lily\UserBundle\Entity\User $users)
    {
        $this->users->removeElement($users);
    }

    /**
     * Get users
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getUsers()
    {
        return $this->users;
    }
}