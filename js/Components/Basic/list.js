! function() {
  'use strict';

  define([
    'Components/Base/Component'
  ], function(Component) {

    /**
     * A simple list component. Creates a list item element for each model in its model property collection (meaning the "model" property of it's options is really a collection).
     * Uses the property of each model for the text of each list item.
     * @constructor
     */
    var ListComponent = Component.extend({

      initialize: function() {
        this.options.template = "<ul>{{#items}} <li>{{text}}</li> {{/items}}</ul>";

        ListComponent.__super__.initialize.apply(this, arguments);
      },

      inject: function (collection) {
        var items = [],
            that = this;
        collection.each(function (item) {
          items.push({text: item.get(that.options.property)});
        });
        return {items: items};
      }
    });

    return ListComponent;
  });
}();