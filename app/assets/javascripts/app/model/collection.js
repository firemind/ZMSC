Collection = Backbone.Collection.extend({
  loadData: function() {
    this.url = settings.getUrl(this.collectionName),
    this.fetch({error: this.loadStorage, success: this.saveStorage});
    this.loadStorage(this);
  },

  loadStorage: function(collection) {
    data = JSONStorage.get(collection.collectionName);
    collection.add(data);
    collection.trigger("dataload");
  },

  saveStorage: function(collection) {
    JSONStorage.set(collection.collectionName, collection);
    collection.trigger("dataload");
  }
});
