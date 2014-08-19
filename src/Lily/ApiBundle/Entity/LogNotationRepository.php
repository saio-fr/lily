<?php

namespace Lily\ApiBundle\Entity;

use Doctrine\ORM\EntityRepository;

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
	
	public function satisfaction($question) {
		
		$satisfaction = ($this->satisfied($question) / $this->notations($question)) * 100;
		return $satisfaction;
				
	}
	
	public function totalSatisfied($from, $to) {
		
		$qb = $this->createQueryBuilder('n');
		
		$qb->select('count(n)')
		   ->where('n.date >= :from')
		   ->setParameter('from', $from)
		   ->andWhere('n.date <= :to')
		   ->setParameter('to', $to)
		   ->andWhere('n.satisfied = :true')
		   ->setParameter('true', true);
		
		return $qb->getQuery()
		          ->getSingleScalarResult();
		
	}
	
	public function totalNotations($from, $to) {
		
		$qb = $this->createQueryBuilder('n');
		
		$qb->select('count(n)')
		   ->where('n.date >= :from')
		   ->setParameter('from', $from)
		   ->andWhere('n.date <= :to')
		   ->setParameter('to', $to);
		
		return $qb->getQuery()
		          ->getSingleScalarResult();
		
	}
	
}
