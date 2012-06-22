// helper for json
JSONHelper = {
  // to json string (data: object or Collection or Model)
  compile: function(data) {
    // if collection or model get JSON object
    if(data instanceof Backbone.Collection || data instanceof Backbone.Model) {
      data = data.toJSON();
    }
    // to string
    return JSON.stringify(data);
  },
  
  // from json string
  decompile: function(json) {
    return eval('(' + json + ')');
  }
};

// json console output
console.json = function(data) {
  console.debug(JSONHelper.compile(data));
};

// access localStorage with json
JSONStorage = {
  // read object from storage item <item>
  get: function(item) {
    return JSONHelper.decompile(localStorage.getItem(item));
  },
  
  // write object <value> to storage item <item>
  set: function(item, value) {
    localStorage.setItem(item, JSONHelper.compile(value));
  },
};
