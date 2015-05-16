<?php

namespace Lily\KnowledgeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use JMS\Serializer\Annotation AS JMS;
use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation\Exclude;

/**
 * AlternativeQuestion
 *
 * @ORM\Table()
 * @ORM\Entity
 */
class AlternativeQuestion
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
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255)
     * @Groups({"list"})
     */
    private $title;

    /**
     * @ORM\ManyToOne(targetEntity="Lily\KnowledgeBundle\Entity\Question", inversedBy="alternatives")
     **/
    protected $question;

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
     *
     * @return AlternativeQuestion
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
     * Set question
     *
     * @param \Lily\KnowledgeBundle\Entity\Question $question
     *
     * @return AlternativeQuestion
     */
    public function setQuestion(\Lily\KnowledgeBundle\Entity\Question $question = null)
    {
        $this->question = $question;

        return $this;
    }

    /**
     * Get question
     *
     * @return \Lily\KnowledgeBundle\Entity\Question
     */
    public function getQuestion()
    {
        return $this->question;
    }
}
