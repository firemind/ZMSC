JSONStorage = function() {};
JSONStorage.get = function(item) {
  return eval('(' + localStorage.getItem(item) + ')');
}
  
JSONStorage.set = function(item, value) {
  if(value instanceof Backbone.Collection || value instanceof Backbone.Model) {
    value = value.toJSON();
  }
  localStorage.setItem(item, JSON.stringify(value));
}
