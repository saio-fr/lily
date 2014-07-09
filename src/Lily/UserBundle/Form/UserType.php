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
<<<<<<< HEAD
        if(isset($options['adminModif']) && $options['adminModif']===true) {
            $builder
                ->add('firstname')
                ->add('lastname')
                ->add('plainPassword', 'repeated', array(
                    'type' => 'password',
                    'options' => array('translation_domain' => 'FOSUserBundle'),
                    'first_options' => array('label' => 'form.new_password'),
                    'second_options' => array('label' => 'form.new_password_confirmation'),
                    'invalid_message' => 'fos_user.password.mismatch',
                ))
                ->add('email')
                ->add('phone')
                ->add('post')
                ->add('country', 'country', array('preferred_choices' => array('FR'), 'empty_value'=>'Choisissez un pays', 'required'=>false))
                ->add('allRoles', 'choice', array('multiple'=>true, 'expanded'=>true, 'choices'=>Array('ROLE_CHAT_OPERATOR'=>'Chat','ROLE_KNOWLEDGE_OPERATOR'=>'Base de connaissance','ROLE_ADMIN'=>'Administration')))
                ;
        } else {
            $builder
                ->add('email')
                ->add('phone')
                ->add('post')
                ->add('country');
        }
=======
        $builder
            ->add('email')
            ->add('phone')
            ->add('post')
            ->add('country')
        ;
>>>>>>> 6d8921e0dc39e704f68ae64b2a215c463843931b
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
<<<<<<< HEAD
            'data_class' => 'Lily\UserBundle\Entity\User',
            'adminModif'=>false
=======
            'data_class' => 'Lily\UserBundle\Entity\User'
>>>>>>> 6d8921e0dc39e704f68ae64b2a215c463843931b
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
