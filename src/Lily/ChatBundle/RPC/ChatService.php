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
				
				$item->operator = $conn->User->getId();
				$item->startChatTime = time();
				$item->messages[] = array('id' => uniqid(), 'from' => 'server', 'date' => time(), 'action' => 'startChat');
				
			}
			// Increase the operator' active chats
			if ($item->id === $conn->User->getId()) {				
				$item->chats += 1;
			}
		}
		
		return array('result' => true);		
    }
    
   /**
    * Ban an visitor for his session time
    */
    public function ban(Conn $conn, $params, $clients)
    {	    	
        foreach ($clients as $item) {
			if ($item->id === $params['sid']) { 
				$item->banned = true;
				$item->messages[] = array('id' => uniqid(), 'from' => 'operator', 'operator' => null, 'date' => time(), 'msg' => "Vous avez été banni du chat par l'opérateur.");
				$item->topic->broadcast($item->messages);	
			}
			// Decrease the operator' active chats
			if ($item->id === $conn->User->getId()) {				
				$item->chats -= 1;
			}
		}
		
		return array('result' => true);		
    }
    
   /**
    * When connect on ws, set current page + check if the visitor is already chatting
    */
    public function connect(Conn $conn, $params, $clients)
    {	    	
        foreach ($clients as $item) {
			if ($item->id === $conn->Session->getId()) { 
				$item->pages[] = array('href' => $params['href'], 'pathname' => $params['pathname']);
				if ($item->closed) $chatting = false;
				else $chatting = true;
				$showContactForm = $item->showContactForm;
			}
		}
		
		return array('chatting' => $chatting, 'showContactForm' => $showContactForm);		
    }
    
   /**
    * Set visitors' contact informations from contact from
    */
    public function contactForm(Conn $conn, $params, $clients)
    {	    	
        foreach ($clients as $item) {
			if ($item->id === $conn->Session->getId()) { 
				$item->firstname = $params['firstname'];
				$item->lastname = $params['lastname'];
				$item->email = $params['email'];
				$item->showContactForm = false;
			}
		}
		
		return array('result' => true);		
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
		
		return array('result' => true);		
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
		
		return array('result' => true);		
    }
    
   /**
    * Change chat's name
    */
    public function changeName(Conn $conn, $params, $clients)
    {	    	
        foreach ($clients as $item) {
			if ($item->id === $params['sid']) { 
				$item->name = $params['name'];
			}
		}
		
		return array('result' => true);		
    }
    
        
   /**
    * Open the conversation with the visitor
    */
    public function open(Conn $conn, $params, $clients, $config)
    {	 
        foreach ($clients as $item) {

			if ($item->type === 'operator' && $item->available && ($item->chats < $config->chatMax)) {

				$availables[] = $item;
								
			}
		}

        foreach ($clients as $item) {

			if ($item->id === $conn->Session->getId()) {
				
				if ($item->operator !== null) {
					$item->topic->broadcast($item->messages);
					return;
				}

				if (!empty($availables) && $config->chatAutoSetOperator) {

					$key = array_rand($availables, 1);
					$availables[$key]->chats += 1;
					
					$operator = array('id' => $availables[$key]->id, 
									  'firstname' => $availables[$key]->firstname, 
									  'avatar' => $availables[$key]->avatar);
									  
					$item->operator = $availables[$key]->id;
					$item->startChatTime = time();
					$item->received += 1;
					$item->messages[] = array('id' => uniqid(), 'from' => 'server', 'date' => time(), 'action' => 'startChat');				
					$item->messages[] = array('id' => uniqid(), 
											  'from' => 'operator', 
											  'operator' => $operator, 
											  'date' => time(), 
											  'msg' => $availables[$key]->welcome);					
				}
				
				$item->topic->broadcast($item->messages);
				$item->closed = false;
																	
			}			
		}

		return array('result' => true);
		
    }
    
   /**
    * Close the conversation with the visitor
    */
    public function close(Conn $conn, $params, $clients)
    {	    	
        foreach ($clients as $item) {
        	// Close the conversation
			if ($item->id === $params['sid']) {
				 
				$item->operator = null;
				$item->lastMsgTime = time();
				$item->closed = true;
				$item->messages[] = array('id' => uniqid(), 'from' => 'operator', 'operator' => null, 'date' => time(), 'msg' => "L'opérateur a clôt la conversation.");
				$item->topic->broadcast($item->messages);	
								
			}
			// Decrease the operator' active chats
			if ($item->id === $conn->User->getId()) {				
				$item->chats -= 1;
			}
		}
		
		return array('result' => true);		
    }
    
   /**
    * Transfer the visitor to another operator
    */
    public function transfer(Conn $conn, $params, $clients)
    {	    	
        foreach ($clients as $item) {
        	// Close the conversation
			if ($item->id === $params['sid']) { 
				$item->operator = $params['operator'];
				$item->transfered = true;
				$item->messages[] = array('id' => uniqid(), 'from' => 'server', 'date' => time(), 'action' => 'transfered', 'transfer_from' => $conn->User->getFirstname() . ' ' . $conn->User->getLastname());
			}
								
			// Decrease the operator' active chats
			if ($item->id === $conn->User->getId()) $item->chats -= 1;
			
			// Increase the new operator' active chats
			if ($item->id === $params['operator']) $item->chats += 1;			
		}
		
		return array('result' => true);		
    }
    
        
   /**
    * Set the operator as unavailable
    */
    public function unavailable(Conn $conn, $params, $clients)
    {	
    	$chats = 0;
    	
        foreach ($clients as $item) {

			if (isset($item->operator) && $item->operator == $conn->User->getId()) {

				$item->operator = null;
				$chats += 1;
			}
		}

		foreach ($clients as $item) {
			if ($item->id === $conn->User->getId()) { 
				$item->available = false;
				$item->chats -= $chats;
			}
		}
		
		return array('result' => true);		
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
		
		return array('result' => true);		
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
    
   /**
    * Set chat satisfaction
    */
    public function satisfaction(Conn $conn, $params, $clients)
    {	    	
        foreach ($clients as $item) {
			if ($item->id === $params['sid']) { 
				$item->satisfaction = $params['satisfaction'];
			}
		}	
		return array('result' => true);		
    }
    
}