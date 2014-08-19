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
    * Set current page
    */
    public function setCurrentPage(Conn $conn, $params, $clients)
    {	    	
        foreach ($clients as $item) {
			if ($item->id === $conn->Session->getId()) { 
				$item->pages[] = $params['url'];
			}
		}
		
		return array('result' => $url);		
    }
    
   /**
    * Set asked question to the avatar
    */
    public function newAviQuestion(Conn $conn, $params, $clients)
    {	    	
        foreach ($clients as $item) {
			if ($item->id === $conn->Session->getId()) { 
				$item->questions[] = $params['question'];
			}
		}
		
		return array('result' => $oarams);		
    }
    
   /**
    * Update the personal informations of the visitior
    */
    public function updateInformations(Conn $conn, $params, $clients)
    {	    	
        foreach ($clients as $item) {
			if ($item->id === $params['sid']) { 
				$item->firstname = $params['firstname'];
				$item->lastname = $params['lastname'];
				$item->email = $params['email'];
			}
		}
		
		return array('result' => $params);		
    }
    
        
   /**
    * Open the conversation with the visitor
    */
    public function open(Conn $conn, $params, $clients)
    {	    	
        foreach ($clients as $item) {
			if ($item->id === $conn->Session->getId()) {
				 
				$item->closed = false;
								
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
				 
				$item->operator = null;
				$item->lastMsgTime = time();
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