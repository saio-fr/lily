<?php

namespace Lily\ApiBundle\Entity;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\ResultSetMapping;

/**
 * ConnectionRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class LogConnectionRepository extends EntityRepository
{
	public function uniqueVisitors($from, $to, $intervalSize) {
		
		//NB : Since DQL does not allow subrequest, we have to use native SQL.
        $rsm = new ResultSetMapping;
        $rsm->addScalarResult("visitors", "value");
		
		$selectedFields="visitors";
        $groupBy="";
        if($intervalSize!==null) {
            $rsm->addScalarResult("intervalId", "intervalId");
            $selectedFields.=",  ROUND(date/(:intervalSizeInHours)) AS intervalId";
            $groupBy=" GROUP BY intervalId";
        }

        $sql='SELECT ' . $selectedFields . ' FROM ((
                SELECT COUNT(distinct c.session) AS visitors, ROUND(UNIX_TIMESTAMP(c.date) / 3600) AS date
                    FROM LogConnection c
                    WHERE UNIX_TIMESTAMP(c.date) >= :from
                      AND UNIX_TIMESTAMP(c.date) < :to
                    GROUP BY date)
                as T)
            ' . $groupBy;

        $query = $this->_em->createNativeQuery($sql, $rsm);
        $query->setParameter('from', $from);
        $query->setParameter('to', $to);

        if($intervalSize!==null) {
            $intervalSizeInHours=$intervalSize/3600;
            $query->setParameter('intervalSizeInHours', $intervalSizeInHours);
            return $query->getResult();
        } else {
            return $query->getSingleScalarResult() ?: 0;
        }		          
	}
}
