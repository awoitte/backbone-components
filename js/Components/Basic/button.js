import Component from '../Base/Component';

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
    this.template = this.template || "{{data}}";

    ButtonComponent.__super__.initialize.apply(this, arguments);
  },

  /**
   * onClick callback
   */
  click: function (e) {
    if(this.onClick) this.onClick(e, this.model);
  }
});

export default ButtonComponent;
