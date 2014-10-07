! function() {
  'use strict';

  define([
    'Components/Base/Component'
  ], function(Component) {

    /**
     * A simple button component. Uses the button element.
     * @constructor
     */
    var ButtonComponent = Component.extend({
      tagName: "button",

      events: {
        "click": "click"
      },

      initialize: function() {
        this.options.template = this.options.template || "{{data}}";

        ButtonComponent.__super__.initialize.apply(this, arguments);
      },

      /**
       * onClick callback
       */
      click: function (e) {
        if(this.options.onClick) this.options.onClick(e, this.model);
      }
    });

    return ButtonComponent;
  });
}();