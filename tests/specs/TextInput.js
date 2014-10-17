define(['Components/Basic/textinput', 'backbone'], function(TextInputComponent, Backbone) {
    return function() {
        var model = new Backbone.Model({
            prop: "name"
        });
        var textInput = new TextInputComponent({
            model: model,
            property: "prop"
        });
        textInput.render();

        describe("Text Input Component", function() {

            it("should be an input tag", function() {
                expect(textInput.$el.is("input")).toBeTruthy();
            });

            it("should set the value of the input tag to the model's property", function() {
                expect(textInput.$el.val()).toBe("name");

                model.set("prop", "Test");

                expect(textInput.$el.val()).toBe("Test");
            });

            it("should have a callback for keyup events", function(done) {
                var textInput = new TextInputComponent({
                    model: model,
                    property: "prop",
                    onKeyup: function () {
                        done();
                    }
                });

                textInput.$el.keyup();
            });

            it("should have a callback for change events", function(done) {
                var textInput = new TextInputComponent({
                    model: model,
                    property: "prop",
                    onChange: function () {
                        done();
                    }
                });

                textInput.$el.change();
            });

        });
    };
});