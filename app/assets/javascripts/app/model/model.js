Model = Backbone.Model.extend({
  tests: [],

  validate: function(attr) {
    return Validator.run(attr, this.tests);
  }
});
