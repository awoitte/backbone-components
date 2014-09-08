! function() {
  'use strict';

  define([
    'Components/Base/Component'
  ], function(Component) {

    /**
     * A simple checkbox component.
     * uses the property option of the model for its label
     * uses the truthyness of checkedProperty of the model to determine if it is checked
     * @constructor
     */
    var CheckBoxComponent = Component.extend({
      events: {
        "change input": "change"
      },

      tagName: "label",

      initialize: function() {
        this.options.template = this.options.template || "<input type='checkbox'{{#checked}} checked{{/checked}}>{{data}}";

        CheckBoxComponent.__super__.initialize.apply(this, arguments);
      },

      change: function(e) {
        var val = e.target.checked;

        if(this.model.set) this.model.set(this.options.checkedProperty, val);

        if (this.options.onChange) this.options.onChange(val, e);
      },

      inject: function(model) {
        return {
          data: this.options.labelText || model.get(this.options.property),
          checked: model.get(this.options.checkedProperty)
        };
      }
    });

    return CheckBoxComponent;
  });
}();