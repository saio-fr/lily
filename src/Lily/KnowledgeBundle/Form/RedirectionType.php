<?php

namespace Lily\KnowledgeBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class RedirectionType extends AbstractType
{
        /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title')
            ->add('mail')
            ->add('object')
            ->add('phone')
            ->add('bydefault')
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Lily\KnowledgeBundle\Entity\Redirection'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'lily_Knowledgebundle_redirection';
    }
}
