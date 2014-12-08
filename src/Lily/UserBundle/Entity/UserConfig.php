<?php

namespace Lily\UserBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

use Symfony\Component\HttpFoundation\File\File;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 * UserConfig
 *
 * @ORM\Table()
 * @ORM\Entity()
 * @Vich\Uploadable
 */
class UserConfig
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
     * @ORM\Column(name="welcomeMsg", type="string", length=200, nullable=true)
     */
    protected $welcomeMsg;
    
    /**
     * @ORM\OneToOne(targetEntity="Lily\UserBundle\Entity\User", mappedBy="config")
     */
    protected $user;
 
    
    /**
     * @var string
     *
     * @ORM\Column(name="avatar", type="string", length=150, nullable=true)
     * @Expose
     */
    protected $avatar;

    /**
     * @var File
     * @Vich\UploadableField(mapping="user_avatar", fileNameProperty="avatar")
     */
    protected $avatarFile;
    
     /**
     * @ORM\Column(type="datetime")
     *
     * @var \DateTime $updatedAt
     */
    protected $updatedAt;
    
    public function __construct()
    {       
        $this->welcomeMsg = "Bonjour. Que puis-je faire pour vous ?";
        $this->avatar = "default.png";
        $this->updatedAt = new \DateTime('now');
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
     * Set welcomeMsg
     *
     * @param string $welcomeMsg
     * @return User
     */
    public function setWelcomeMsg($welcomeMsg)
    {
        $this->welcomeMsg = $welcomeMsg;

        return $this;
    }

    /**
     * Get welcomeMsg
     *
     * @return string 
     */
    public function getWelcomeMsg()
    {
        return $this->welcomeMsg;
    }
    
    /**
     * @param File|\Symfony\Component\HttpFoundation\File\UploadedFile $file
     */
    public function setAvatarFile(File $file = null)
    {
        $this->avatarFile = $file;

        if ($file) {
            // It is required that at least one field changes if you are using doctrine
            // otherwise the event listeners won't be called and the file is lost
            $this->updatedAt = new \DateTime('now');

        }
    }

    /**
     * @return File
     */
    public function getAvatarFile()
    {
        return $this->avatarFile;
    }

    /**
     * Set avatar
     *
     * @param string $avatar
     * @return User
     */
    public function setAvatar($avatar)
    {
        $this->avatar = $avatar;

        return $this;
    }

    /**
     * Get avatar
     *
     * @return string 
     */
    public function getAvatar()
    {
        return $this->avatar;
    }


    /**
     * Set updatedAt
     *
     * @param \DateTime $updatedAt
     * @return UserConfig
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt
     *
     * @return \DateTime 
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * Set user
     *
     * @param \Lily\UserBundle\Entity\User $user
     * @return UserConfig
     */
    public function setUser(\Lily\UserBundle\Entity\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \Lily\UserBundle\Entity\User 
     */
    public function getUser()
    {
        return $this->user;
    }
}
