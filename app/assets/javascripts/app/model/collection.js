// collection class
Collection = Backbone.Collection.extend({
  // add new data (just locally)
  addData: function(data) {
    if(data) { // if data loaded
      // add to models
      this.add(data);
      // save to storage
      this.saveStorage();
    } else { // if no data loaded (offline)
      // load data from storage
      this.loadStorage();
    }
    // call event
    this.trigger("dataload");
  },
 
  loadStorage: function() {
    this.add(JSONStorage.get(this.collectionName));
  },
  
  saveStorage: function() {
    JSONStorage.set(this.collectionName, this);
  },

  // prepare own url
  url: function() {
    return settings.getUrl(this.collectionName);
  }
});
