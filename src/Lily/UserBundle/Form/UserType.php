<?php

namespace Lily\UserBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class UserType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        if(isset($options['admin']) && $options['admin']) {
            $builder
                ->add('avatar', 'text', Array('label' => 'Avatar'))
                ->add('lastname', 'text', Array('label' => 'Nom'))
                ->add('firstname', 'text', Array('label' => 'Prénom'))
                ->add('post', 'text', Array('label' => 'Poste'))
                ->add('country', 'text', Array('label' => 'Pays'))
                ->add('roles', 'choice', Array('label' => 'Permissions','choices'=> array('ROLE_ADMIN'=>'Administrateur', 'ROLE_CHAT_OPERATOR'=>'Live chat', 'ROLE_KNOWLEDGE_OPERATOR'=>'Base de connaissances'),'multiple'=>true))
                ->add('phone', 'text', Array('label' => 'Téléphone'))
                ->add('email', 'email', Array('label' => 'Adresse e-mail'))
                ->add('username', 'text', Array('label' => 'Login'))
                ->add('plainPassword', 'repeated', array(
                      'type' => 'password',
                      'options' => array('required' => true),
                      'first_options'  => array('label' => 'Mot de passe'),
                      'second_options' => array('label' => 'Confirmer le mot de passe'),
                      'invalid_message' => 'Les mots de passe doivent correspondre',));
                      
        } elseif(isset($options['avatar']) && $options['avatar']) {
            $builder
                ->add('avatar', 'hidden')
                ->add('avatarFile', 'file');
                
        } else {
            $builder
                ->add('avatar', 'text', Array('label' => 'Avatar'))
                ->add('email', 'email', Array('label' => 'Adresse e-mail'))
                ->add('post', 'text', Array('label' => 'Poste'))
                ->add('phone', 'text', Array('label' => 'Téléphone'))
                ->add('country', 'text', Array('label' => 'Pays'))
                ->add('plainPassword', 'repeated', array(
                      'type' => 'password',
                      'options' => array('required' => true),
                      'first_options'  => array('label' => 'Mot de passe'),
                      'second_options' => array('label' => 'Confirmer le mot de passe'),			  
                      'invalid_message' => 'Les mots de passe doivent correspondre',));
        }
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Lily\UserBundle\Entity\User',
            'admin'=>false,
            'avatar'=>false,
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'lily_userbundle_user';
    }
}
