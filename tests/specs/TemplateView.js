define(['Components/Base/TemplateView', 'backbone'], function(TemplateView, Backbone) {
    return function() {
        var templateView = new TemplateView();

        describe("Template View", function() {
            it("should set it's template to a blank string if none is provided", function() {
                expect(templateView.options.template).toBe("");
            });

            it("should set it's model to a blank string if none is provided", function() {
                expect(templateView.getModel()).toBe("");
            });

            it("should set it's model property when setModel is called", function() {
                templateView.setModel("test");
                expect(templateView.getModel()).toBe("test");
            });

            it("should get it's model property when getModel is called", function() {
                templateView.setModel("test2");
                expect(templateView.getModel()).toBe("test2");
            });

            it("should listen to its model if it's a backbone model and call render if that model changes", function() {
                templateView.render = jasmine.createSpy();
                var model = new Backbone.Model();

                templateView.setModel(model);

                model.trigger("change");

                expect(templateView.render).toHaveBeenCalled();
            });

            it("should fill its element with its template on render", function() {
                var renderedView = new TemplateView({
                    template: "test3"
                });

                renderedView.render();

                expect(renderedView.$el.html()).toBe("test3");
            });

            it("should use mustache to inject its model into its view", function() {
                var mustacheView = new TemplateView({
                    template: "{{data}}",
                    model: {
                        data: "test4"
                    }
                });

                mustacheView.render();

                expect(mustacheView.$el.html()).toBe("test4");
            });

            it("should use mustache to inject its model into its view as JSON when its model is a backbone model", function() {
                var mustacheView = new TemplateView({
                    template: "{{data}}",
                    model: new Backbone.Model({
                        data: "test5"
                    })
                });

                mustacheView.render();

                expect(mustacheView.$el.html()).toBe("test5");
            });
        });
    };
});