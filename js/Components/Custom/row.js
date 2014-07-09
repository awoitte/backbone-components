! function() {
  'use strict';

  define([
    'backbone',
    'Components/Base/ComponentView',
    'Components/Basic/button',
    'Components/Basic/link',
    'text!Pages/App/row.html'
  ], function(Backbone, ComponentView, ButtonComponent, LinkComponent, RowTpl) {

    var RowComponent = ComponentView.extend({

      initialize: function() {
        this.options.template = RowTpl;

        RowComponent.__super__.initialize.apply(this, arguments);

        var that = this;

        this.link = new LinkComponent({
          model: this.model,
          property: this.options.property
        });

        this.button = new ButtonComponent({
          model: new Backbone.Model({
            label: "Remove"
          }),
          property: "label",
          onClick: function (e) {
            if(that.options.onClick) that.options.onClick(e, that.model);
          }
        });

        this.components[".name"] = this.link;
        this.components[".options"] = this.button;
      },

      setModel: function (model) {
        RowComponent.__super__.setModel.apply(this, arguments);

        this.link && this.link.setModel(model);
      }



    });

    return RowComponent;
  });
}();