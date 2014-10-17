define(['Components/Basic/table', 'Components/Base/Component', 'backbone'], function(TableComponent, Component, Backbone) {
    return function() {
        var model = new Backbone.Model({
                prop: "name"
            }),
            collection = new Backbone.Collection(),
            table = new TableComponent({
                model: model,
                property: "prop",
                rowComponent: Component,
                rowOptions: {

                }
            });



        //collection.add(model);

        function initTable (tableOptions, rowOptions) {
            table = new TableComponent(_.extend({}, tableOptions, {
                model: collection,
                rowComponent: Component,
                rowOptions: rowOptions || {}
            }));

            table.render();
        }

        describe("Table Component", function() {

            it("should provide a default table DOM structure", function() {
                initTable();

                expect(table.el.outerHTML).toBe("<table><tbody></tbody></table>");
            });

            it("should add a row to the table for each model in collection", function() {
                initTable();

                collection.add({});

                expect(table.el.outerHTML).toBe("<table><tbody><tr></tr></tbody></table>");

                collection.reset();
            });

            it("should provide access to top table element with the table template option", function() {

                initTable({
                    template: "<thead></thead>"
                });

                expect(table.el.outerHTML).toBe("<table><thead></thead><tbody></tbody></table>");

            });

            it("should apply rowOptions to each row component", function() {
                initTable({}, {
                    property: "prop",
                    template: "<div>{{data}}</div>"
                });

                collection.add({
                    prop: "Test"
                });

                expect(table.el.outerHTML).toBe("<table><tbody><tr><div>Test</div></tr></tbody></table>");

                collection.reset();
            });

            it("should update it's collection on setModel", function() {

                initTable();

                collection.add({});

                expect(table.el.outerHTML).toBe("<table><tbody><tr></tr></tbody></table>");

                table.setModel(new Backbone.Collection());
                table.render();

                expect(table.el.outerHTML).toBe("<table><tbody></tbody></table>");
            });

        });
    };
});