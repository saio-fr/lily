<?php

namespace Lily\AppBundle\Entity;

use Doctrine\ORM\EntityRepository;

/**
 * RequeteRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class LogRequestRepository extends EntityRepository
{
	
	public function answered($from, $to, $intervalSize=null) {
		
  		$qb = $this->createQueryBuilder('r');
          
      // UNIX_TIMESTAMP is a personalized dql function, calling the correspondant sql function
      $qb->select('count(r) as value')
         ->where('UNIX_TIMESTAMP(r.date) >= :start')
         ->setParameter('start', $from)
         ->andWhere('UNIX_TIMESTAMP(r.date) < :end')
         ->setParameter('end', $to)
         ->andWhere('r.question is not null');
  
      if ($intervalSize!==null) {
         $qb->addSelect('ROUND(UNIX_TIMESTAMP(r.date)/(:intervalSize)) as intervalId')
            ->setParameter('intervalSize', $intervalSize)
            ->groupBy('intervalId');
          return $qb->getQuery()->getResult();
      } else {
          return $qb->getQuery()->getSingleScalarResult() ?: 0;
      }	
		
	}
	
	public function requests($from, $to, $intervalSize=null) {

  		$qb = $this->createQueryBuilder('r');
          
      // UNIX_TIMESTAMP is a personalized dql function, calling the correspondant sql function
      $qb->select('count(r) as value')
         ->where('UNIX_TIMESTAMP(r.date) >= :start')
         ->setParameter('start', $from)
         ->andWhere('UNIX_TIMESTAMP(r.date) < :end')
         ->setParameter('end', $to);
  
      if($intervalSize!==null) {
         $qb->addSelect('ROUND(UNIX_TIMESTAMP(r.date)/(:intervalSize)) as intervalId')
            ->setParameter('intervalSize', $intervalSize)
            ->groupBy('intervalId');
          return $qb->getQuery()->getResult();
      } else {
          return $qb->getQuery()->getSingleScalarResult() ?: 0;
      }	
		
	}
	
	public function categoryRequests($category) {
		
  		$qb = $this->createQueryBuilder('r');
  		
  		$qb->select('count(r)')
  		   ->leftJoin('r.question', 'q')
  		   ->where('q.category = :category')
  		   ->setParameter('category', $category);
  		
  		return $qb->getQuery()
  		          ->getSingleScalarResult();
		          
	}
	
	public function categoryRate($category) {
		
  		$categoryRate = ($this->categoryRequests() / $this->answered()) * 100;
  		return $categoryRate;
		          
	}
	
	public function uniqueUsers($from, $to, $intervalSize=null) {
		
  		$qb = $this->createQueryBuilder('r');
          
      // UNIX_TIMESTAMP is a personalized dql function, calling the correspondant sql function
      $qb->select('count(distinct r.session) as value')
         ->where('UNIX_TIMESTAMP(r.date) >= :start')
         ->setParameter('start', $from)
         ->andWhere('UNIX_TIMESTAMP(r.date) < :end')
         ->setParameter('end', $to);
  
      if($intervalSize!==null) {
          $qb->addSelect('ROUND(UNIX_TIMESTAMP(r.date)/(:intervalSize)) as intervalId')
             ->setParameter('intervalSize', $intervalSize)
             ->groupBy('intervalId');
          return $qb->getQuery()->getResult();
      } else {
          return $qb->getQuery()->getSingleScalarResult() ?: 0;
      }	           
	}
	
	public function averageUsers($from, $to) {
		
		$averageUsers = $this->requests($from, $to) / $this->uniqueUsers($from, $to);
		
		return $averageUsers;
		          
	}
	
	public function topQuestions($from, $to, $max) {
		
  		$qb = $this->createQueryBuilder('r');
  		
  		$qb->addSelect('count(r.id) AS nbs')
  		   ->leftJoin('r.question', 'q')
  		   ->addSelect('q')
  		   ->where('r.date >= :from')
  		   ->setParameter('from', $from)
  		   ->andWhere('r.date <= :to')
  		   ->setParameter('to', $to)
  		   ->andWhere('r.question IS NOT NULL')
  		   ->groupBy('r.question')
  		   ->orderBy('nbs', 'DESC')
  		   ->setMaxResults($max);
  		   
  		return $qb->getQuery()
  		          ->getResult();
		
	}
	
	public function topCategories($from, $to, $max) {
		
  		$qb = $this->createQueryBuilder('r');
  		
  		$qb->select('count(r.id) AS nbs, c.title')
  		   ->leftJoin('r.question', 'q')
  		   ->leftJoin('q.category', 'c')
  		   ->where('r.date >= :from')
  		   ->setParameter('from', $from)
  		   ->andWhere('r.date <= :to')
  		   ->setParameter('to', $to)
  		   ->andWhere('r.question IS NOT NULL')
  		   ->andWhere('q.category IS NOT NULL')
  		   ->groupBy('q.category')
  		   ->orderBy('nbs', 'DESC')
  		   ->setMaxResults($max);
  		   
  		return $qb->getQuery()
                ->getResult();
		
	}
	
}
