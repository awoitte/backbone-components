import TemplateView from './TemplateView';

var Component = TemplateView.extend({

  /**
   * THIS FUNCTION WILL LIKELY BE OVERWRITTEN
   * You give the component a model and tell it to use/update properties of that model in the view
   * @param  {backbone model} model the model to use
   */
  inject: function (model) {
    var data = (model && model.get) ? model.get(this.property) : model;
    return { data: data};
  }

});

export default Component;
