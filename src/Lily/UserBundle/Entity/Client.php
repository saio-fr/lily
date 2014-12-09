<?php

namespace Lily\UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * Client
 *
 * @ORM\Entity
 * @UniqueEntity(fields = {"name"})
 */
class Client
{
	
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\OneToMany(targetEntity="Lily\UserBundle\Entity\User", mappedBy="client", cascade={"persist", "remove"})
     */
    protected $users;

    /**
     * @ORM\OneToOne(targetEntity="Lily\UserBundle\Entity\ClientConfig", cascade={"persist", "remove"})
     */
    protected $config;
    
    /**
     * @var string
     * @Assert\NotBlank()
     * @ORM\Column(name="name", type="string", length=255)
     */
    protected $name;
    
    /**
     * @var string
     * @ORM\Column(name="logo", type="string", length=255, nullable=true)
     */
    protected $logo;
    
    /**
     * @var string
     * @ORM\Column(name="licence", type="string", length=50)
     */
    protected $licence;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->users = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Set name
     *
     * @param string $name
     * @return Client
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
     * Set logo
     *
     * @param string $logo
     * @return Client
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
     * Set licence
     *
     * @param string $licence
     * @return Client
     */
    public function setLicence($licence)
    {
        $this->licence = $licence;

        return $this;
    }

    /**
     * Get licence
     *
     * @return string 
     */
    public function getLicence()
    {
        return $this->licence;
    }

    /**
     * Add users
     *
     * @param \Lily\UserBundle\Entity\User $users
     * @return Client
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

    /**
     * Set config
     *
     * @param \Lily\UserBundle\Entity\ClientConfig $config
     * @return Client
     */
    public function setConfig(\Lily\UserBundle\Entity\ClientConfig $config = null)
    {
        $this->config = $config;

        return $this;
    }

    /**
     * Get config
     *
     * @return \Lily\UserBundle\Entity\ClientConfig 
     */
    public function getConfig()
    {
        return $this->config;
    }
}
