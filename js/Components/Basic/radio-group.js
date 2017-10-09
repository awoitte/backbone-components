import RepeaterComponent from './repeater';
import RadioComponent from './radio';

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


export default RadioGroupComponent;
