<?php

namespace Lily\UserBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class UserProfilType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
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
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'lily_userbundle_userprofil';
    }
}
