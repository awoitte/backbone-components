define(['Components/Basic/list', 'backbone'], function(ListComponent, Backbone) {
    return function() {
        var model = new Backbone.Model({
            prop: "name"
        }),
        collection = new Backbone.Collection(),
        listComponent = new ListComponent({
            model: collection,
            property: "prop"
        });

        collection.add(model);

        listComponent.render();

        describe("List Component", function() {

            it("should render as a ul tag", function() {
                expect(listComponent.$el.is("ul")).toBe(true);
            });

            it('should create an li element for each model in its collection', function() {
                expect(listComponent.$el.find("li").length).toBe(1);
                collection.add({
                    prop: "test2"
                });
                expect(listComponent.$el.find("li").length).toBe(2);
            });

            it("should use each model's property for the label of the li element", function() {
                model.set("prop", "test");
                expect(listComponent.$el.find("li").first().html()).toBe("test");
                expect(listComponent.$el.find("li").last().html()).toBe("test2");
            });

            it("should accept an array as it's model", function() {
                var listComponent2 = new ListComponent({
                    model: [
                        "test3",
                        "test4"
                    ]
                });

                listComponent2.render();

                expect(listComponent2.$el.find("li").first().html()).toBe("test3");
                expect(listComponent2.$el.find("li").last().html()).toBe("test4");
            });

        });
    };
});