import ComponentView from '../Base/ComponentView';
import ButtonComponent from '../Basic/button';
import LinkComponent from '../Basic/link';

var RowTpl = '\
<td class="name"></td>\
<td class="type"></td>\
<td class="updated"></td>\
<td class="options"></td>';

var RowComponent = ComponentView.extend({

  initialize: function() {
    this.template = RowTpl;

    RowComponent.__super__.initialize.apply(this, arguments);

    var that = this;

    this.link = new LinkComponent({
      model: this.model,
      property: this.property
    });

    this.button = new ButtonComponent({
      model: new Backbone.Model({
        label: "Remove"
      }),
      property: "label",
      onClick: function (e) {
        if(that.onClick) that.onClick(e, that.model);
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

export default RowComponent;
