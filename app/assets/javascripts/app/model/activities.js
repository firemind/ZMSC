// model for activities
Activity = Model.extend({
  // the needed tests
  tests: ["id", "name"],

  // get all projects of the activity
  getProjects: function() {
    return Collections.projects_activities.eachActivity(this.id, function(pa) {
      return pa.getProject();
    });
  },

  getBookings: function(project_id) {
    var condition = {activity_id: this.get("id")};
    if(project_id) { condition.project_id = project_id; }
  
    return Collections.bookings.where(condition);
  },
  
  getTimeSpent: function(project_id) {
    sum = 0;
    $.each(this.getBookings(), function(i, booking) {
      sum += booking.getDurationMinutes();
    });
    return sum;
  },

  getTimeSpentFormated: function(project_id) {
    return MinutesToTime(this.getTimeSpent(project_id));
  }
});

// collection for activities (model: Activity)
Activities = Collection.extend({
  model: Activity,
  collectionName: "activities",

  getChartData: function(project_id) {
    chartData = [];
    var activities = Collections.projects_activities.eachProject(project_id, function(pa) {
      return pa.getActivity();
    });
    _.each(activities, function(dataset) {
      chartData.push([dataset.get("name"), dataset.getTimeSpent()]);
    });
    return chartData;
  }
});
