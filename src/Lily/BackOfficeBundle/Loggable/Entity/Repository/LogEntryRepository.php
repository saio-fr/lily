<?php

namespace Lily\BackOfficeBundle\Loggable\Entity\Repository;

use Gedmo\Tool\Wrapper\EntityWrapper;
use Doctrine\ORM\EntityRepository;
use Lily\BackOfficeBundle\Loggable\LoggableListener;

/**
 * The LogEntryRepository has some useful functions
 * to interact with log entries.
 *
 * @author Gediminas Morkevicius <gediminas.morkevicius@gmail.com>
 * @license MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
class LogEntryRepository extends EntityRepository
{
    /**
     * Currently used loggable listener
     *
     * @var LoggableListener
     */
    private $listener;
    
    /**
     * Loads user's logs between 2 dates
     *
     */
    public function getLogs($username, $start, $end)
    {
    	  $qb = $this->createQueryBuilder('l');
    	
        // UNIX_TIMESTAMP is a personalized dql function, calling the correspondant sql function
        $qb->where('l.username = :username')
           ->setParameter('username', $username)
           ->andWhere('UNIX_TIMESTAMP(l.loggedAt) >= :start')
           ->setParameter('start', $start)
           ->andWhere('UNIX_TIMESTAMP(l.loggedAt) < :end')
           ->setParameter('end', $end)
           ->orderBy('l.loggedAt', 'DESC');

        return $qb->getQuery()->getResult();
    }

    /**
     * Loads all log entries for the
     * given $entity
     *
     * @param object $entity
     * @return array
     */
    public function getLogEntries($entity)
    {
        $q = $this->getLogEntriesQuery($entity);
        return $q->getResult();
    }

    /**
     * Get the query for loading of log entries
     *
     * @param object $entity
     * @return Query
     */
    public function getLogEntriesQuery($entity)
    {
        $wrapped = new EntityWrapper($entity, $this->_em);
        $objectClass = $wrapped->getMetadata()->name;
        $meta = $this->getClassMetadata();
        $dql = "SELECT log FROM {$meta->name} log";
        $dql .= " WHERE log.objectId = :objectId";
        $dql .= " AND log.objectClass = :objectClass";
        $dql .= " ORDER BY log.version DESC";

        $objectId = $wrapped->getIdentifier();
        $q = $this->_em->createQuery($dql);
        $q->setParameters(compact('objectId', 'objectClass'));
        return $q;
    }

    /**
     * Reverts given $entity to $revision by
     * restoring all fields from that $revision.
     * After this operation you will need to
     * persist and flush the $entity.
     *
     * @param object $entity
     * @param integer $version
     * @throws \Gedmo\Exception\UnexpectedValueException
     * @return void
     */
    public function revert($entity, $version = 1)
    {
        $wrapped = new EntityWrapper($entity, $this->_em);
        $objectMeta = $wrapped->getMetadata();
        $objectClass = $objectMeta->name;
        $meta = $this->getClassMetadata();
        $dql = "SELECT log FROM {$meta->name} log";
        $dql .= " WHERE log.objectId = :objectId";
        $dql .= " AND log.objectClass = :objectClass";
        $dql .= " AND log.version <= :version";
        $dql .= " ORDER BY log.version ASC";

        $objectId = $wrapped->getIdentifier();
        $q = $this->_em->createQuery($dql);
        $q->setParameters(compact('objectId', 'objectClass', 'version'));
        $logs = $q->getResult();

        if ($logs) {
            $config = $this->getLoggableListener()->getConfiguration($this->_em, $objectMeta->name);
            $fields = $config['versioned'];
            $filled = false;
            while (($log = array_pop($logs)) && !$filled) {
                if ($data = $log->getData()) {
                    foreach ($data as $field => $value) {
                        if (in_array($field, $fields)) {
                            if ($objectMeta->isSingleValuedAssociation($field)) {
                                $mapping = $objectMeta->getAssociationMapping($field);
                                $value = $value ? $this->_em->getReference($mapping['targetEntity'], $value) : null;
                            }
                            $wrapped->setPropertyValue($field, $value);
                            unset($fields[array_search($field, $fields)]);
                        }
                    }
                }
                $filled = count($fields) === 0;
            }
        } else {
            throw new \Gedmo\Exception\UnexpectedValueException('Could not find any log entries under version: '.$version);
        }
    }

    /**
     * Get the currently used LoggableListener
     *
     * @throws \Gedmo\Exception\RuntimeException - if listener is not found
     * @return LoggableListener
     */
    private function getLoggableListener()
    {
        if (is_null($this->listener)) {
            foreach ($this->_em->getEventManager()->getListeners() as $event => $listeners) {
                foreach ($listeners as $hash => $listener) {
                    if ($listener instanceof LoggableListener) {
                        $this->listener = $listener;
                        break;
                    }
                }
                if ($this->listener) {
                    break;
                }
            }

            if (is_null($this->listener)) {
                throw new \Gedmo\Exception\RuntimeException('The loggable listener could not be found');
            }
        }
        return $this->listener;
    }
}
