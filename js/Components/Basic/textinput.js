! function() {
  'use strict';

  define([
    'Components/Base/Component'
  ], function(Component) {

    /**
     * A simple text input component.
     * has callbacks for both keup and change events
     * @constructor
     */
    var TextInputComponent = Component.extend({
      tagName: "input",

      events: {
        "change": "change",
        "keyup": "keyup"
      },

      initialize: function() {
        TextInputComponent.__super__.initialize.apply(this, arguments);
      },

      change: function(e) {
        var val = e.target.value;

        this.model.set(this.options.property, val);

        if (this.options.onChange) this.options.onChange(val, e);
      },

      keyup: function (e) {
        var val = e.target.value;

        if (this.options.onKeyup) this.options.onKeyup(val, e);
      },

      render: function () {
        TextInputComponent.__super__.render.apply(this, arguments);

        this.$el.val(this.model.get(this.options.property));
      }
    });

    return TextInputComponent;
  });
}();