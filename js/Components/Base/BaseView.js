! function() {
  'use strict'

  define([
    'jquery',
    'backbone'
  ], function($, Backbone) {

    var BaseView = Backbone.View.extend({

      // Helper method to extend an already existing method
      extendMethod: function(to, from, methodName) {
        // if the method is defined on from ...
        if (!_.isUndefined(from[methodName])) {
          var old = to[methodName];

          // ... we create a new function on to
          to[methodName] = function() {

            // wherein we first call the method which exists on `to`
            var oldReturn = old.apply(this, arguments);

            // and then call the method on `from`
            from[methodName].apply(this, arguments);

            // and then return the expected result,
            // i.e. what the method on `to` returns
            return oldReturn;

          };
        }
      },

      //THIS FUNCTION WILL LIKELY BE OVERWRITTEN
      //clean up anything that might require cleaning on view destruction
      destroy: function () {

      },

      getTagName: function () {
        return this.tagName || "div";
      }


    });

    return BaseView;

  });

}();