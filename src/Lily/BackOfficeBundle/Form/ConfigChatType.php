<?php

namespace Lily\BackOfficeBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ConfigChatType extends AbstractType
{
        /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('active')
            ->add('max')
            ->add('queue')
            ->add('maxQueue')
            ->add('autoSetOperator')
            ->add('contactForm')
            ->add('contactFormMsg')
            ->add('contactFirstNameField')
            ->add('contactLastNameField')
            ->add('contactEmailField')
            ->add('contactFormAvoidable')
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Lily\BackOfficeBundle\Entity\ConfigChat',
            'csrf_protection' => false
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'lily_backofficebundle_configchat';
    }
}
