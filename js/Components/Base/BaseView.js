var BaseView = Backbone.View.extend({

    initialize: function(options){
        _.extend(this, options);
    },

  //THIS FUNCTION WILL LIKELY BE OVERWRITTEN
  //clean up anything that might require cleaning on view destruction
  destroy: function () {

  },

  getTagName: function () {
    return this.tagName || "div";
  }


});

export default BaseView;
