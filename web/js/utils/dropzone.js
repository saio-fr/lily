define(function (require) {

  'use strict';

  // Object wrapper returned as a module
  var Utils = require('utils/default'),
      Dropzone = require('dropzone'),
      Globals = require('globals'),
      dropzone = {};

  _.extend(dropzone, Utils);
  
  dropzone.avatar = function (object, model) {
    
      var self;
    
      object.dropzone({
        
        maxFilesize: 1,
        maxFiles: 1,
        uploadMultiple: false,
        clickable: ".uploader",
        thumbnailWidth: 100,
        thumbnailHeight: 100,
        autoProcessQueue: false,
        dictDefaultMessage: "",
        previewTemplate: "<div class=\"dz-preview dz-file-preview\"><img data-dz-thumbnail class=\"avatar\" /></div>",
        url: Globals.root + model.id + "/avatar",
        
        init: function() {

          var uri = model.get('converted_avatar');      
          var avatar = { name: "avatar", type: 'image/jpg' };
          
          this.addFile.call(this, avatar);
          this.options.thumbnail.call(this, avatar, uri);
          
          this.fileTracker = avatar;
          
          self = this;
          
          this.on("addedfile", function(file) {
            if (self.fileTracker) {
              this.removeFile(self.fileTracker);
            }
            self.fileTracker = file;
          });
        }                     
      });
      
      return self;
  };

  return dropzone;
});
