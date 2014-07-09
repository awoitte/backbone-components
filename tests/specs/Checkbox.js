define(['Components/Basic/checkbox', 'backbone'], function(CheckboxComponent, Backbone) {
    return function() {
        var model = new Backbone.Model({
            name: "name",
            checked: true
        });

        var checkboxComponent = new CheckboxComponent({
            model: model,
            property: "name",
            checkedProperty: "checked"
        });

        checkboxComponent.render();

        describe("Checkbox Component", function() {

            it("should render as a checkbox", function() {
                expect(checkboxComponent.$el.children("input[type='checkbox']").length).toBe(1);
            });

            it("should adjust checked status based on checkedProperty value", function() {
                expect(checkboxComponent.$el.children("input[checked]").length).toBe(1);

                model.set("checked", false);

                expect(checkboxComponent.$el.children("input[checked]").length).toBe(0);
            });

            it("should use property value for its label", function() {
                expect(checkboxComponent.$el.html().indexOf("name")).toBeGreaterThan(0);
            });

            it("should call onChange function on change", function(done) {
                var checkboxComponent2 = new CheckboxComponent({
                    model: model,
                    property: "name",
                    checkedProperty: "checked",
                    onChange: function () {
                        done();
                    }
                });

                checkboxComponent2.render();
                checkboxComponent2.$el.children("input[type='checkbox']").change();
            });

        });
    };
});