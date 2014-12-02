<?php

namespace Lily\BackOfficeBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ConfigAviRedirectionsType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('chat')
            ->add('mail')
            ->add('phone')
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Lily\BackOfficeBundle\Entity\ConfigAviRedirections'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'lily_backofficebundle_configaviredirections';
    }
}
