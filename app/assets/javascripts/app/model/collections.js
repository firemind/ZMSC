// get last element from array
function last(array) {return array[array.length-1];}

// collection list
Collections = {
  urls: {
    bookings: "me",
    projects: "me/projects"
  },

  // all collections
  activities: new Activities(),
  projects: new Projects(),
  projects_activities: new ProjectsActivities(),
  bookings: new Bookings(),
  
  // get all bookings
  getBookings: function() { this.fetch(this.urls.bookings); },
  // get all projects
  getProjects: function() { this.fetch(this.urls.projects); },

  // fetch data from <url> (just page-name)
  fetch: function(url) {
    $.ajax({
      url: settings.getUrl(url),
      success: function(data, txtStatus, jqXHR) {
        // get json data
        data = JSONHelper.decompile(jqXHR.responseText);
        Collections.assignData(data, jqXHR.collection);
      }
    }).collection = url; // pass url
  },
  
  // assign data to models
  assignData: function(data, collection) {
    // for collection name
    switch(collection) {
      case this.urls.bookings: // if page bookings
        this._bookings.save(data);
        break;
      case this.urls.projects: // if page projects
        this._projects.save(data);
        break;
    }
  },
};
