#Backbone Components#
A Component System for use with backbone.

#Requirements#
The components themselves rely on Backbone (and Underscore), JQuery (or substitute like Zepto), and Mustache

#To Use#
Copy the "js/Components" directory to your project and import as needed.

Below is the standard way to use the button:

```JavaScript
var model = new Backbone.Model({
    prop: "name"
});

var buttonComponent = new ButtonComponent({
    model: model,
    property: "prop",
    onClick: function () {
        done();
    }
});

buttonComponent.render();
```

The following is also an aceptable use case, however you lose the data-binding of the Backbone Model

```JavaScript
var buttonComponent = new ButtonComponent({
    model: "name",
    onClick: function () {
        done();
    }
});

buttonComponent.render();
```

Use a Component View (a component that has the ability to have sub-components) as follows:

```JavaScript
this.mainView = new ComponentView({
  template: '<div class="socket-one"></div><div class="socket-two"></div>',
  model: ""
});

this.mainView.components[".socket-one"] = [buttonComponent, textComponent];
this.mainView.components[".socket-two"] = toggleComponent;
```

#Example App#

A live preview is available at http://awoitte.github.io/backbone-components/

To run the example app locally simply open index.html in any modern browser.

#Custom Components#

When creating a custom component be sure to call the super of any function you extend.

A good example of this is the hidable component:

```JavaScript
! function() {
  'use strict';

  define([
    'Components/Base/ComponentView'
  ], function(ComponentView) {

    var HidableComponent = ComponentView.extend({

      render: function() {
        HidableComponent.__super__.render.apply(this, arguments);
        var visibility = this.options.isHidden ? this.options.isHidden(this.model) : this.model.get(this.options.property);
        this.$el.toggle(!!visibility);
      },

    });

    return HidableComponent;
  });
}();
```

The Components in the "Base" folder were designed to be extended from to make Custom components.
