! function() {
  'use strict';

  define([
    'Components/Base/ComponentView',
    'Components/Basic/button',
    'Components/Basic/hidable'
  ], function(ComponentView, ButtonComponent, HidableComponent) {

    var ToggleGroupComponent = ComponentView.extend({

      initialize: function() {
        ToggleGroupComponent.__super__.initialize.apply(this, arguments);

        var that = this,
          hidableDefaults = {},
          buttonDefaults = {};

        if(this.options.forwardModel){
          hidableDefaults.model = this.model;
          buttonDefaults.model = this.model;
        }

        this.content = new HidableComponent(_.extend(hidableDefaults,
          this.options.hidableOptions,
          {
          isHidden: function(model) {
            return !that.isHidden;
          }
        })
        );

        this.toggleButton = new ButtonComponent(_.extend(buttonDefaults,
          this.options.buttonOptions,
          {
          onClick: function() {
            that.toggle();
          }
        }));

        this.isHidden = true;

        this.components[this.getTagName()] = [this.toggleButton, this.content];
      },

      setModel: function(model) {
        ToggleGroupComponent.__super__.setModel.apply(this, arguments);
        if(this.options.forwardModel){
          this.eachComponent(function (component) {
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
          this.render();
          if(this.options.onToggle) this.options.onToggle(this.isHidden, e);
      }

    });

    return ToggleGroupComponent;
  });
}();