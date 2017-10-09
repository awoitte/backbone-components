import BaseView from './BaseView';

//
/**
 * A template view is a view that uses a template. This prototype manages the template and passes it's model as data
 * @constructor
 */
var TemplateView = BaseView.extend({

  /**
   * handles any options passed in and pre-compiles the template
   */
  initialize: function () {
    this.template = this.template || "";
    this.setTemplate(this.template)

    this.setModel(this.model === undefined ? "" : this.model);
    TemplateView.__super__.initialize.apply(this, arguments);
  },

  /**
   * renders the template using data from the model
   */
  render: function () {
    TemplateView.__super__.render.apply(this, arguments);
    //pass the model to the template and update the element with the latest HTML
    this.$el.html(Mustache.render(this.template, this.inject(this.model)));
    this.delegateEvents();
    this.trigger("rendered");
  },

  /**
   * THIS FUNCTION WILL LIKELY BE OVERWRITTEN, this function is a hook to manipulate the data going into the template this is where you would add view-specific properties to the object
   * @param  {object} model the model to pass to the view. If this is a backbone model it will first be turned to JSON
   * @return {string}       the data to be passed to the view
   */
  inject: function (model) {
    //template view can take either a backbone Model or a raw object as input
    if(model.toJSON)
      return model.toJSON();
    else
      return model;
  },

  /**
   * sets the model of the template view
   * @param {object} model the model that the view will use. If it's a backbone model the view will listen to it for changes
   */
  setModel: function (model) {
    this.model && this.model.bind && this.stopListening(this.model);

    this.model = model;

    this.manualUpdate || this.model && this.model.bind && this.listenTo(this.model, "change reset add remove", this.render);
  },

  setTemplate: function  (template) {
    this.template = template;
    Mustache.parse(template);
  },

  /**
   * gets the current model of the view
   */
  getModel: function () {
    return this.model;
  }

});

export default TemplateView;
