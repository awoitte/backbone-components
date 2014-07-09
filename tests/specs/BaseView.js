define(['Components/Base/BaseView'], function(BaseView) {
    return function() {
        var baseView = new BaseView();

        describe("Base View", function() {
            it("should implement a default destroy function to be extended", function() {
                expect(baseView.destroy).toBeDefined();
            });

            it("should be able to retrieve its own tagname using the function getTagName", function () {
                var paragraphView = new BaseView({
                    tagName : "p"
                });

                expect(paragraphView.getTagName()).toBe("p");
            });

            it("should be able to retrieve its own tagname using the function getTagName when none is specified", function () {
                var divView = new BaseView();

                expect(divView.getTagName()).toBe("div");
            });
        });
    };
});