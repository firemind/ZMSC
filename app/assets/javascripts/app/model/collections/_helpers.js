Collections._helpers = { // helpers
  // add data to collections
  addData: function(data) {
    for(key in data) {
      if(Collections[key]) {
        Collections[key].addData(data[key]);
      }
    }
  }
};
