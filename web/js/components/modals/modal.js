/*======================================
          MODAL CATEGORIES
=======================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
      Backbone = require('backbone'),
      Bootstrap = require('bootstrap'),

    // Object wrapper returned as a module
    ModalView;


  ModalView = Backbone.View.extend({

    attributes: {
      'tabindex': -1,
      'aria-labelledby': 'close',
      'aria-hidden': 'true'
    },

    className: 'modal',

    open: function(options, callback) {

      var that = this,
          $el = this.$el;

      this.options = _.extend({
        allowCancel: true,
        removeOnClose: true
      }, options);

      $el.one('shown.bs.modal', function(ev) {
        if (ev.target !== ev.currentTarget) return;

        //Adjust the modal and backdrop z-index; for dealing with multiple modals
        var modals = $('.modal'),
            numBackdrops = $('.modal-backdrop').length - 1,
            numModals = modals.length,
            $backdrop = $('.modal-backdrop:eq(' + numBackdrops + ')'),
            backdropIndex = parseInt($backdrop.css('z-index'), 10),
            elIndex = parseInt($backdrop.css('z-index'), 10);

        $backdrop.css('z-index', backdropIndex + 30 * numModals);
        that.$el.css('z-index', elIndex + 30 * numModals + 1);
      });

      //Create it (and show it, ofc)
      $el.modal(_.extend({
        keyboard: this.options.allowCancel,
        backdrop: this.options.allowCancel ? true : 'static',
      }, this.options));

      $(document).on('keyup.dismiss.modal', function(e) {
        if (e.which === 27) {
          that.close();
        }
      });

      $el.one('hidden.bs.modal', function onHidden(e) {
        // Ignore events propagated from interior objects, like bootstrap tooltips
        if (e.target !== e.currentTarget) {
          return $el.one('hidden', onHidden);
        }

        $el.off('shown.bs.modal');

        if (that.options.removeOnClose) {
          that.remove();
        }

        that.trigger('hidden');
      });

      function countIsShown(elems) {
        var count = 0;
        _.forEach(elems, function(elem) {
          if ($(elem).is(':visible')) {
            count++;
          }
        });

        return count;
      }
    },

    close: function() {
      var $el = this.$el;

      //Check if the modal should stay open
      if (this._preventClose) {
        this._preventClose = false;
        return;
      }

      $el.modal('hide');
    }
  });

  return ModalView;
});
