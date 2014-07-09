define(['Components/Base/ComponentView'], function(ComponentView) {
    return function() {
        var componentView = new ComponentView();

        describe("Component View", function() {

            it("should have a 'components' property even when not provided one", function() {
                expect(componentView.components).toBeDefined();
            });

            it("should use the 'components' property that it is provided", function() {
                var components = {
                    "div": new ComponentView()
                };
                var componentsView = new ComponentView({
                    components: components
                });

                expect(componentsView.components).toBe(components);
            });

            it("should create and attach a sub component on initialize", function() {
                var componentsView = new ComponentView({
                    component: ComponentView,
                    componentOptions: {}
                });

                expect(componentsView.components["div"]).toBeDefined();
                expect(componentsView.components["div"].components).toBeDefined();
            });

            it("should send componentOptions property to new sub component", function() {
                var componentsView = new ComponentView({
                    component: ComponentView,
                    componentOptions: {
                        tagName: "p"
                    }
                });

                componentsView.render();

                expect(componentsView.components["div"].$el).toBeDefined();
                expect(componentsView.components["div"].$el.is("p")).toBeTruthy();
            });

            it("should set model of sub component if forwardModel option is true", function() {
                var componentsView = new ComponentView({
                    model: {
                        test: "test"
                    },
                    component: ComponentView,
                    forwardModel: true,
                    componentOptions: {
                        property: "test",
                        template: "{{test}}"
                    }
                });

                componentsView.render();

                expect(componentsView.components["div"].$el).toBeDefined();
                expect(componentsView.components["div"].$el.html()).toBe("test");

                //test that it keeps model up to date
                componentsView.setModel({
                    test: "new"
                });
                componentsView.render();

                expect(componentsView.components["div"].$el).toBeDefined();
                expect(componentsView.components["div"].$el.html()).toBe("new");
            });

            it("should render its sub components on render", function() {
                var subComponent = new ComponentView();

                subComponent.render = jasmine.createSpy();

                var components = {
                    "div": subComponent
                };

                var componentsView = new ComponentView({
                    components: components
                });

                componentsView.render();

                expect(subComponent.render).toHaveBeenCalled();
            });

            it("should attach sub components to appropriate elements on render when that element is itself", function() {
                var subComponent = new ComponentView({
                    tagName: "p"
                });

                var components = {
                    "div": subComponent
                };

                var componentsView = new ComponentView({
                    components: components
                });

                componentsView.render();

                expect(componentsView.$el.html()).toBe("<p></p>");
            });

            it("should attach sub components to appropriate elements on render when that element is not itself", function() {
                var subComponent = new ComponentView({
                    tagName: "p"
                });

                var components = {
                    ".socket": subComponent
                };

                var componentsView = new ComponentView({
                    components: components,
                    template: "<div class='socket'></div>"
                });

                componentsView.render();

                expect(componentsView.$el.find(".socket").html()).toBe("<p></p>");
            });

            it("should provide a way to execute a function on each of its components", function(done) {
                var subComponent = new ComponentView();

                var components = {
                    "div": subComponent
                };

                var componentsView = new ComponentView({
                    components: components
                });

                componentsView.eachComponent(function(component, prop) {
                    expect(component).toBe(subComponent);
                    expect(prop).toBe("div");
                    done();
                });
            });

            it("should destroy its sub components on destroy", function() {
                var subComponent = new ComponentView();

                subComponent.destroy = jasmine.createSpy();

                var components = {
                    "div": subComponent
                };

                var componentsView = new ComponentView({
                    components: components
                });

                componentsView.destroy();

                expect(subComponent.destroy).toHaveBeenCalled();
            });

        });
    };
});