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
			
		$qb = $this->createQueryBuilder('c');
        
        // UNIX_TIMESTAMP is a personalized dql function, calling the correspondant sql function
        $qb->select('count(distinct c.session) as value')
           ->andWhere('UNIX_TIMESTAMP(c.date) >= :from')
           ->setParameter('from', $from)
           ->andWhere('UNIX_TIMESTAMP(c.date) < :to')
           ->setParameter('to', $to);

        if($intervalSize!==null) {
           $qb->addSelect('ROUND(UNIX_TIMESTAMP(c.date)/(:intervalSize)) as intervalId')
              ->setParameter('intervalSize', $intervalSize)
              ->groupBy('intervalId');
            return $qb->getQuery()->getResult();
        } else {
            return $qb->getQuery()->getSingleScalarResult() ?: 0;
        }	          
	}
	
	public function computers($from, $to) {
		
		$qb = $this->createQueryBuilder('c');
		
		$qb->select('count(distinct c.session)')
		   ->where('c.date >= :from')
		   ->setParameter('from', $from)
		   ->andWhere('c.date <= :to')
		   ->setParameter('to', $to)
		   ->andWhere('c.media = :media')
		   ->setParameter('media', 'pc');
		
		return $qb->getQuery()
		          ->getSingleScalarResult();
		          
	}
	
	public function tablets($from, $to) {
		
		$qb = $this->createQueryBuilder('c');
		
		$qb->select('count(distinct c.session)')
		   ->where('c.date >= :from')
		   ->setParameter('from', $from)
		   ->andWhere('c.date <= :to')
		   ->setParameter('to', $to)
		   ->andWhere('c.media = :media')
		   ->setParameter('media', 'tablet');
		
		return $qb->getQuery()
		          ->getSingleScalarResult();
		          
	}
	
	public function mobiles($from, $to) {
		
		$qb = $this->createQueryBuilder('c');
		
		$qb->select('count(distinct c.session)')
		   ->where('c.date >= :from')
		   ->setParameter('from', $from)
		   ->andWhere('c.date <= :to')
		   ->setParameter('to', $to)
		   ->andWhere('c.media = :media')
		   ->setParameter('media', 'mobile');
		
		return $qb->getQuery()
		          ->getSingleScalarResult();
		          
	}
	
}
