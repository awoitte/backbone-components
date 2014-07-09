define(['Components/Basic/button', 'backbone'], function(ButtonComponent, Backbone) {
    return function() {

        describe("Button Component", function() {

            var model = new Backbone.Model({
                prop: "name"
            })

            it("should render as a button", function() {
                var buttonComponent = new ButtonComponent({
                    model: new Backbone.Model(),
                    property: "prop"
                });

                buttonComponent.render();

                expect(buttonComponent.$el.is("button")).toBe(true);
            });

            it("should use its model's property as its label", function() {
                var buttonComponent = new ButtonComponent({
                    model: model,
                    property: "prop"
                });

                buttonComponent.render();

                expect(buttonComponent.$el.html()).toBe("name");
            });

            it("should trigger onClick event on click", function(done) {
                var buttonComponent = new ButtonComponent({
                    model: model,
                    property: "prop",
                    onClick: function () {
                        done();
                    }
                });
                buttonComponent.render();
                buttonComponent.$el.click();
            });

        });
    };
});