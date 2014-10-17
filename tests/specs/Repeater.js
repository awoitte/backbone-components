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

        var IdComponent = Component.extend({
            inject: function() {
                return {
                    data: this.cid
                };
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

            it("should change view order when collection order changes", function() {

                expect(repeater.$el.html()).toBe("<div>text</div><div>text2</div>");

                collection.unshift(collection.pop()); //reverse order

                expect(repeater.$el.html()).toBe("<div>text2</div><div>text</div>");

            });

            it("should call setModel on component on reorder", function() {
                var firstComponent = _.first(repeater.components[repeater.getTagName()]);

                spyOn(firstComponent, "setModel");

                collection.unshift(collection.pop()); //reverse order

                expect(firstComponent.setModel).toHaveBeenCalled();
            });

            it("should instantiate new Components on reorder rather than calling setModel if alwaysFresh option is true", function() {
                repeater = new RepeaterComponent({
                    alwaysFresh: true,
                    model: collection,
                    modelComponent: Component,
                    modelOptions: {
                        property: "name",
                        template: "{{data}}"
                    }
                });
                repeater.render();


                var firstComponent = _.first(repeater.components[repeater.getTagName()]);

                spyOn(firstComponent, "setModel");

                collection.unshift(collection.pop()); //reverse order

                expect(firstComponent.setModel).not.toHaveBeenCalled();

                //the first component should be replaced with a new component in the repeater component list
                expect(_.contains(repeater.components[repeater.getTagName()], firstComponent)).toBeFalsy();


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