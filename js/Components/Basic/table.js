! function() {
    'use strict';

    define([
        'Components/Base/ComponentView',
        'Components/Basic/immutable-repeater'
    ], function(ComponentView, RepeaterComponent) {

        /**
         * A wrapper for creating a table component.
         * define the thead and columns in the template
         * creates a rowComponent for each model in its collection (the model property)
         * allowing the use of a custom row component allows for more reusability. This way the table doesn't need to get bogged down by anticipating every possible functionality.
         * @constructor
         */
        var TableComponent = ComponentView.extend({

            tagName: "table",

            initialize: function() {
                TableComponent.__super__.initialize.apply(this, arguments);

                this.rowRepeater = new RepeaterComponent({
                    tagName: "tbody",
                    model: this.options.model,
                    modelComponent: this.options.rowComponent,
                    modelOptions: _.extend(this.options.rowOptions, {
                        tagName: "tr"
                    })
                });

                this.components[this.getTagName()] = this.rowRepeater;

            },

            setModel: function(model) {
                TableComponent.__super__.setModel.apply(this, arguments);

                this.rowRepeater && this.rowRepeater.setModel(model);
            }

        });


        return TableComponent;
    });
}();