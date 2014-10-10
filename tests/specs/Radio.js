define(['Components/Basic/radio', 'backbone'], function(RadioComponent, Backbone) {
    return function() {
        var model = new Backbone.Model({
                prop: "name"
            }),
            collection = new Backbone.Collection(),
            radioComponent = new RadioComponent({
                model: model,
                property: "prop"
            });

        collection.add(model);

        radioComponent.render();

        describe("Radio Component", function() {

            it("should render as a label tag", function() {
                expect(radioComponent.$el.is("label")).toBe(true);
            });

            it("should have an input tag by default", function() {
                expect(radioComponent.$el.find("input").length).toBe(1);
            });

            it("should toggle the radio based on the 'isChecked' value or function", function() {
                radioComponent = new RadioComponent({
                    isChecked: true
                });
                radioComponent.render();

                expect(radioComponent.$el.find("input").is(":checked")).toBe(true);

                radioComponent = new RadioComponent({
                    isChecked: false
                });
                radioComponent.render();

                expect(radioComponent.$el.find("input").is(":checked")).toBe(false);

                var flag = true;

                radioComponent = new RadioComponent({
                    isChecked: function() {
                        return flag;
                    }
                });
                radioComponent.render();

                expect(radioComponent.$el.find("input").is(":checked")).toBe(true);

                flag = false;

                radioComponent.render();
                expect(radioComponent.$el.find("input").is(":checked")).toBe(false);
            });

            it("should set 'for' and 'id' attributes of input and label based on it's id or cid", function() {

                radioComponent.cid = "a";
                radioComponent.render();
                expect(radioComponent.$el.find("input").attr("id")).toBe("radio_a");
                expect(radioComponent.$el.attr("for")).toBe("radio_a");

                radioComponent.id = "9";
                radioComponent.render();
                expect(radioComponent.$el.find("input").attr("id")).toBe("radio_9");
                expect(radioComponent.$el.attr("for")).toBe("radio_9");

            });

            it("should set 'name' attribute of label based on it's group option", function() {

                radioComponent = new RadioComponent({
                    group: "test"
                });
                radioComponent.render();
                expect(radioComponent.$el.find("input").attr("name")).toBe("test");

            });

            it("should set 'name' attribute of label based on it's id or cid if no group is given", function() {

                radioComponent = new RadioComponent({});
                radioComponent.cid = "ab";
                radioComponent.render();
                expect(radioComponent.$el.find("input").attr("name")).toBe("ab");

                radioComponent.id = 6;
                radioComponent.render();
                expect(radioComponent.$el.find("input").attr("name")).toBe("6");

            });

            it("should call onChange event when radio fires change event", function(done) {
                radioComponent = new RadioComponent({
                    isChecked: false,
                    onChange: function () {
                        done();
                    }
                });

                radioComponent.render();
                radioComponent.$el.find("input").change();
            });

        });
    };
});