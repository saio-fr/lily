<?php
namespace Lily\MediaBundle\Uploader;

use Vich\UploaderBundle\Mapping\PropertyMapping;
use Vich\UploaderBundle\Naming\DirectoryNamerInterface;

/**
 * NamerClass.
 *
 */
Class DirectoryNamer implements DirectoryNamerInterface
{
    /**
     * Creates a directory name for the file being uploaded.
     *
     * @param object          $object  The object the upload is attached to.
     * @param Propertymapping $mapping The mapping to use to manipulate the given object.
     *
     * @return string The directory name.
     */
    public function directoryName($object, PropertyMapping $mapping) {
        $licence = $object->getUser()->getClient()->getLicence();
        return '/customer/'.$licence.'/images/avatars';
    }
}