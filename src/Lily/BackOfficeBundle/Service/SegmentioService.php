<?php

namespace Lily\BackOfficeBundle\Service;

use \Segment as Segment;

class SegmentioService extends Segment {

  /**
   * Init the service provider
   *
   * @return void
   */
    public function __construct($enabled, $key) {
        if ($enabled && $key) {
            Segment::Init($key);
        }
    }
}
