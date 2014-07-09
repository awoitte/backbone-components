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

        });
    };
});