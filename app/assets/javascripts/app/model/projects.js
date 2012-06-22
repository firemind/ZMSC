// Project model
Project = Model.extend({
  // define tests
  tests: ["id", "name"],

  // get all activities
  getActivities: function() {
    return Collections.projects_activities.eachProject(this.id, function(pa) {
      // get the activity
      return pa.getActivity();
    });
  },

  // get all bookings
  getBookings: function() {
    return Collections.bookings.where({project_id: this.id});
  },
  
  // get the time spent
  getTimeSpent: function() {
    sum = 0;
    $.each(this.getBookings(), function(i, booking) {
      // count duration
      sum += booking.getDurationMinutes();
    });
    return sum;
  },

  // format getTimeSpent
  getTimeSpentFormated: function() {
    return MinutesToTime(this.getTimeSpent());
  }
});

// projects class (model: Project)
Projects = Collection.extend({
  model: Project,
  collectionName: "projects",

  // get the chart data
  getChartData: function() {
    chartData = [];
    // for each project
    _.each(this.models, function(dataset) {
      // read chart data
      chartData.push([dataset.get("name"), dataset.getTimeSpent()]);
    });
    return chartData;
  }
});
