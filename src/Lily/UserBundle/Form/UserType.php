<?php

namespace Lily\UserBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class UserType extends AbstractType
{
        /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        if(isset($options['adminModif']) && $options['adminModif']===true) {
            $builder
                ->add('lastname', 'text', Array('label' => 'Nom'))
                ->add('firstname', 'text', Array('label' => 'Prénom'))
                ->add('username', 'text', Array('label' => 'Login'))
                /*->add('plainPassword', 'repeated', array(
                    'type' => 'password',
                    'options' => array(
                    'first_options' => array('label' => 'Mot de passe'),
                    'second_options' => array('label' => 'Confirmer le mot de passe'),
                    'invalid_message' => 'Les mots de passes ne sont pas les mêmes',
                ))*/
                ->add('email', 'email', Array('label' => 'Email'))
                ->add('roles', 'choices', Array('label' => 'Droits',
                    'choices'=> array('ROLE_ADMIN'=>'Administrateur',
                                        'ROLE_CHAT_OPERATOR'=>'Live chat',
                                        'ROLE_KNOWLEDGE_OPERATOR'=>'Base de connaissances')))
                ->add('phone', 'text', Array('label' => 'Téléphone'))
                ->add('post', 'text', Array('label' => 'Poste'))
                ->add('country', 'text', Array('label' => 'Pays'))
                ->add('avatar', 'text', Array('label' => 'Avatar'))
                ;
        } else {
            $builder
                ->add('email')
                ->add('phone')
                ->add('post')
                ->add('country');
        }
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Lily\UserBundle\Entity\User',
            'adminModif'=>false,
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'lily_userbundle_user';
    }
}
