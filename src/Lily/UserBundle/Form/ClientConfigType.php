<?php

namespace Lily\UserBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ClientConfigType extends AbstractType
{
        /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('maintenance')
            ->add('chat')
            ->add('avi')
            ->add('faq')
            ->add('topquestions')
            ->add('maxusers')
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Lily\UserBundle\Entity\ClientConfig'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'lily_userbundle_clientconfig';
    }
}