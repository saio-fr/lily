<?php

namespace Lily\AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Connection
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Lily\AppBundle\Entity\LogConnectionRepository")
 */
class LogConnection
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
     * @var string
     *
     * @ORM\Column(name="session", type="string", length=255)
     */
    protected $session;
    
    /**
     * @var boolean
     *
     * @ORM\Column(name="widgetUsed", type="boolean")
     */
    protected $widgetUsed;

    /**
     * @var boolean
     *
     * @ORM\Column(name="widgetDisplayed", type="boolean")
     */
    protected $widgetDisplayed;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date", type="datetime")
     */
    protected $date;

    /**
     * @var string
     *
     * @ORM\Column(name="media", type="string", length=6)
     */
    protected $media;

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
     * Set session
     *
     * @param string $session
     *
     * @return LogConnection
     */
    public function setSession($session)
    {
        $this->session = $session;

        return $this;
    }

    /**
     * Get session
     *
     * @return string
     */
    public function getSession()
    {
        return $this->session;
    }

    /**
     * Set widgetUsed
     *
     * @param boolean $widgetUsed
     *
     * @return LogConnection
     */
    public function setWidgetUsed($widgetUsed)
    {
        $this->widgetUsed = $widgetUsed;

        return $this;
    }

    /**
     * Get widgetUsed
     *
     * @return boolean
     */
    public function getWidgetUsed()
    {
        return $this->widgetUsed;
    }

    /**
     * Set widgetDisplayed
     *
     * @param boolean $widgetDisplayed
     *
     * @return LogConnection
     */
    public function setWidgetDisplayed($widgetDisplayed)
    {
        $this->widgetDisplayed = $widgetDisplayed;

        return $this;
    }

    /**
     * Get widgetDisplayed
     *
     * @return boolean
     */
    public function getWidgetDisplayed()
    {
        return $this->widgetDisplayed;
    }

    /**
     * Set date
     *
     * @param \DateTime $date
     *
     * @return LogConnection
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
     *
     * @return LogConnection
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
}
