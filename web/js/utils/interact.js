define(function (require) {

  'use strict';

  // Object wrapper returned as a module
  var _ = require('underscore'),
      app = require('app'),
      interact = require('interact'),
      Utils = require('utils/default'),

      Interact = {};

  _.extend(Interact, Utils);

  Interact.draggableQuestion = function () {
    
    var dragger = document.querySelector('.dragger');
    var list = document.querySelector('.js-questions-list');
    
    interact('li', {
      context: document.querySelector('.js-questions-list')
    })
    .draggable({
      
      onmove: function (event) {
        
        var  target = event.target,
          // keep the dragged position in the data-x/data-y attributes
          x = (parseFloat(dragger.getAttribute('data-x')) || event.x0 - 1) + event.dx,
          y = (parseFloat(dragger.getAttribute('data-y')) || event.y0 - 1) + event.dy,
          selected = list.querySelectorAll('input[type="checkbox"]:checked');
  
        target.querySelector('.checkbox input').checked = true;
  
        dragger.classList.remove('hide');
        dragger.innerHTML = (selected.length) ? 'Déplacement de ' + selected.length + ' questions'
          : 'Déplacement de 1 question';
  
        // translate the element
        dragger.style.webkitTransform =
        dragger.style.transform =
          'translate(' + x + 'px, ' + y + 'px)';
  
        // update the posiion attributes
        dragger.setAttribute('data-x', x);
        dragger.setAttribute('data-y', y);
      },
      
      onend: function (event) {
        dragger.removeAttribute('data-x');
        dragger.removeAttribute('data-y');
        dragger.classList.add('hide');
        
        var checked = list.querySelectorAll('.checkbox input:checked');
        [].forEach.call(checked, function(el) {
          console.log(el);
          el.checked = false;
        });
      }    
    });
  }
  
  Interact.dropzoneCategories = function () {

    interact('li', {
      context: document.querySelector('.js-categories-list')
    }).dropzone({

      // listen for drop related events:
      ondragenter: function (event) {
        // feedback the possibility of a drop
        event.target.classList.add('drop-target');
        event.relatedTarget.classList.add('can-drop');
      },
      ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');
      },
      ondrop: function (event) {
        app.trigger('categories:set:parent');
        app.trigger('questions:set:category');
      }
    });
  }
     
  Interact.resizeNavigator = function () {
    
    interact('.app-navigator')
    .resizable(true)
    .on('resizemove', function (event) {
      var target = event.target;
      
      if (parseFloat(target.style.width) + event.dx >= 220) {
        // add the change in coords to the previous width of the target element
        var newWidth  = parseFloat(target.style.width ) + event.dx;
    
        // update the element's style
        target.style.width  = newWidth + 'px'; 
      }
    });    
  }
  
  Interact.resizeList = function () {

    interact('.aside-divider')
    .resizable(true)
    .on('resizemove', function (event) {
      var target = event.target,
        edit = document.querySelector('.js-question-edit'),
        list = document.querySelector('.js-skeleton-list');

      if (!list.style.width) {
        list.setAttribute('style','width:' + list.offsetWidth + 'px');
      }
      
      if (parseFloat(list.style.width) + event.dx >= 220 && edit.offsetWidth - event.dx > 300) {
        // add the change in coords to the previous width of the target element
        var newWidth  = parseFloat(list.style.width ) + event.dx;
      }
  
      // update the element's style
      list.style.width = newWidth + 'px';
    });    
  }

  return Interact;
});