<?php

namespace Lily\UserBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * User
 *
 * @ORM\Table()
 * @ExclusionPolicy("all")
 * @ORM\Entity(repositoryClass="Lily\UserBundle\Entity\UserRepository")
 * @UniqueEntity(fields={"username"}, message="Ce nom d'utilisateur existe déjà.")
 * @UniqueEntity(fields={"email"}, message="Cet email est déjà utilisé.")
 */
class User extends BaseUser
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
     * @ORM\ManyToOne(targetEntity="Lily\ClientBundle\Entity\Client", inversedBy="users")
     */
    private $client;
    
    /**
     * @var string
     *
     * @ORM\Column(name="lastname", type="string", length=30, nullable=true)
     * @Assert\Length(
     *      max = "30",
     *      maxMessage = "La valeur ne peux excéder {{ limit }} caractères"
     * )
     * @Assert\NotBlank()
     * @Expose
     */
    private $lastname;
    
    /**
     * @var string
     *
     * @ORM\Column(name="firstname", type="string", length=30, nullable=true)
     * @Assert\Length(
     *      max = "30",
     *      maxMessage = "La valeur ne peux excéder {{ limit }} caractères"
     * )
     * @Assert\NotBlank()
     * @Expose
     */
    private $firstname;
    
    /**
     * @var string
     *
     * @ORM\Column(name="phone", type="string", length=20, nullable=true)
     * @Assert\Length(
     *      min = "10",
     *      max = "20",
     *      minMessage = "La valeur doit faire au moins {{ limit }} caractères",
     *      maxMessage = "La valeur ne peux excéder {{ limit }} caractères"
     * )
     * @Expose
     */
    private $phone;
    
    /**
     * @var string
     *
     * @ORM\Column(name="post", type="string", length=50, nullable=true)
     * @Assert\Length(
     *      max = "50",
     *      maxMessage = "La valeur ne peux excéder {{ limit }} caractères"
     * )
     * @Expose
     */
    private $post;
    
    /**
     * @var string
     *
     * @ORM\Column(name="welcomeMsg", type="string", length=200, nullable=true)
     */
    private $welcomeMsg;
    
    /**
     * @var string
     *
     * @ORM\ManyToMany(targetEntity="Lily\UserBundle\Entity\Service", cascade={"persist"})
     * @Expose
     */
    private $services;
    
    /**
     * @var string
     *
     * @ORM\Column(name="country", type="string", length=50, nullable=true)
     * @Assert\Length(
     *      max = "50",
     *      maxMessage = "La valeur ne peux excéder {{ limit }} caractères"
     * )
     * @Expose
     */
    private $country;
    
    /**
     * @var string
     *
     * @ORM\Column(name="avatar", type="string", length=150, nullable=true)
     * @Expose
     */
    private $avatar;

    /**
     * @Assert\Image
     */
    private $avatarFile;

    private $tmpId;
    
    // Nom du fichier avatar temporaire (stocké dans /tmp/)
    private $tmpAvatar;
    
    /**
     * @Assert\Email()
     * @Assert\NotBlank()
     */
    protected $email;

    /**
     * @Assert\NotBlank()
     */
    protected $username;

    public function __construct()
    {
        parent::__construct();
        // Logique de construction
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
     * Set client
     *
     * @param \Lily\ClientBundle\Entity\Client $client
     * @return User
     */
    public function setClient(\Lily\ClientBundle\Entity\Client $client)
    {
        $this->client = $client;
    
        return $this;
    }

    /**
     * Get client
     *
     * @return \Lily\ClientBundle\Entity\Client 
     */
    public function getClient()
    {
        return $this->client;
    }

    /**
     * Set phone
     *
     * @param string $phone
     * @return User
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
     * Set post
     *
     * @param string $post
     * @return User
     */
    public function setPost($post)
    {
        $this->post = $post;
    
        return $this;
    }

    /**
     * Get post
     *
     * @return string 
     */
    public function getPost()
    {
        return $this->post;
    }

    /**
    * Add services
    *
    * @param Lily\UserBundle\Entity\Service $services
    */
    public function addService(\Lily\UserBundle\Entity\Service $service)
    {
        $this->services[] = $service;
    }

    /**
    * Remove services
    *
    * @param Lily\UserBundle\Entity\Service $services
    */
    public function removeService(\Lily\UserBundle\Entity\Service $service)
    {
        $this->services->removeElement($service);
    }

    /**
    * Get services
    *
    * @return Doctrine\Common\Collections\Collection
    */
    public function getServices()
    {
        return $this->services;
    }

    /**
     * Set country
     *
     * @param string $country
     * @return User
     */
    public function setCountry($country)
    {
        $this->country = $country;
    
        return $this;
    }

    /**
     * Get country
     *
     * @return string 
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * Set lastname
     *
     * @param string $lastname
     * @return User
     */
    public function setLastname($lastname)
    {
        $this->lastname = $lastname;
    
        return $this;
    }

    /**
     * Get lastname
     *
     * @return string 
     */
    public function getLastname()
    {
        return $this->lastname;
    }

    /**
     * Set firstname
     *
     * @param string $firstname
     * @return User
     */
    public function setFirstname($firstname)
    {
        $this->firstname = $firstname;
    
        return $this;
    }

    /**
     * Get firstname
     *
     * @return string 
     */
    public function getFirstname()
    {
        return $this->firstname;
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
     * Set avatarFile
     *
     * @param UploadedFile $avatarFile
     * @return User
     */
    public function setAvatarFile($avatarFile)
    {
        $this->avatarFile = $avatarFile;
    
        return $this;
    }

    /**
     * Get avatarFile
     *
     * @return string 
     */
    public function getAvatarFile()
    {
        return $this->avatarFile;
    }

    /**
     * Set tmpAvatar
     *
     * @param string $tmpAvatar
     * @return User
     */
    public function setTmpAvatar($tmpAvatar)
    {
        $this->tmpAvatar = $tmpAvatar;
    
        return $this;
    }

    /**
     * Get tmpAvatar
     *
     * @return string 
     */
    public function getTmpAvatar()
    {
        return $this->tmpAvatar;
    }

    /**
    * @ORM\PreRemove()
    */
    public function preRemoveUploadedFiles()
    {
        // On sauvegarde temporairement l'id dont dépend le nom du fichier
        $this->tmpId = $this->id;
    }

    /**
    * @ORM\PostRemove()
    */
    public function removeUploadedFiles()
    {

    }


    public static function getUploadDir($client)
    {
        // On retourne le chemin relatif vers l'image pour un navigateur
        return 'customer/' . $client->getLicence() . '/images/avatars/';
    }

    public static function getTmpUploadDir($client)
    {
        return 'customer/' . $client->getLicence() . '/images/avatars/tmp/';
    }

    public static function getUploadRootDir($client)
    {
        // On retourne le chemin relatif vers l'image pour notre code PHP
        return 'cdn.saio.fr/' . User::getUploadDir($client);
    }

    public static function getTmpUploadRootDir($client)
    {
        return 'cdn.saio.fr/' . User::getTmpUploadDir($client);
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
}