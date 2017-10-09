(function () {
'use strict';

var BaseView = Backbone.View.extend({

    initialize: function(options){
        _.extend(this, options);
    },

  //THIS FUNCTION WILL LIKELY BE OVERWRITTEN
  //clean up anything that might require cleaning on view destruction
  destroy: function () {

  },

  getTagName: function () {
    return this.tagName || "div";
  }


});

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
    this.setTemplate(this.template);

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

//a component view is a view that is designed to be used as a socket for components
//it manages the rendering and destruction of components by acting as a "parent"
var ComponentView = TemplateView.extend({

  //the components property acts as a library of the components that fill the "sockets" in this view
  //the property name is a css selector that will indicate where a given component will be appended to
  //the property value is a component
  //ideally the components are added on initialization however they can easilly be added any time after
  initialize: function() {
    this.components = this.components || {};

    ComponentView.__super__.initialize.apply(this, arguments);

    if (this.component) {
      var contentOptions = {};

      if (this.forwardModel) contentOptions.model = this.model;
      else if(this.forwardProperty) contentOptions.model = this.model.get(this.forwardProperty);

      this.component = new this.component(_.extend(contentOptions,
        this.componentOptions
      ));

      this.components[this.getTagName()] = this.component;
    }

  },

  //render each component and place it into the correct "socket"
  render: function() {
    ComponentView.__super__.render.apply(this, arguments);

    var that = this;

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
    if(this.component && this.forwardModel) this.component.setModel(model);
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

/**
* A simple text input component.
* has callbacks for both keup and change events
* @constructor
*/
var TextInputComponent = Component.extend({
    tagName: "input",

    events: {
      "change": "change",
      "keyup": "keyup"
    },

    initialize: function() {
      TextInputComponent.__super__.initialize.apply(this, arguments);
    },

    change: function(e) {
      var val = e.target.value;

      if (!this.manualUpdate && this.model.set) this.model.set(this.property, val, {
          silent: !this.setLoud //fix bug where a parent component would share the same model and setting the property would loose focus on typing
        });

      if (this.onChange) this.onChange(val, e);
    },

    keyup: function(e) {
      var val = e.target.value;

      if (!this.manualUpdateKeyup && this.model.set) this.model.set(this.property, val, {
          silent: !this.setLoud //fix bug where a parent component would share the same model and setting the property would loose focus on typing
        });

      if (this.onKeyup) this.onKeyup(val, e);
    },

    render: function() {
      TextInputComponent.__super__.render.apply(this, arguments);

      this.$el.val(this.model.get(this.property));
    }
});

/**
 * A simple button component. Uses the button element.
 * @constructor
 */
var ButtonComponent = Component.extend({
  tagName: "button",

  events: {
    "click": "click"
  },

  initialize: function() {
    this.template = this.template || "{{data}}";

    ButtonComponent.__super__.initialize.apply(this, arguments);
  },

  /**
   * onClick callback
   */
  click: function (e) {
    if(this.onClick) this.onClick(e, this.model);
  }
});

/**
 * A simple container component. hides itself based on the return of isHidden method or truthyness of model's property
 * @constructor
 */
var HidableComponent = ComponentView.extend({

  render: function() {
    HidableComponent.__super__.render.apply(this, arguments);
    var visibility = this.isHidden ? this.isHidden(this.model) : this.model.get(this.property);
    this.$el.css("display", !!visibility ? this.displayType || "block" : "none");
  },

});

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
      if(componentList[i] && !this.alwaysFresh) componentList[i].setModel(this.getModelAt(i));
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
    return new this.modelComponent(
      _.extend(
        //the new component should use the correct model
        options,
        //pass it any extra options
        this.modelOptions
      )
    );
  }
});

/**
 * A simple link component. Uses the anchor element.
 * @constructor
 */
var LinkComponent = Component.extend({
  events: {
    "click": "click"
  },

  tagName: "a",

  initialize: function() {
    this.template = "{{data}}";

    LinkComponent.__super__.initialize.apply(this, arguments);
  },

  click: function (e) {
    if(this.onClick) this.onClick(e);
  }
});

var RowTpl = "<td class=\"name\"></td>\r\n<td class=\"type\"></td>\r\n<td class=\"updated\"></td>\r\n<td class=\"options\"></td>\r\n";

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

/**
 * A simple radio button component.
 * uses the result of the "isChecked" options method to determine if it is checked or not. This allows for more reusability over using the truthyness of a property of its model.
 * uses the group option to set the name attribute (and group radio buttons together)
 * @constructor
 */
var RadioComponent = Component.extend({
  tagName: "label",

  events: {
    "change input": "change"
  },

  initialize: function() {
    this.template = '<input type="radio" {{#checked}}checked{{/checked}}/>{{data}}';

    RadioComponent.__super__.initialize.apply(this, arguments);
  },

  change: function(e) {
    if (this.onChange) this.onChange(e, this.model);
  },

  render: function() {
    RadioComponent.__super__.render.apply(this, arguments);

    var $input = this.$el.find("input"),
      id = "radio_" + (this.id || this.cid);

    this.$el.attr("for", id);
    $input.attr("id", id);
    $input.attr("name", (this && this.group) || this.id || this.cid);
  },

  inject: function (model) {
    var data = RadioComponent.__super__.inject.apply(this, arguments);
    data.checked = _.result(this, "isChecked");
    return data;
  }
});

/**
 * A simple radio group component. Creates a radio element for each model in it's model property collection.
 * Groups the radio buttons together.
 * @constructor
 */
var RadioGroupComponent = RepeaterComponent.extend({

    initialize: function(options) {
        this.modelOptions = options.modelOptions || {};
        _.extend(this.modelOptions, {
            group: options.id || this.id || this.cid,
            property: options.property
        });

        this.modelComponent = RadioComponent;

        RadioGroupComponent.__super__.initialize.apply(this, arguments);
    }

});

var AppTpl = "Welcome to the Component Prototype App!\r\n<div class=\"testDiv\"></div>\r\n";

var TableTpl = "<thead>\r\n<th>Template name</th>\r\n<th>Type</th>\r\n<th>Last updated</th>\r\n<th>Options</th>\r\n</thead>\r\n\r\n";

var App = Backbone.Model.extend({
  initialize: function() {
    var that = this;

    //The main view for the whole application
    this.mainView = new ComponentView({
      template: AppTpl,
      model: ""
    });

    //A simple model to use for the text input component. This could easily be replaced by a text string
    //if you don't want the auto-update of the data-binding
    var model = new Backbone.Model({
      "name": "item",
    });

    //A collection that will hold all of our "items".
    var collection = new Backbone.Collection();

    //a simple example of "newing up" a component with a model
    //
    //this is our text field for the "Add" button
    var input = new TextInputComponent({
      model: model,
      property: "name"
    });

    //an example of using the event callback functions
    var button = new ButtonComponent({
      model: "Add",
      onClick: function(e) {

        //the name property of the model is automatically updated when the text input field is changed
        var name = model.get("name");

        //when the button is clicked, add a new item to the collection
        collection.add({
          name: name
        }).trigger("change");

        //clear the model's name so the text input is cleared
        model.set("name", "");

      }
    });

    //a simple way to cache which item is selected in the radio group
    this.selected = "item";

    //an example of using the radio group component
    //
    //creates a radio button for each model in a collection (or object in an array)
    //
    //the "isChecked" callback is used to determine if a radio is to be selected
    var list = new RadioGroupComponent({
      model: collection,
      property: "name",
      modelOptions: {
        isChecked: function() {
          //does this item have the same name as our selected variable?
          return this.model.get("name") == that.selected;
        },
        onChange: function(e, model) {
          that.selected = model.get("name");
        }
      }
    });

    //The repeater component creates a component for each model in a collection
    //
    //This component also shows basic component chaining. The component specified by the "component"
    //property will be newed up with the options of the "componentOptions" property.
    //
    //The forward model option specifies that the child component should use the same model as the parent component.
    var repeater = new RepeaterComponent({
      model: collection,

      modelComponent: ToggleGroupComponent,
      modelOptions: {
        forwardModel: true,
        buttonOptions: {
          property: "name"
        },
        hidableOptions: {

          component: TextInputComponent,
          forwardModel: true,
          componentOptions: {
            property: "name"
          }

        }
      }
    });

    //a slightly more advanced example of component chaining
    //
    //notice that the event callback gives us access to the events of the (custom) row component
    //without needing to have access to the component itself
    //
    //This is also an example of how to create a simple table with components. This has been refactored into the
    //Table Component
    var toggle = new ToggleGroupComponent({
      buttonOptions: {
        model: "Toggle Table"
      },
      model: model,
      hidableOptions: {

        component: ComponentView,
        componentOptions: {
          tagName: "table",
          template: TableTpl,

          component: RepeaterComponent,
          componentOptions: {
            tagName: "tbody",
            model: collection,
            modelComponent: RowComponent,
            modelOptions: {
              tagName: "tr",
              property: "name",
              onClick: function(e, model) {
                //this is the callback for the "Remove" button
                collection.remove(model).trigger("change");
              }
            }
          }
        }
      }
    });

    //place the components into the main view's "Sockets" (defined by their jquery selector)
    this.mainView.components[".testDiv"] = [list, input, button, repeater, toggle];

    //render the main view and all of its components
    this.mainView.render();

    //Append the main view to the document
    $('body').append(this.mainView.$el);

  }
});

window.App = new App();

}());
