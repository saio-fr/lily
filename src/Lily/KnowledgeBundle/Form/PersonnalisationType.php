<?php

namespace Lily\KnowledgeBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class PersonnalisationType extends AbstractType
{
        /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('logo')
            ->add('nomAvatar')
            ->add('biographieAvatar')
            ->add('couleurMenu')
            ->add('couleurBarreQuestion')
            ->add('couleurFaq')
            ->add('avatar')
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Lily\KnowledgeBundle\Entity\Personnalisation'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'lily_Knowledgebundle_personnalisation';
    }
}
