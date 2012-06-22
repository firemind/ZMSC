Collections._bookings = { // bookings helper
  save: function(data) { // save bookings to model
    this.bookings = []; this.projects = []; this.activities = [];

    // set url and id
    Collections.id = data.id;
    Collections.url = data.url;

    this.eachBooking(data.bookings);
    this.add(); // add to models
  },

  eachBooking: function(bookings) {
    for(i in bookings) { // each data
      this.booking = bookings[i];
      this.get(); // get data
      this.booking = parseDates(this.booking); // convert dates
      this.bookings.push(this.booking); // collect booking
    }
  },
    
  get: function() { // get data
    var project; var activity;
    // project and activity entry to foreign key
    this.getFK("projects", "project");
    this.getFK("activities", "activity");
  },
  
  // entry to foreign key
  getFK: function(table, fk) {
    this[table].push(this.booking[fk]);
    delete this.booking[fk];
    this.booking[fk + "_id"] = last(this[table]).id;
  }, 

  convertDates: function() { // convert dates
    this.booking.date = getDate(this.booking.date);
    this.booking.start_time= new Date(this.booking.start_time);
    if(this.booking.end_time != null) {
      this.booking.end_time= new Date(this.booking.end_time);
    }
  },

  add: function() { // add to models
    Collections._helpers.addData({
      projects: this.projects,
      activities: this.activities,
      bookings: this.bookings
    });
  }
}
