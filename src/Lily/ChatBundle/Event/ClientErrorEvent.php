<?php
namespace Lily\ChatBundle\Event;

class ClientErrorEvent extends ClientEvent
{
    protected $e;

    public function setException(\Exception $e)
    {
        $this->e = $e;
    }

    /**
     * @return \Exception
     */
    public function getException()
    {
        return $this->e;
    }
}