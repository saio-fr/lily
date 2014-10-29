<?php

namespace Lily\ApiBundle\Entity;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\ResultSetMapping;


/**
 * NotationRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class LogNotationRepository extends EntityRepository
{
	public function satisfied($question) {
		
		$qb = $this->createQueryBuilder('n');
		
		$qb->select('count(n)')
		   ->where('n.question  = :question')
		   ->setParameter('question', $question)
		   ->andWhere('n.satisfied = :true')
		   ->setParameter('true', true);
		
		return $qb->getQuery()
		          ->getSingleScalarResult();
		
	}
	
	public function notations($question) {
		
		$qb = $this->createQueryBuilder('n');
		
		$qb->select('count(n)')
		   ->where('n.question  = :question')
		   ->setParameter('question', $question);
		
		return $qb->getQuery()
		          ->getSingleScalarResult();
		
	}
	
	public function satisfaction($from, $to, $intervalSize, $satisfaction) {
		
		$qb = $this->createQueryBuilder('n');
        
        // UNIX_TIMESTAMP is a personalized dql function, calling the correspondant sql function
        $qb->select('count(n) as value')
           ->where('UNIX_TIMESTAMP(n.date) >= :start')
           ->setParameter('start', $from)
           ->andWhere('UNIX_TIMESTAMP(n.date) < :end')
           ->setParameter('end', $to);
           
        if($satisfaction !== null) {
           $qb->andWhere('n.satisfied < :true')
              ->setParameter('true', $satisfaction);
		}
		
        if($intervalSize!==null) {
           $qb->addSelect('ROUND(UNIX_TIMESTAMP(n.date)/(:intervalSize)) as intervalId')
              ->setParameter('intervalSize', $intervalSize)
              ->groupBy('intervalId');
            return $qb->getQuery()->getResult();
        } else {
            return $qb->getQuery()->getSingleScalarResult() ?: 0;
        }	          
		
	}
	
}
