<?php

namespace Lily\UserBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class AvatarType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
      
        $builder
            ->add('avatarFile', 'vich_file', array(
              'required'      => false,
              'mapping'       => 'user_avatar',
              'allow_delete'  => true,
              'download_link' => true,
            ));
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Lily\UserBundle\Entity\UserConfig',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'lily_userbundle_userconfig';
    }
}
