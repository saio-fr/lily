<?php

namespace Lily\UserBundle\Form;

use Lily\UserBundle\Form\UserGroupType;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class UserAdminType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
      
        $builder
            ->add('lastname')
            ->add('firstname')
            ->add('post')
            ->add('country')
            ->add('phone')
            ->add('email')
            ->add('plainPassword')
            ->add('roles', 'collection', array(
                'type' => 'text',
                'allow_add' => true,
                'allow_delete' => true))
            ->add('config', new AvatarType())
            ->add('groups', 'entity', array(
                'class' => 'LilyUserBundle:UserGroup',
                'property' => 'id',
                'multiple' => true,
                'expanded' => true))
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Lily\UserBundle\Entity\User',
            'allow_extra_fields' => true,
            'csrf_protection'   => false
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'lily_userbundle_useradmin';
    }
}
