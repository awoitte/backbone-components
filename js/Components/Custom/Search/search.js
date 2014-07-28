! function() {
  'use strict';

  define([
    'backbone',
    'Components/Base/ComponentView',
    'Components/Basic/textinput',
    'Components/Basic/button'
  ], function(Backbone, ComponentView, InputComponent, ButtonComponent) {

    var SearchComponent = ComponentView.extend({

      initialize: function() {
        this.options.manualUpdate = true;
        SearchComponent.__super__.initialize.apply(this, arguments);


        var that = this;

        this.input = new InputComponent({
          className: "input-text input-search",
          model: this.model,
          property: this.options.property,
          onKeyup: function (val, e) {
            that.keyup(val, e);
          },
          onChange: function (val, e) {
            that.change(val, e);
          }
        });

        this.cancel = new ButtonComponent({
          className: "input-search-cancel",
          tagName: "div",
          onClick: function (e) {
            that.clearSearch(e);
          }
        });

        this.components[this.getTagName()] = [this.input, this.cancel];
      },

      render: function () {
        SearchComponent.__super__.render.apply(this, arguments);

        this.toggleCancel(this.model.get(this.options.property));
      },

      setModel: function (model) {
        SearchComponent.__super__.setModel.apply(this, arguments);

        this.eachComponent(function (component) {
          component.setModel(model);
        });
      },

      clearSearch: function (e) {
        this.model.set(this.options.property, "");
        this.change("",e);
      },

      toggleCancel: function (val) {
        if(val !== "" && val !== -1) this.showCancel();
        else this.hideCancel();
      },

      showCancel: function () {
        this.cancel.$el.show();
      },

      hideCancel: function () {
        this.cancel.$el.hide();
      },

      change: function (val, e) {
        if(this.options.onChange) this.options.onChange(val, e);
      },

      keyup: function (val, e) {
        this.toggleCancel(val);
        if(this.options.onKeyup) this.options.onKeyup(val, e);
      }



    });

    return SearchComponent;
  });
}();