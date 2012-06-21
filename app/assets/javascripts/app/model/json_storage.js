JSONHelper = {
  compile: function(data) {
    if(data instanceof Backbone.Collection || data instanceof Backbone.Model) {
      data = data.toJSON();
    }
    return JSON.stringify(data);
  },

  decompile: function(json) {
    return eval('(' + json + ')');
  }
};

console.json = function(data) {
  console.debug(JSONHelper.compile(data));
};

JSONStorage = {
  get: function(item) {
    return JSONHelper.decompile(localStorage.getItem(item));
  },
  
  set: function(item, value) {
    localStorage.setItem(item, JSONHelper.compile(value));
  },
};
