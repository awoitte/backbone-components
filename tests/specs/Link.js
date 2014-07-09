define(['Components/Basic/link', 'backbone'], function(LinkComponent, Backbone) {
    return function() {
        var model = new Backbone.Model({
            prop: "name"
        });
        var linkComponent = new LinkComponent({
            model: model,
            property: "prop"
        });
        linkComponent.render();

        describe("Link Component", function() {

            it("should render as an anchor tag", function() {
                expect(linkComponent.$el.is("a")).toBe(true);
            });

            it("should use its models property as its text", function() {
                expect(linkComponent.$el.html()).toBe("name");
            });

            it("should call onClick function on click", function(done) {
                var linkComponent2 = new LinkComponent({
                    model: model,
                    property: "prop",
                    onClick: function () {
                        done();
                    }
                });
                linkComponent2.render();
                linkComponent2.$el.click();
            });

        });
    };
});