<?php

namespace Lily\BackOfficeBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ConfigType extends AbstractType
{
        /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('chat')
            ->add('chatQueue')
            ->add('chatQueueLimit')
            ->add('avi')
            ->add('aviName')
            ->add('aviWelcomeMsg')
            ->add('aviIfNoOperator')
            ->add('aviAnimations')
            ->add('faq')
            ->add('topQuestions')
            ->add('maintenance')
            ->add('redirectionChat')
            ->add('redirectionMail')
            ->add('redirectionTel')
            ->add('home')
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Lily\BackOfficeBundle\Entity\Config'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'lily_backofficebundle_config';
    }
}
