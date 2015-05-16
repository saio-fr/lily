<?php

namespace Lily\KnowledgeBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

use Lily\KnowledgeBundle\Form\QuestionType;

class CategoryType extends AbstractType
{
        /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title')
            ->add('parent', 'entity', array (
                'class' => 'LilyKnowledgeBundle:Category',
                'property' => 'id',
                'multiple' => false))
            ->add('questions', 'entity', array(
                'class' => 'LilyKnowledgeBundle:Question',
                'property' => 'id',
                'multiple' => true))
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Lily\KnowledgeBundle\Entity\Category',
            'allow_extra_fields' => true,
            'csrf_protection' => false,
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'lily_Knowledgebundle_category';
    }
}
