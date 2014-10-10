! function() {
  'use strict'

  define([
    'jquery',
    'backbone'
  ], function($, Backbone) {

    var BaseView = Backbone.View.extend({

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