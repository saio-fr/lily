<?php

namespace Lily\KnowledgeBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class QuestionType extends AbstractType
{
	
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
     	
        $builder
            ->add('title')
            ->add('answer')
            ->add('position')
            ->add('mood')
            -add('label')
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Lily\KnowledgeBundle\Entity\Question'
        ));
        
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'lily_Knowledgebundle_question';
    }
}
