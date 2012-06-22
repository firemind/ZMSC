// collection class
Collection = Backbone.Collection.extend({
  clear: function() {
    this.remove(this.models);
  },

  // add new data (just locally)
  addData: function(datas) {
    if(datas) { // if data loaded
      if(!(datas instanceof Array)) { datas = [datas]; }
      _.each(datas, function(data) {
        // add to models
        //console.json(data);
        try{
          this.add(data);
        } catch(err){
          console.error(err);//.get_message());
        }
      },this);
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
