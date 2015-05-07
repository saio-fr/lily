<?php

namespace Lily\AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * LogRedirection
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Lily\AppBundle\Entity\LogRedirectionRepository")
 */
class LogRedirection
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
     * @var \DateTime
     *
     * @ORM\Column(name="date", type="datetime")
     */
    protected $date;

    /**
     * @var string
     *
     * @ORM\Column(name="media", type="string", length=7)
     */
    protected $media;
    
    /**
     * @var string
     *
     * @ORM\Column(name="canal", type="string", length=7)
     */
    protected $canal;

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
     * Set date
     *
     * @param \DateTime $date
     * @return LogRedirection
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
     * Set media
     *
     * @param string $media
     * @return LogRedirection
     */
    public function setMedia($media)
    {
        $this->media = $media;

        return $this;
    }

    /**
     * Get media
     *
     * @return string 
     */
    public function getMedia()
    {
        return $this->media;
    }

    /**
     * Set canal
     *
     * @param string $canal
     * @return LogRedirection
     */
    public function setCanal($canal)
    {
        $this->canal = $canal;

        return $this;
    }

    /**
     * Get canal
     *
     * @return string 
     */
    public function getCanal()
    {
        return $this->canal;
    }
}
