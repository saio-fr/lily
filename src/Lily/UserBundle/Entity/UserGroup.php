<?php

namespace Lily\UserBundle\Entity;

use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

use FOS\UserBundle\Model\Group as BaseGroup;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table()
 * @ORM\AttributeOverrides({
 *     @ORM\AttributeOverride(name="name",
 *          column=@ORM\Column(
 *              name     = "name",
 *              type     = "string",
 *              length   = 255,
 *              unique   = false
 *          )
 *      )
 * })
 *
 * @ExclusionPolicy("all")
 */
class UserGroup extends BaseGroup
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
     
    /**
     * @ORM\ManyToOne(targetEntity="Lily\UserBundle\Entity\Client", inversedBy="groups")
     */
    private $client;
    
    /**
     * @ORM\ManyToMany(targetEntity="Lily\UserBundle\Entity\User", mappedBy="groups", cascade={"persist"})
     */
    private $users;
     
    /**
     * @var string
     *
     * @ORM\Column(name="color", type="string", length=10)
     * @Expose
     */
    protected $color;
    
    public function __construct()
    {       
        $this->color = "#4c5566";
        $this->roles = array();
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
     * Set color
     *
     * @param string $color
     * @return UserGroup
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
     * Set client
     *
     * @param \Lily\UserBundle\Entity\Client $client
     * @return UserGroup
     */
    public function setClient(\Lily\UserBundle\Entity\Client $client = null)
    {
        $this->client = $client;

        return $this;
    }

    /**
     * Get client
     *
     * @return \Lily\UserBundle\Entity\Client 
     */
    public function getClient()
    {
        return $this->client;
    }

    /**
     * Add users
     *
     * @param \Lily\UserBundle\Entity\User $users
     * @return UserGroup
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
