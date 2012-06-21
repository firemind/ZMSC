Project = Model.extend({
  tests: ["id", "name"],

  getActivities: function() {
    return Collections.projects_activities.eachProject(this.id, function(pa) {
      return pa.getActivity();
    });
  },

  getBookings: function() {
    return Collections.bookings.where({project_id: this.id});
  },
  
  getTimeSpent: function() {
    sum = 0;
    $.each(this.getBookings(), function(i, booking) {
      sum += booking.getDurationMinutes();
    });
    return sum;
  },

  getTimeSpentFormated: function() {
    return MinutesToTime(this.getTimeSpent());
  }
});

Projects = Collection.extend({
  model: Project,
  collectionName: "projects",

  getChartData: function() {
    chartData = [];
    _.each(this.models, function(dataset) {
      chartData.push([dataset.get("name"), dataset.getTimeSpent()]);
    });
    return chartData;
  }
});
