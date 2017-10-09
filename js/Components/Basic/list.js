import Component from '../Base/Component';
/**
 * A simple list component. Creates a list item element for each model in its model property collection (meaning the "model" property of it's options is really a collection).
 * Uses the property of each model for the text of each list item.
 * @constructor
 */
var ListComponent = Component.extend({

  tagName: "ul",

  initialize: function() {
    this.template = "{{#items}} <li>{{text}}</li> {{/items}}";

    ListComponent.__super__.initialize.apply(this, arguments);
  },

  inject: function (collection) {
    var items = [],
        that = this;
    collection.forEach(function (item) {
      items.push({text: item.get ? item.get(that.property) : item});
    });
    return {items: items};
  }
});

export default ListComponent;
