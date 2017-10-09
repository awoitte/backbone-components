import Component from '../Base/Component';

/**
 * A simple radio button component.
 * uses the result of the "isChecked" options method to determine if it is checked or not. This allows for more reusability over using the truthyness of a property of its model.
 * uses the group option to set the name attribute (and group radio buttons together)
 * @constructor
 */
var RadioComponent = Component.extend({
  tagName: "label",

  events: {
    "change input": "change"
  },

  initialize: function() {
    this.template = '<input type="radio" {{#checked}}checked{{/checked}}/>{{data}}';

    RadioComponent.__super__.initialize.apply(this, arguments);
  },

  change: function(e) {
    if (this.onChange) this.onChange(e, this.model);
  },

  render: function() {
    RadioComponent.__super__.render.apply(this, arguments);

    var $input = this.$el.find("input"),
      id = "radio_" + (this.id || this.cid);

    this.$el.attr("for", id);
    $input.attr("id", id);
    $input.attr("name", (this && this.group) || this.id || this.cid);
  },

  inject: function (model) {
    var data = RadioComponent.__super__.inject.apply(this, arguments);
    data.checked = _.result(this, "isChecked");
    return data;
  }
});

export default RadioComponent;
