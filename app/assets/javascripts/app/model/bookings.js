// Model for bookings
Booking = Model.extend({
  // needed tests
  tests: ["date", "start_time", "project_id", "activity_id"],

  defaults: {
    date: new Date(),
    start_time: new Date(),
    comment: ''
  },

  // get the activity object
  getActivity: function() {
    Collectionsactivities.where({id: this.activity_id})[0];
  },
  
  // get the project object
  getProject: function() {
    Collections.projects.where({id: this.project_id})[0];
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
  set: function(attributes, options) {
    var aDate;
    if (attributes.start_time){
        aDate = new Date.parseExact(attributes.start_time, 'HH:mm');
        if ( Object.prototype.toString.call(aDate) === "[object Date]" && !isNaN(aDate.getTime()) ){
            attributes.start_time = aDate;
        }
    }
    if (attributes.end_time){
        aDate = new Date.parseExact(attributes.end_time, 'HH:mm');
        if ( Object.prototype.toString.call(aDate) === "[object Date]" && !isNaN(aDate.getTime()) ){
            attributes.end_time = aDate;
        }
    }
    if (attributes.date){
        aDate = new Date.parseExact(attributes.date, 'd.M.yyyy');
        if ( Object.prototype.toString.call(aDate) === "[object Date]" && !isNaN(aDate.getTime()) ){
            attributes.date = aDate;
        }
    }
    return Backbone.Model.prototype.set.call(this, attributes, options);
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

    this.upload(data);
    //return Backbone.Collection.prototype.create.call(this, data, options);
  },
  
  upload: function(data) {
    // to json
    getLocation();
    if(ZeiraMobile.config.position != null){
      data.position = ZeiraMobile.config.position;
    }
    // upoad to server
    $.post(this.url(), {booking: data});
  }
});
