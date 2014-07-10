define(['Components/Basic/hidable', 'backbone'], function(HidableComponent, Backbone) {
    return function() {
        var model = new Backbone.Model({
            shown: true
        });

        var hidableComponent = new HidableComponent({
            model: model,
            property: "shown"
        });

        hidableComponent.render();

        describe("Hidable Component", function() {

            it("should render as a div", function() {
                expect(hidableComponent.$el.is("div")).toBe(true);
            });

            it("should adjust visibility based on model's property", function() {
                expect(hidableComponent.$el.css("display")).not.toBe("none");

                model.set("shown", false);

                expect(hidableComponent.$el.css("display")).toBe("none");
            });

            it("should use isHidden callback option instead of model's property if defined", function() {
                var hidableComponent2 = new HidableComponent({
                    model: model,
                    property: "shown",
                    isHidden: function () {
                        return false;
                    }
                });

                model.set("shown", true);

                hidableComponent2.render();
                expect(hidableComponent2.$el.css("display")).toBe("none");
            });

        });
    };
});