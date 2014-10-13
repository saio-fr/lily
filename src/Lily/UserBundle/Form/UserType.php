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
        if(isset($options['adminModif']) && $options['adminModif']) {
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
                ->add('plainPassword', 'repeated', array( 'type' => 'password', 'first_options' => array('label' => 'Mot de passe', 'attr'=>array('autocomplete'=>'off')), 'second_options' => array('label' => 'Confirmer le mot de passe', 'attr'=>array('autocomplete'=>'off')), 'invalid_message' => 'Les mots de passe ne sont pas les mêmes',))
                ;
        } elseif(isset($options['avatarWidget']) && $options['avatarWidget']) {
            $builder
                ->add('avatar', 'hidden')
                ->add('avatarFile', 'file');
        } else {
            $builder
                ->add('email')
                ->add('phone')
                ->add('post')
                ->add('country');
        }
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Lily\UserBundle\Entity\User',
            'adminModif'=>false,
            'avatarWidget'=>false,
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
