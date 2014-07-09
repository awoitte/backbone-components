! function() {
  'use strict';

  define([
    'Components/Base/Component'
  ], function(Component) {

    /**
     * A simple link component. Uses the anchor element.
     * @constructor
     */
    var LinkComponent = Component.extend({
      events: {
        "click": "click"
      },

      tagName: "a",

      initialize: function() {
        this.options.template = "{{data}}";

        LinkComponent.__super__.initialize.apply(this, arguments);
      },

      click: function (e) {
        if(this.options.onClick) this.options.onClick(e);
      }
    });

    return LinkComponent;
  });
}();