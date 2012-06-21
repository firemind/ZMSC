Settings = Backbone.Model.extend({
  write: function() {
    localStorage.clear();
    JSONStorage.set("settings", this);
  },

  getUrl: function(path) {
    return "http://" + this.get("url") + "/" + path;
  },

  edit: function(username, password, url) {
    console.debug("edit");
    this.set(fillData(username, password, url));
    this.write();
    this.login();
  },

  login: function() {
    $.ajax({
      type: 'POST',
      url: this.getUrl("login"),
      data: {
        username: this.get("username"),
        password: this.get("password")
      },
      complete: reloadPage
    });
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
  return fillData(
    data.username,
    data.password,
    data.url
  );
}

function reloadPage() {
  $("#booking-lists").empty();
  Collections.getBookings();
}
  
settings = new Settings(getData());
