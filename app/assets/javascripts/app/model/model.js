// model class
Model = Backbone.Model.extend({
  tests: [],

  // validate the attributes
  validate: function(attr) {
    return Validator.run(attr, this.tests);
  }
});
