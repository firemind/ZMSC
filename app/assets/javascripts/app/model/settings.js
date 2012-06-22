// settings class
Settings = Backbone.Model.extend({
  // write to storage
  write: function() {
    localStorage.clear();
    JSONStorage.set("settings", this);
  },

  // create url
  getUrl: function(path) {
    return this.get("url") + "/" + path;
  },

  // change settings
  edit: function(username, password, url) {
    Collections.clearAll();
    // change data
    this.set(fillData(username, password, url));
    this.write(); // to storage
    this.login(); // relogin
  },

  // login to the server
  login: function(noReload) {
    if(noReload) {
      var complete = function(){}
    } else { 
      var complete = reloadPage;
    }
    $.ajax({
      type: 'POST',
      url: this.getUrl("login"),
      data: {
        username: this.get("username"),
        password: this.get("password")
      },
      complete: complete
    });
  },

  // load data from storage
  loadData: function() {
    var data = JSONStorage.get("settings") || {};
    this.set(fillData(
      data.username,
      data.password,
      data.url
    ));
    this.write();
    this.login(true);
  }
});

// get passed data or use default values
function fillData(usr, pw, url) {
  return {
    username: usr || "",
    password: pw || "",
    url: url || "http://mobile.zeira.ch"
  }
}


// reload the page
function reloadPage() {
  Collections.getBookings();
}

// create settings object
settings = new Settings();
settings.loadData();
