define(['Components/Basic/Repeater', 'Components/Base/Component', 'backbone'], function(RepeaterComponent, Component, Backbone) {
    return function() {
        var collection = new Backbone.Collection();

        var repeater = new RepeaterComponent({
            model: collection,
            modelComponent: Component,
            modelOptions: {
                property: "name",
                template: "{{data}}"
            }
        });

        repeater.render();

        describe("Repeater", function() {

            it("should be empty when its collection is empty", function() {
                expect(repeater.$el.html()).toBe("");
            });

            it("should render a component for each model in its collection", function() {
                collection.add({
                    name: "text"
                });

                expect(repeater.$el.html()).toBe("<div>text</div>");
            });

            it("should add a component when a model is added to the collection", function() {
                collection.add({
                    name: "text2"
                });

                expect(repeater.$el.html()).toBe("<div>text</div><div>text2</div>");
            });

            it("should remove a component when a model is removed from the collection", function() {

                collection.reset();

                var model = new Backbone.Model({
                    name: "text3"
                });

                collection.add(model);

                expect(repeater.$el.html()).toBe("<div>text3</div>");

                collection.remove(model);

                expect(repeater.$el.html()).toBe("");

            });

        });
    };
});