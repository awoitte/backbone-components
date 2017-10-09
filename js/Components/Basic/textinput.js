import Component from '../Base/Component';

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

export default TextInputComponent;
