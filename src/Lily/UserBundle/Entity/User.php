<?php

namespace Lily\UserBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Lily\UserBundle\Entity\UserConfig;

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
 * @ORM\Entity()
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
     * @ORM\ManyToOne(targetEntity="Lily\UserBundle\Entity\Client", inversedBy="users")
     */
    private $client;
    
    /**
     * @ORM\OneToOne(targetEntity="Lily\UserBundle\Entity\UserConfig", inversedBy="user", cascade={"persist", "remove"})
     * @Expose
     */
    private $config;
    
    /**
     * @var string
     *
     * @ORM\Column(name="lastname", type="string", length=30)
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
     * @ORM\Column(name="firstname", type="string", length=30)
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
     * @ORM\Column(name="country", type="string", length=50, nullable=true)
     * @Assert\Length(
     *      max = "50",
     *      maxMessage = "La valeur ne peux excéder {{ limit }} caractères"
     * )
     * @Expose
     */
    private $country;
    
    /**
     * @Assert\Email()
     * @Assert\NotBlank()
     */
    protected $email;

    /**
     * @Assert\NotBlank()
     */
    protected $username;

    /**
     * Constructor
     */
    public function __construct()
    {
        parent::__construct();
        $this->config = new UserConfig();
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
     * Set client
     *
     * @param \Lily\UserBundle\Entity\Client $client
     * @return User
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
     * Set config
     *
     * @param \Lily\UserBundle\Entity\UserConfig $config
     * @return User
     */
    public function setConfig(\Lily\UserBundle\Entity\UserConfig $config = null)
    {
        $this->config = $config;

        return $this;
    }

    /**
     * Get config
     *
     * @return \Lily\UserBundle\Entity\UserConfig 
     */
    public function getConfig()
    {
        return $this->config;
    }

}
