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
            ->add('questionType')
            ->add('answerType')
            ->add('position')
            ->add('mood')
            ->add('category', 'entity', array(
                'class' => 'LilyKnowledgeBundle:Category',
                'property' => 'id',
                'empty_data'  => null))
        ;
        
        if (--$options['recursionLevel'] > 0) {
            $builder
                ->add('children', 'collection', array(
                    'type' => new QuestionType(),
                    'allow_add' => true,
                    'allow_delete' => true,
                    'by_reference' => false,
                    'options' => [
                        'recursionLevel' => $options['recursionLevel']
                    ],

                ));
        }
        
        
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Lily\KnowledgeBundle\Entity\Question',
            'csrf_protection' => false,
            'allow_extra_fields' => true,
            'recursionLevel' => 10
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
