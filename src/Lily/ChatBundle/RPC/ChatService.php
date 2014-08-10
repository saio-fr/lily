<?php

namespace Lily\ChatBundle\RPC;

use Ratchet\ConnectionInterface as Conn;

class ChatService
{
    protected $container;

    public function setContainer($container)
    {
        $this->container = $container;
    }

    public function getContainer()
    {
        return $this->container;
    }
    
    /**
     * Adds the params together
     *
     * Note: $conn isnt used here, but contains the connection of the person making this request.
     *
     * @param \Ratchet\ConnectionInterface $conn
     * @param array $params
     * @return int
     */     
    public function setOperator(Conn $conn, $params, $clients)
    {	    	
        foreach ($clients as $item) {
			if ($item->id === $params['sid']) { 
				
				$date = new \Datetime();
				$timestamp = $date->getTimestamp();
				
				$item->operator = $conn->User->getId();
				$item->startChatTime = $timestamp;
			}
		}
		
		return array('result' => $params);		
    }
    
    /**
    * Ban an visitor for his session time
    */
    public function ban(Conn $conn, $params, $clients)
    {	    	
        foreach ($clients as $item) {
			if ($item->id === $params['sid']) { 
				$item->banned = true;
			}
		}
		
		return array('result' => $params);		
    }
    
   /**
    * Close the conversation with the visitor
    */
    public function close(Conn $conn, $params, $clients)
    {	    	
        foreach ($clients as $item) {
			if ($item->id === $params['sid']) {
			
				$date = new \Datetime();
				$timestamp = $date->getTimestamp();
				 
				$item->operator = null;
				$item->lastMsgTime = $timestamp;
				$item->closed = true;	
				
			}
		}
		
		return array('result' => $params);		
    }
    
        
   /**
    * Set the operator as unavailable
    */
    public function unavailable(Conn $conn, $params, $clients)
    {	    	
        foreach ($clients as $item) {
			if ($item->id === $conn->User->getId()) { 
				$item->available = false;	
			}
			if ($item->operator == $conn->User->getId()) {
				$item->operator = null;
			}
		}
		
		return array('result' => $params);		
    }
    
   /**
    * Set the operator as available
    */
    public function available(Conn $conn, $params, $clients)
    {	    	
        foreach ($clients as $item) {
			if ($item->id === $conn->User->getId()) { 
				$item->available = true;	
			}
		}
		
		return array('result' => $clients);		
    }
    
   /**
    * Is the operator available ?
    */
    public function isAvailable(Conn $conn, $params, $clients)
    {	    	
        foreach ($clients as $item) {
			if ($item->id === $conn->User->getId()) { 
				if ($item->available == true) { $result = true; }	
				else { $result = false; }
			}
		}		
		return array('result' => $result);		
    }
    
   /**
    * Is we writing ?
    */
    public function writing(Conn $conn, $params, $clients)
    {	    	
        foreach ($clients as $item) {
			if ($item->id === $params['sid']) { 
				$item->writing = $params['writing'];
			}
		}		
		return array('result' => true);		
    }
    
}