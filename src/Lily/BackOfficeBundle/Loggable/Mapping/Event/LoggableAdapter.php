<?php

namespace Lily\BackOfficeBundle\Loggable\Mapping\Event;

use Gedmo\Loggable\Mapping\Event\LoggableAdapter as GedmoLoggableAdapter;

/**
 * Doctrine event adapter interface
 * for Loggable behavior
 *
 * @author Gediminas Morkevicius <gediminas.morkevicius@gmail.com>
 * @license MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
interface LoggableAdapter extends GedmoLoggableAdapter
{
    /**
     * Get default LogEntry class used to store the logs
     *
     * @return string
     */
    function getDefaultLogEntryClass();

    /**
     * Checks whether an id should be generated post insert
     *
     * @return boolean
     */
    function isPostInsertGenerator($meta);

    /**
     * Get new version number
     *
     * @param object $meta
     * @param object $object
     * @return integer
     */
    function getNewVersion($meta, $object);
}
