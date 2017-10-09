import Component from '../Base/Component';

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
    this.template = "{{data}}";

    LinkComponent.__super__.initialize.apply(this, arguments);
  },

  click: function (e) {
    if(this.onClick) this.onClick(e);
  }
});

export default LinkComponent;
