! function() {
  'use strict'

  define([
    'jquery',
    'Components/Base/TemplateView'
  ], function($, TemplateView) {

    //a component view is a view that is designed to be used as a socket for components
    //it manages the rendering and destruction of components by acting as a "parent"
    var ComponentView = TemplateView.extend({

      //the components property acts as a library of the components that fill the "sockets" in this view
      //the property name is a css selector that will indicate where a given component will be appended to
      //the property value is a component
      //ideally the components are added on initialization however they can easilly be added any time after
      initialize: function() {
        this.components = this.components || this.options.components || {};

        ComponentView.__super__.initialize.apply(this, arguments);

        if (this.options.component) {
          var contentOptions = {};

          if (this.options.forwardModel) contentOptions.model = this.model;
          else if(this.options.forwardProperty) contentOptions.model = this.model.get(this.options.forwardProperty);

          this.component = new this.options.component(_.extend(contentOptions,
            this.options.componentOptions
          ));

          this.components[this.getTagName()] = this.component;
        }

      },

      //render each component and place it into the correct "socket"
      render: function() {
        ComponentView.__super__.render.apply(this, arguments);

        var that = this

        this.eachComponent(function(component, selector) {
          component.render();
          var toElement = that.$el.is(selector) ? that.$el : that.$el.find(selector).first();
          component.$el.appendTo(toElement);
        });

        this.trigger("componentsRendered");
      },

      //ensure proper clean-up of components
      destroy: function() {
        this.eachComponent(function(component) {
          component.destroy();
        });
        ComponentView.__super__.destroy.apply(this, arguments);
      },

      setModel: function(model) {
        ComponentView.__super__.setModel.apply(this, arguments);
        if(this.component && this.options.forwardModel) this.component.setModel(model);
      },

      //utility function
      eachComponent: function(callback) {

        //rather than have a generic list component view and require that a container div be specified, have
        //a component value accept arrays to specify a list of components
        for (var prop in this.components) {
          var value = _.result(this.components,prop),
            componentList = Array.isArray(value) ? value : [value];
          componentList.forEach(function(component) {
            callback(component, prop);
          });
        }
      }

    });

    return ComponentView;

  });

}();