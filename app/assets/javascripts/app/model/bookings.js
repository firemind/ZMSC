// Model for bookings
Booking = Model.extend({
  // needed tests
  tests: ["date", "start_time", "end_time", "project_id", "activity_id"],

  validate: function(attr) {
    console.debug("validate");
    Model.prototype.validate(aparseDates(attr));
  },

  defaults: {
    date: new Date(),
    start_time: new Date(),
    comment: ''
  },

  // get the activity object
  getActivity: function() {
    return Collections.activities.get(this.get("activity_id"));
  },
  
  // get the project object
  getProject: function() {
    return Collections.projects.get(this.get("project_id"));
  },

  // get the duration, formatted as <format> or "H:MM"
  getDuration: function(format) {
    // set default format
    if(!format) { format = "H:MM"; }
    duration = diffTimes(this.get("start_time"), this.get("end_time"));
    // format the duration
    return toTime(duration, format);
  },

  getDurationMinutes: function() {
    duration = diffTimes(this.get("start_time"), this.get("end_time"));
    return duration.getHours() * 60 + duration.getMinutes();
  },

  // get the end time, formatted as <format> or default time-format (HH:MM)
  getEndTime: function(format) {
    return (this.get("end_time") != undefined) ? toTime(this.get("end_time"), format) : "";
  },

  // get the start time, formatted as <format> or default time-format (HH:MM)
  getStartTime: function(format) {
    return toTime(this.get("start_time"), format);
  },

  // get the date, formatted as <format> or default date-format (dd:mm:yyyy)
  getDate: function(format) {
    return toDate(this.get("date"), format);
  },

  // get the date, formatted for the main layout (dddd d:m)
  getDateWeekday: function() {
    return this.getDate("dddd d.m");
  },
  
  set: function(attrs, options) {
    this.on("error", function(model, msg) {
      console.error(msg);
      $.mobile.showPageLoadingMsg( $.mobile.pageLoadErrorMessageTheme, msg, true );
      setTimeout( $.mobile.hidePageLoadingMsg, 2000 );
    });
    return Backbone.Model.prototype.set.call(this, attrs, options);
  }
});

// Colection for all bookings (model Booking)
Bookings = Collection.extend({
  model: Booking,
  collectionName: "bookings",

  // create new Booking (with data upload)
  create: function(r, options) {
    // set needed data
    var data = {
      date: r.date,
      start_time: r.start_time,
      project_id: r.project_id,
      activity_id: r.activity_id
    };

    // set optional data
    if(r.end_time) { data.end_time = r.end_time; }
    if(r.comment) { data.comment = r.comment; }

    var b = new Booking();
    if(!b.set(data)) { return false; }

    this.add(b);
    
    this.upload(b.toJSON());
    //return Backbone.Collection.prototype.create.call(this, data, options);
    return b;
  },
  
  upload: function(data) {
    // to json
    if(ZeiraMobile.config.position != null){
      data.pos_lat= ZeiraMobile.config.position.coords.latitude;
      data.pos_lng= ZeiraMobile.config.position.coords.longitude;
    }else{
      console.debug("position is null");
      console.dir(ZeiraMobile.config.position);
    }
    // upload to server
    $.post(this.url(), {booking: data});
    this.trigger("dataload");
  }
});
