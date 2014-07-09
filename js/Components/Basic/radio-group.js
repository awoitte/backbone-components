! function() {
    'use strict';

    define([
        'Components/Basic/repeater',
        'Components/Basic/radio'
    ], function(RepeaterComponent, RadioComponent) {

        /**
         * A simple radio group component. Creates a radio element for each model in it's model property collection.
         * Groups the radio buttons together.
         * @constructor
         */
        var RadioGroupComponent = RepeaterComponent.extend({

            initialize: function() {
                this.options.modelOptions = this.options.modelOptions || {};
                _.extend(this.options.modelOptions, {
                    group: this.id || this.cid,
                    property: this.options.property
                });

                this.options.modelComponent = RadioComponent;

                RadioGroupComponent.__super__.initialize.apply(this, arguments);
            }

        });


        return RadioGroupComponent;
    });
}();