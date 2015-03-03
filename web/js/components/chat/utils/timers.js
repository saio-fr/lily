define(function(require) {

  'use strict';

  // Object wrapper returned as a module
  var moment = require('moment'),
      Timers = {};

  Timers.status = function(record, type) {

    // Setting up timer variables
    var now = new moment().unix();
    var start = record.model.get('startTime');
    var last = record.model.get('lastMsgTime');
    var timer, hours, minutes, seconds;

    var messages = record.model.get('messages');

    switch (type) {
      // Timer for chat
      case 'chat':
        timer = moment(Math.abs(now - start + Timers.serverTime) * 1000);
        
        setChatTime();
        break;
      
      // Timer for last msg
      case 'lastMsg':
        timer = moment(Math.abs(now - last  + Timers.serverTime) * 1000);

        // If the visitor waited over 2 minutes for an answer
        if (timer.minutes() >= 2) {
          checkConversationStatus();
        }
        setLastTime();
        break;
    }

    function setChatTime() {
      var time = "";
      
      hours   = timer.hours() - 1;
      minutes = timer.minutes();
      seconds = timer.seconds();

      if (!hours && !minutes) {
        time = seconds + 's';
      } else if (!hours) {
        time = minutes + 'm ' + seconds + 's';
      } else {
        time = hours + 'h ' + minutes + 'm ' + seconds + 's';
      }
      
      record.$el.find('.timer-chat').html(time);
    }

    // Repetitive... Do something better :(
    function setLastTime() {

      minutes = timer.minutes();
      seconds = timer.seconds();

      // Don't show the minutes
      if (!minutes) {
        record.$el.find('.timer-lastmsg').html(seconds);
        return;
      }

      record.$el.find('.timer-lastmsg').html(minutes + ' : ' + seconds);
    }

    function checkConversationStatus() {
      if (!messages.length) { return; }

      if (messages[messages.length - 1].from === 'visitor' &&
        record.model.get('status') !== 'urgent') {
        record.model.set('status', 'urgent');
      }
    }

  };

  Timers.interval = function(record, type) {

    Timers.status(record, type);
    // Handle all records timer
    setInterval(function() {
      Timers.status(record, type);
      // Called every second
    }, 1000);
  };

  return Timers;
});
