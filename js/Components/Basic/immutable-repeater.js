import ComponentView from '../Base/ComponentView';

/**
 * The repeater component creates a component for each model in a collection (its model property)
 * modelComponent option is the constructor for the component to make
 * modelOptions is the options to pass to each new component
 * @constructor
 */
var RepeaterComponent = ComponentView.extend({

  initialize: function() {
    this.template = "";
    this.components = {};
    this.components[this.getTagName()] = [];

    this.library = [];

    RepeaterComponent.__super__.initialize.apply(this, arguments);
  },

  render: function() {
    this.updateComponents();
    RepeaterComponent.__super__.render.apply(this, arguments);
    this.cleanupLibrary();
  },

  updateComponents: function() {

    var componentsArray = [];

    //generate component list
    for (var i = 0; i < this.model.length; i++) {
      var model = this.getModelAt(i),
        component = this.getComponentFromLibrary(model);
      if (!component) component = this.addModelToLibrary(model);

      componentsArray.push(component);
    }

    this.components[this.getTagName()] = componentsArray;

  },

  addModelToLibrary: function(model) {
    var newComponent = this.makeNewComponent({
      model: model
    });

    this.library.push({
      model: model,
      component: newComponent
    });

    return newComponent;
  },

  getComponentFromLibrary: function(model) {
    var retModel = false;
    _.each(this.library, function(map) {
      if (map.model === model) retModel = map.component;
    });
    return retModel;
  },

  getModelAt: function(i) {
    //using a backbone collection V.S. an array
    return this.model.models ? this.model.models[i] : this.model[i];
  },

  getModels: function() {
    return this.model.models ? this.model.models : this.model;
  },

  makeNewComponent: function(options) {
    return new this.modelComponent(
      _.extend(
        //the new component should use the correct model
        options,
        //pass it any extra options
        this.modelOptions
      )
    );
  },

  cleanupLibrary: function() {
    var models = this.getModels(),
      zombieMaps = [];

    _.each(this.library, function(map) {
      if (!_.contains(models, map.model)) zombieMaps.push(map);
    });

    this.library = _.without(this.library, zombieMaps);
  }
});

export default RepeaterComponent;
