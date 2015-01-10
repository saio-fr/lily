<?php

namespace Lily\UserBundle\Entity;

use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation as JMS;

use FOS\UserBundle\Model\Group as BaseGroup;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table()
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
     * @var string
     *
     * @ORM\Column(name="color", type="string", length=10)
     * @Expose
     */
    protected $color;
    
    public function __construct()
    {       
        $this->color = "#4c5566";
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
}
