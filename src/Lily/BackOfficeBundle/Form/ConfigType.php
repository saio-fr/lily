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
            ->add('faq')
            ->add('topQuestions')
            ->add('home')
            ->add('maintenance')
			->add('chat',new ChatType())
			->add('avi',new AviType())
			->add('redirections',new RedirectionsType())
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
