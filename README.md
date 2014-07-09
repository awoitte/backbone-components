#Backbone Components#
A Component System for use with backbone.

#Requirements#
The components themselves rely on Backbone (and Underscore), JQuery, Require, and Mustache

#To Use#
For use, copy the "js/Components" directory to your project and use as needed.

#Example App#
To run the example app:

Since require pulls in files from other directories you'll need to host the files on a server before you can see the example running (running locally makes the browser think it's an XSS attack). If you want to do this with node follow the steps below:

Make sure node is installed and then run the command:
npm install connect

you can then start the server with:

```JavaScript
node server.js
```

The page is now accesible at http://localhost:8080

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