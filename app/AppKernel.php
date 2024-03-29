<?php

use Symfony\Component\HttpKernel\Kernel;
use Symfony\Component\Config\Loader\LoaderInterface;

class AppKernel extends Kernel
{
    public function registerBundles()
    {
        $bundles = array(
            new Symfony\Bundle\FrameworkBundle\FrameworkBundle(),
            new Symfony\Bundle\SecurityBundle\SecurityBundle(),
            new Symfony\Bundle\TwigBundle\TwigBundle(),
            new Symfony\Bundle\MonologBundle\MonologBundle(),
            new Symfony\Bundle\SwiftmailerBundle\SwiftmailerBundle(),
            new Symfony\Bundle\AsseticBundle\AsseticBundle(),
            new Doctrine\Bundle\DoctrineBundle\DoctrineBundle(),
            new Sensio\Bundle\FrameworkExtraBundle\SensioFrameworkExtraBundle(),
            new Lily\BackOfficeBundle\LilyBackOfficeBundle(),
            new Lily\AdminBundle\LilyAdminBundle(),
            new Lily\UserBundle\LilyUserBundle(),
            new Lily\AppBundle\LilyAppBundle(),
            new Lily\MediaBundle\LilyMediaBundle(),
            new FOS\UserBundle\FOSUserBundle(),
            new Nelmio\SolariumBundle\NelmioSolariumBundle(),
            new JMS\SerializerBundle\JMSSerializerBundle(),
            new FOS\RestBundle\FOSRestBundle(),
            new JMS\AopBundle\JMSAopBundle(),
            new JMS\SecurityExtraBundle\JMSSecurityExtraBundle(),
            new JMS\DiExtraBundle\JMSDiExtraBundle($this),
            new Stof\DoctrineExtensionsBundle\StofDoctrineExtensionsBundle(),
            new SunCat\MobileDetectBundle\MobileDetectBundle(),
            new Lily\KnowledgeBundle\LilyKnowledgeBundle(),
            new Lily\ChatBundle\LilyChatBundle(),
            new JMS\I18nRoutingBundle\JMSI18nRoutingBundle(),
            new Aequasi\Bundle\CacheBundle\AequasiCacheBundle(),
            new Oneup\FlysystemBundle\OneupFlysystemBundle(),
            new Vich\UploaderBundle\VichUploaderBundle(),
            new Lily\StatisticsBundle\LilyStatisticsBundle(),
        );

        if (in_array($this->getEnvironment(), array('dev', 'test'))) {
            $bundles[] = new Symfony\Bundle\WebProfilerBundle\WebProfilerBundle();
            $bundles[] = new Sensio\Bundle\DistributionBundle\SensioDistributionBundle();
            $bundles[] = new Sensio\Bundle\GeneratorBundle\SensioGeneratorBundle();
        }

        return $bundles;
    }

    public function registerContainerConfiguration(LoaderInterface $loader)
    {
        $loader->load(__DIR__.'/config/config_'.$this->getEnvironment().'.yml');
    }
}
