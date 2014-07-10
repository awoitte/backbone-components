define(['Components/Base/Component', 'backbone'], function(Component, Backbone) {
    return function() {

        describe("Component", function() {

            it("should use its property option to grab an attribute of its model and pass it to its view as 'data'", function() {
                var component = new Component({
                    model: new Backbone.Model({
                        prop: "test"
                    }),
                    template: "{{data}}",
                    property: "prop"
                });

                component.render();

                expect(component.$el.html()).toBe("test");
            });

            it("should detect if its model is not a backbone model and provide it to the template directly as 'data'", function() {
                var component = new Component({
                    model: "test2",
                    template: "{{data}}"
                });

                component.render();

                expect(component.$el.html()).toBe("test2");
            });

        });
    };
});