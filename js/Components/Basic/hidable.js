! function() {
  'use strict';

  define([
    'Components/Base/ComponentView'
  ], function(ComponentView) {

    /**
     * A simple container component. hides itself based on the return of isHidden method or truthyness of model's property
     * @constructor
     */
    var HidableComponent = ComponentView.extend({

      render: function() {
        HidableComponent.__super__.render.apply(this, arguments);
        var visibility = this.options.isHidden ? this.options.isHidden(this.model) : this.model.get(this.options.property);
        this.$el.toggle(!!visibility);
      },

    });

    return HidableComponent;
  });
}();