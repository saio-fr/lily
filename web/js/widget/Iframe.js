/* jshint strict: false */
/* global _, saio, xdm, Events */

var Iframe = (function() {

  return _.extend(xdm, Events, {

    createIframe: function(options) {
      var $iframe = document.createElement('iframe');

      this.setAttributes($iframe, options);
      this.setInlineStyle($iframe, options.styles);
      return $iframe;
    },

    createWidget: function(options) {
      var $widget = document.createElement('div');

      $widget.setAttribute('id', options.frameId);
      $widget.innerHTML = options.html;
      this.setInlineStyle($widget, options.styles);
      return $widget;
    },

    createContainer: function(options) {
      var $container = document.createElement('div');

      $container.setAttribute('id', options.containerId);
      this.setInlineStyle($container, options.styles);
      return $container;
    },

    insertIframe: function(iframe, options) {
      return document.getElementById(options.containerId).appendChild(iframe);
    },

    insertInBody: function(element) {
      saio.hostBody.appendChild(element);
    },

    hide: function() {
      this.setInlineStyle(this.el, 'display', 'none');
      window.focus();
    },

    show: function() {
      this.removeInlineStyle('display');
    },

    setAttributes: function(element, attributes) {
      _.each(attributes, function(value, attribute) {
        element.setAttribute(attribute, value);
      });
    },

    setInlineStyle: function(el, property, value) {
      var stylesObj = {},
          style = el.style;

      // Single property
      if (_.isString(property)) {
        stylesObj[property] = value;
      } else { // Object with one or more properties
        stylesObj = property;
      }

      // IE > 9
      if ('setProperty' in style) {
        _.each(stylesObj, function(value, property) {
          style.setProperty(property, '' + value, 'important');
        }) ;
      } else {
        _setInlineStyleCompat(el, stylesObj);
      }
    },

    removeInlineStyle: function(property) {
      var style = this.el.style;
      if ('removeProperty' in style) {
        style.removeProperty(property);
      } else {
        _removeInlineStyleCompat(property);
      }
    },

  });

  function _setInlineStyleCompat(el, stylesObj) {
    var props = [];
    _.each(stylesObj, function(value, property) {
      props.push(property + ':' + value + ' !important');
    });

    el.style.cssText = props.join(';');
  }

  function _removeInlineStyleCompat() {
    this._setInlineStyleCompat({});
  }

}());
