Collections._projects = { // projects helper
  save: function(data) { // save projects to model
    this.projects = []; this.activities = []; this.projects_activities = [];

    this.eachProject(data);
    this.add(); // add to models
  },

  eachProject: function(projects) {
    for(i in projects) { // each data
      this.project = projects[i];
      this.get(); // get data
      this.projects.push(this.project); // collect project
    }
  },
    
  get: function() { // get data
    var activity;
    // project and activity entry to foreign key
    this.getFKArray();
  },

  // entry to foreign key
  getFKArray: function() {
    // each activity
    for(i in this.project.activities) {
      // add to projects_activities
      this.projects_activities.push({
        project_id: this.project.id,
        activity_id: this.project.activities[i].id
      });
    }
    $.merge(this.activities, this.project.activities);
    delete this.project.activities;
  },

  add: function() { // add to models
    Collections._helpers.addData({
      projects: this.projects,
      projects_activities: this.projects_activities,
      activities: this.activities
    });
  }
}
