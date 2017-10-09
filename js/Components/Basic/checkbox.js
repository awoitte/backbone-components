import Component from '../Base/Component';

/**
 * A simple checkbox component.
 * uses the property option of the model for its label
 * uses the truthyness of checkedProperty of the model to determine if it is checked
 * @constructor
 */
var CheckBoxComponent = Component.extend({
  events: {
    "change input" : "change"
  },

  tagName: "label",

  initialize: function() {
    this.template = this.template || "<input type='checkbox'{{#checked}} checked{{/checked}}>{{data}}";

    CheckBoxComponent.__super__.initialize.apply(this, arguments);
  },

  change: function(e) {
    var val = e.target.checked,
    that = this;

    if (this.onChange) this.onChange(val, e);

    setTimeout(function () {
      if(!that.manualUpdate && that.model.set) that.model.set(that.checkedProperty, val);
    },1);//fix issue where firefox triggers event twice
  },

  inject: function(model) {
    return {
      data: this.labelText || model.get(this.property),
      checked: model.get(this.checkedProperty)
    };
  }
});

export default CheckBoxComponent;
