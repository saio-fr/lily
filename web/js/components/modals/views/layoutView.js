/*======================================
          MODAL LAYOUT
=======================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
      Backbone = require('backbone'),
      Bootstrap = require('bootstrap'),

    // Object wrapper returned as a module
    ModalLayoutView;


  ModalLayoutView = Backbone.View.extend({

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
            $backdrop = $('.modal-backdrop:eq(' + numBackdrops + ')');

        var maxIndex = _.reduce(modals, function(index, modal) {
          return $(modal).css('z-index') > index ? $(modal).css('z-index') : index;
        }, 1030);

        $backdrop.css('z-index', parseInt(maxIndex, 10) + 30);
        that.$el.css('z-index', parseInt(maxIndex, 10) + 31);
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

  return ModalLayoutView;
});
