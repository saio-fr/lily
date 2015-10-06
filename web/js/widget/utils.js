module.exports = {
  ////////////////////
  //    Utils
  ////////////////////

  // Those theoretically have no business in app.js
  // Should be in a "mixins.js" or "helpers.js" , or "utils.js" file anyway
  // (that could extend underscore btw)
  // See https://trello.com/c/Okxuesk4/75-abstract-utils-helpers-mixins-in-a-separate-file-not-app-js
  onAnimEnd: function(jqueryEl, callback, args, context) {
    var cont = context || window;
    if (config.supportAnimations) { // Browser support for onEndAnim event
      jqueryEl.on(config.animEndEventName, function() {
        if (_.isFunction(callback)) {
          callback.call(cont, args);
        }

        jqueryEl.off(config.animEndEventName);
      });
    } else {
      if (_.isFunction(callback)) {
        setTimeout(function() {
          callback.call(cont, args);
        }, 300);

        // Arbitrary value... Shouldn't happen though,
        //cause saio compatible browsers all support css animations/transitions
      }
    }
  },

  onTransEnd: function(jqueryEl, callback, args, context) {
    var cont = context || window;
    if (config.supportTransitions) { // Browser support for onEndAnim event
      jqueryEl.on(config.transEndEventName, function() {
        if (_.isFunction(callback)) {
          callback.call(cont, args);
        }

        jqueryEl.off(config.transEndEventName);
      });
    } else {
      if (_.isFunction(callback)) {
        setTimeout(function() {
          callback.call(cont, args);
        }, 300);

        // Arbitrary value... Shouldn't happen though,
        //cause saio compatible browsers all support css animations/transitions
      }
    }
  }
};
