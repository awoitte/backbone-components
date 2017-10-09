import ComponentView from '../Base/ComponentView';
import ButtonComponent from '../Basic/button';
import HidableComponent from '../Basic/hidable';

var ToggleGroupComponent = ComponentView.extend({

  initialize: function() {
    ToggleGroupComponent.__super__.initialize.apply(this, arguments);

    var that = this,
      hidableDefaults = {},
      buttonDefaults = {};

    if (this.forwardModel) {
      hidableDefaults.model = this.model;
      buttonDefaults.model = this.model;
    }

    this.content = new HidableComponent(_.extend(hidableDefaults,
      this.hidableOptions, {
        isHidden: function(model) {
          return !that.isHidden;
        }
      }));

    this.toggleButton = new ButtonComponent(_.extend(buttonDefaults,
      this.buttonOptions, {
        onClick: function() {
          that.toggle();
        }
      }));

    this.isHidden = true;

    this.components[this.getTagName()] = [this.toggleButton, this.content];
  },

  setModel: function(model) {
    ToggleGroupComponent.__super__.setModel.apply(this, arguments);
    if (this.forwardModel) {
      this.eachComponent(function(component) {
        component.setModel(model);
      });
    }
  },

  render: function(model) {
    ToggleGroupComponent.__super__.render.apply(this, arguments);
    this.$el.toggleClass("expanded", !this.isHidden);
  },

  toggle: function(e) {
    this.isHidden = !this.isHidden;
    this.updateFromToggle(e);
  },

  expand: function() {
    this.isHidden = false;
    this.updateFromToggle(e);
  },

  collapse: function() {
    this.isHidden = true;
    this.updateFromToggle(e);
  },

  updateFromToggle: function(e) {
    this.render();
    if (this.onToggle) this.onToggle(this.isHidden, e);
  },

});

export default ToggleGroupComponent;
