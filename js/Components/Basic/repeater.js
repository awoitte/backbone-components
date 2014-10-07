! function() {
  'use strict';

  define([
    'Components/Base/ComponentView'
  ], function(ComponentView) {

    /**
     * The repeater component creates a component for each model in a collection (its model property)
     * modelComponent option is the constructor for the component to make
     * modelOptions is the options to pass to each new component
     * @constructor
     */
    var RepeaterComponent = ComponentView.extend({

      initialize: function() {
        this.options.template = "";
        this.components = {};
        this.components[this.getTagName()] = [];

        RepeaterComponent.__super__.initialize.apply(this, arguments);
      },

      render: function() {
        this.updateComponents();
        RepeaterComponent.__super__.render.apply(this, arguments);
      },

      updateComponents: function() {
        var componentList = this.components[this.getTagName()],
          actualLength = this.model.length,
          currentLength = componentList ? componentList.length : 0,
          smallestLength = actualLength < currentLength ? actualLength : currentLength;

        //update the model for each component (important if the collection's order has changed)
        for (var i = 0; i < smallestLength; i++) {
          if(componentList[i] && !this.options.alwaysFresh) componentList[i].setModel(this.getModelAt(i));
          else componentList[i] = this.makeNewComponent({
              model: this.getModelAt(i)
            });
        }

        if (currentLength < actualLength) {
          //there aren't enough components on the repeater
          for (var j = smallestLength; j < actualLength; j++) {
            //create a new component
            componentList[j] = this.makeNewComponent({
              model: this.getModelAt(j)
            });
          }
        } else if (actualLength < currentLength) {
          //there are too many components on the repeater
          for (var k = smallestLength; k < currentLength; k++) {
            delete componentList[k];
          }
        }

      },

      getModelAt: function (i) {
        //using a backbone collection V.S. an array
        return this.model.models ? this.model.models[i] : this.model[i];
      },

      makeNewComponent: function(options) {
        return new this.options.modelComponent(
          _.extend(
            //the new component should use the correct model
            options,
            //pass it any extra options
            this.options.modelOptions
          )
        );
      }
    });

    return RepeaterComponent;
  });
}();