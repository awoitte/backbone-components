define(['Components/Basic/radio-group', 'backbone'], function(RadioGroupComponent, Backbone) {
    return function() {
        var model = new Backbone.Model({
                prop: "name"
            }),
            collection = new Backbone.Collection(),
            radioGroupComponent = new RadioGroupComponent({
                model: collection,
                property: "prop"
            });

        collection.add(model);

        radioGroupComponent.render();

        describe("Radio Group Component", function() {

            it('should create a radio element for each model in its collection', function() {
                expect(radioGroupComponent.$el.find("input[type='radio']").length).toBe(1);
                collection.add({
                    prop: "labelText"
                });
                expect(radioGroupComponent.$el.find("input[type='radio']").length).toBe(2);
            });

            it("should use each model's property for the label of the radio element", function() {
                model.set("prop", "test");
                expect(radioGroupComponent.$el.find("label").first().html().indexOf("test")).not.toBe(-1);
                expect(radioGroupComponent.$el.find("label").last().html().indexOf("labelText")).not.toBe(-1);
            });

            it("should give each radio element a common name attribute", function() {
                expect(radioGroupComponent.$el.find("label").first()).not.toBe(radioGroupComponent.$el.find("label").last());
                expect(radioGroupComponent.$el.find("label").first().attr("name")).toBe(radioGroupComponent.$el.find("label").last().attr("name"));
            });

            it("should pass modelOptions to each radio as their options", function() {
                var radioGroupComponent2 = new RadioGroupComponent({
                    model: collection,
                    property: "prop",
                    modelOptions: {
                        className: "testClass"
                    }
                });

                radioGroupComponent2.render();

                expect(radioGroupComponent2.$el.find(".testClass").length).toBe(2);
            });

        });
    };
});