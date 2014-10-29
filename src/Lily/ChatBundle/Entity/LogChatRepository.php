<?php

namespace Lily\ChatBundle\Entity;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\ResultSetMapping;

/**
 * LogChatRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class LogChatRepository extends EntityRepository
{
    /**
     * Return the average hourly number of conversation of the operator whose id is $operator, between timestamps $start and $end.
     *
     * If $intervalSize is set, split time in interval of duration $intervalSize seconds and return an array containing 2 elements:
     * - The number of interval
     * - The average hourly number of conversation in the intersection of this interval and the interval [$start; $end]
     * Interval n° 0 correspond to timestamp interval [0; $intervalSize]. Interval n°1 correspond to timestamp interval [$intervalSize+1; 2*$intervalSize], etc.
     * If an average is zero, no element corresponding to the interval is returned in the array.
     *
     * @param int $operator
     * @param string $start
     * @param string $end
     * @param int $intervalSize
     * @return integer|array
     *
     */
    public function hourlyNumberOfConversation($operator, $start, $end, $intervalSize=null) {
        //NB : Since DQL does not allow subrequest, we have to use native SQL.

        $rsm = new ResultSetMapping;
        $rsm->addScalarResult("avgHourlyNumberOfConversations", "value");

        $selectedFields="AVG(hourlyNumberOfConversations) as avgHourlyNumberOfConversations";
        $groupBy="";
        if($intervalSize!==null) {
            $rsm->addScalarResult("intervalId", "intervalId");
            $selectedFields.=",  ROUND(hourId/(:intervalSizeInHours)) AS intervalId";
            $groupBy=" GROUP BY intervalId";
        }

        $sql='SELECT ' . $selectedFields . ' FROM ((
                SELECT COUNT(*) AS hourlyNumberOfConversations, ROUND(UNIX_TIMESTAMP(lc.start) / 3600) AS hourId
                    FROM LogChat lc
                    WHERE lc.operator = :operator
                      AND UNIX_TIMESTAMP(lc.start) >= :start
                      AND UNIX_TIMESTAMP(lc.start) < :end
                    GROUP BY hourId)
                as T)
            ' . $groupBy;

        $query = $this->_em->createNativeQuery($sql, $rsm);
        $query->setParameter('operator', $operator);
        $query->setParameter('start', $start);
        $query->setParameter('end', $end);

        if($intervalSize!==null) {
            $intervalSizeInHours=$intervalSize/3600;
            $query->setParameter('intervalSizeInHours', $intervalSizeInHours);
            return $query->getResult();
        } else {
            return $query->getSingleScalarResult() ?: 0;
        }
    }

    /**
     * Return the average conversation time of the operator whose id is $operator, between timestamps $start and $end.
     *
     * If $intervalSize is set, split time in interval of duration $intervalSize seconds and return an array containing 2 elements:
     * - The number of interval
     * - The average number of conversation in the intersection of this interval and the interval [$start; $end]
     * Interval n° 0 correspond to timestamp interval [0; $intervalSize]. Interval n°1 correspond to timestamp interval [$intervalSize+1; 2*$intervalSize], etc.
     * If an average is zero, no element corresponding to the interval is returned in the array.
     *
     * @param int $operator
     * @param string $start
     * @param string $end
     * @param int $intervalSize
     * @return integer|array
     *
     */
    public function averageConversationTime($operator, $start, $end, $intervalSize=null) {
        $qb = $this->createQueryBuilder('r');
        
        // time_to_sec and timediff are personalized dql function, calling the correspondant sql function
        $qb->select('AVG(TIME_TO_SEC(TIMEDIFF(r.end, r.start))) as value')
           ->where('r.operator = :operator')
           ->setParameter('operator', $operator)
           ->andWhere('UNIX_TIMESTAMP(r.start) >= :start')
           ->setParameter('start', $start)
           ->andWhere('UNIX_TIMESTAMP(r.start) < :end')
           ->setParameter('end', $end);


        if($intervalSize!==null) {
            $qb->addSelect('ROUND(UNIX_TIMESTAMP(r.start)/(:intervalSize)) as intervalId')
               ->setParameter('intervalSize', $intervalSize)
               ->groupBy('intervalId');
            return $qb->getQuery()->getResult();
        } else {
            return $qb->getQuery()->getSingleScalarResult() ?: 0;
        }
    }


    /**
     * Return the average waiting time for operator whose id is $operator, between timestamps $start and $end.
     *
     * If $intervalSize is set, split time in interval of duration $intervalSize seconds and return an array containing 2 elements:
     * - The number of interval
     * - The average number of conversation in the intersection of this interval and the interval [$start; $end]
     * Interval n° 0 correspond to timestamp interval [0; $intervalSize]. Interval n°1 correspond to timestamp interval [$intervalSize+1; 2*$intervalSize], etc.
     * If an average is zero, no element corresponding to the interval is returned in the array.
     *
     * @param int $operator
     * @param string $start
     * @param string $end
     * @param int $intervalSize
     * @return integer|array
     *
     */
    public function averageWaited($operator, $start, $end, $intervalSize=null) {
        $qb = $this->createQueryBuilder('r');
        
        // UNIX_TIMESTAMP is a personalized dql function, calling the correspondant sql function
        $qb->select('avg(r.waited) as value')
           ->where('r.operator = :operator')
           ->setParameter('operator', $operator)
           ->andWhere('UNIX_TIMESTAMP(r.start) >= :start')
           ->setParameter('start', $start)
           ->andWhere('UNIX_TIMESTAMP(r.start) < :end')
           ->setParameter('end', $end);

        if($intervalSize!==null) {
           $qb->addSelect('ROUND(UNIX_TIMESTAMP(r.start)/(:intervalSize)) as intervalId')
              ->setParameter('intervalSize', $intervalSize)
              ->groupBy('intervalId');
            return $qb->getQuery()->getResult();
        } else {
            return $qb->getQuery()->getSingleScalarResult() ?: 0;
        }
    }


    /**
     * Return the average satisfaction for operator whose id is $operator, between timestamps $start and $end.
     *
     * If $intervalSize is set, split time in interval of duration $intervalSize seconds and return an array containing 2 elements:
     * - The number of interval
     * - The average number of conversation in the intersection of this interval and the interval [$start; $end]
     * Interval n° 0 correspond to timestamp interval [0; $intervalSize]. Interval n°1 correspond to timestamp interval [$intervalSize+1; 2*$intervalSize], etc.
     * If an average is zero, no element corresponding to the interval is returned in the array.
     *
     * @param int $operator
     * @param string $start
     * @param string $end
     * @param int $intervalSize
     * @return integer|array
     *
     */
    public function averageSatisfaction($operator, $start, $end, $intervalSize=null) {
        $qb = $this->createQueryBuilder('r');
        
        // UNIX_TIMESTAMP and ROUND are personalized dql functions, calling the correspondant sql functions
        $qb->select('avg(r.satisfaction) as value')
           ->where('r.operator = :operator')
           ->setParameter('operator', $operator)
           ->andWhere('UNIX_TIMESTAMP(r.start) >= :start')
           ->andWhere('r.start IS NOT NULL')
           ->setParameter('start', $start)
           ->andWhere('UNIX_TIMESTAMP(r.start) < :end')
           ->setParameter('end', $end)
           ->andWhere('r.satisfaction IS NOT NULL');

        if($intervalSize!==null) {
            $qb->addSelect('ROUND(UNIX_TIMESTAMP(r.start)/(:intervalSize)) as intervalId')
               ->setParameter('intervalSize', $intervalSize)
               ->groupBy('intervalId');
            return $qb->getQuery()->getResult();
        } else {
            return $qb->getQuery()->getSingleScalarResult() ?: 0;
        }
    }
    
    /**
     * Return the operator' conversations between period of time
     *
     * @param int $operator
     * @param string $start
     * @param string $end
     *
     */
    public function conversations($operator, $start, $end) {
        $qb = $this->createQueryBuilder('r');
        $qb->select('r')
           ->where('r.operator = :operator')
           ->setParameter('operator', $operator)
           ->andWhere('UNIX_TIMESTAMP(r.start) >= :start')
           ->andWhere('r.start IS NOT NULL')
           ->setParameter('start', $start)
           ->andWhere('UNIX_TIMESTAMP(r.start) < :end')
           ->setParameter('end', $end)
		   ->groupBy('r.start');
		   
           return $qb->getQuery()->getResult();
    }
}
