
define(function (require) {

  'use strict';

  // Object wrapper returned as a module

 return {
  goTo: function (view, transition, reverse, callback) {
    /* Déclenche les transitions entre pages */

    var previous = this.currentPage || null,
        next = view;

    if (previous) {
      reverse = previous.nextTransition.reverse;
      transition = previous.nextTransition.transition;

      //Get last transition information if exists
      if(previous.nextTransition.type) {
        if(previous.nextTransition.reverse) {
          reverse = true;
        }
        transition = previous.nextTransition.type;
      }

      previous.transitionOut(transition, reverse);
    }

    next.render({ page: true });
    next.transitionIn(previous, transition, reverse, callback);
    this.currentPage = next;
  },

  buttonCallback: function() {
    $('.lily-bt-menu').on('click', function(){
      if( snapper.state().state === "left" ){
        snapper.close();
      } else {
        snapper.open('left');
      }
    });
  }

};

});


