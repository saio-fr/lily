<?php

namespace Lily\BackOfficeBundle\Service;

use \Segment as Segment;

class AnalyticsService {

  /**
   * Init the service provider
   *
   * @return void
   */
    public function __construct($enabled, $key) {
        $this->enabled = $enabled;
        $this->key = $key;
    }

    public function track($id, $event, $properties = null) {
        if ($this->enabled && $this->key) {

            Segment::Init($this->key);

            Segment::track(array(
                'userId' => $id,
                'event'  => $event
            ));

            Segment::flush();
        }
        return;
    }

    public function identify($user) {
        if ($this->enabled && $this->key) {

            Segment::Init($this->key);

            Segment::identify(array(
                'userId' => $user->getId(),
                'traits' => array(
                  '$first_name' => $user->getFirstName(),
                  '$last_name'  => $user->getLastName(),
                  '$email'      => $user->getEmail(),
                  'client'      => $user->getClient()->getName()
                )
            ));
        }
    }
}
