Settings = Backbone.Model.extend({
  save: function() {
    JSONStorage.set("settings", this);
  },
  
  completeUrl: function() {
  },
  
  getUrl: function(path) {
    return "http://" + this.get("url") + "/" + path;
  },

  edit: function(username, password, url) {
    this.set(fillData(username, password, url));
    this.save();
    $.post(this.getUrl("login"), {username: username, password: password});
  }
});

function fillData(usr, pw, url) {
  return {
    username: usr || "",
    password: pw || "",
    url: url || "mobile.zeira.ch"
  }
}

function getData() {
  var data = JSONStorage.get("settings");
  if(!data) {
    data = fillData();
    JSONStorage.set("settings", data);
  }
  return data;
}
  
settings = new Settings(getData());
