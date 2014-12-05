<?php

namespace Lily\UserBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class UserManagementType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
      
        $builder
            ->add('lastname')
            ->add('firstname')
            ->add('post')
            ->add('country')
            ->add('roles')
            ->add('phone')
            ->add('email')
            ->add('username')
            ->add('plainPassword', 'repeated', array(
					        'type' => 'password',
                  'options' => array('required' => true),
                  'invalid_message' => 'Les mots de passe doivent correspondre',));
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
        return 'lily_userbundle_usermanagement';
    }
}
