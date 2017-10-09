import ComponentView from '../Base/ComponentView';

/**
 * A simple container component. hides itself based on the return of isHidden method or truthyness of model's property
 * @constructor
 */
var HidableComponent = ComponentView.extend({

  render: function() {
    HidableComponent.__super__.render.apply(this, arguments);
    var visibility = this.isHidden ? this.isHidden(this.model) : this.model.get(this.property);
    this.$el.css("display", !!visibility ? this.displayType || "block" : "none");
  },

});

export default HidableComponent;
