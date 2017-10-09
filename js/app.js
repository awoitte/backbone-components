import ComponentView from './Components/Base/ComponentView';
import TextComponent from './Components/Basic/textinput';
import ButtonComponent from './Components/Basic/button';
import ToggleComponent from './Components/Custom/toggle-group';
import ComponentRepeater from './Components/Basic/repeater';
import RowComponent from './Components/Custom/row';
import RadioGroupComponent from './Components/Basic/radio-group';

var AppTpl = '\
Welcome to the Component Prototype App!\
<div class="testDiv"></div>';

var TableTpl = '\
<thead>\
<th>Template name</th>\
<th>Type</th>\
<th>Last updated</th>\
<th>Options</th>\
</thead>';

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
    var input = new TextComponent({
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
    var repeater = new ComponentRepeater({
      model: collection,

      modelComponent: ToggleComponent,
      modelOptions: {
        forwardModel: true,
        buttonOptions: {
          property: "name"
        },
        hidableOptions: {

          component: TextComponent,
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
    var toggle = new ToggleComponent({
      buttonOptions: {
        model: "Toggle Table"
      },
      model: model,
      hidableOptions: {

        component: ComponentView,
        componentOptions: {
          tagName: "table",
          template: TableTpl,

          component: ComponentRepeater,
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

export default App;
