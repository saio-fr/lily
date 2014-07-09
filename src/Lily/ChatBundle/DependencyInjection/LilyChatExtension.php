<?php

namespace Lily\ChatBundle\DependencyInjection;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Symfony\Component\DependencyInjection\Loader;

/**
 * This is the class that loads and manages your bundle configuration
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/extension.html}
 */
class LilyChatExtension extends Extension
{
    /**
     * {@inheritDoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        $loader = new Loader\YamlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));
        $loader->load('services.yml');
        
        $config = array();
        foreach ($configs as $subConfig) {
            $config = array_merge($config, $subConfig);
        }
        
        if (isset($config['rpc']) && $config['rpc'])
        {
            $this->setupRPCServices($config['rpc']);
        }

        if (isset($config['topic']) && $config['topic'])
        {
            $this->setupTopicServices($config['topic']);
        }
        
    }
    
    private function setupRPCServices($config)
    {
        $this->container->setParameter('lily_chat.rpc_services', $config);
    }

    private function setupTopicServices($config)
    {
        $this->container->setParameter('lily_chat.topic_services', $config);
    }

    
    
}
