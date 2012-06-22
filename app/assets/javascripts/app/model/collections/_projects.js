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
    $.merge(this.activities, this.project.activities);
    delete this.project.activities;
  },

  // entry to foreign key
  getFKArray: function() {
    // each activity
    for(i in this.project.activities) {
      // add to projects_activities
      this.writeProjectsActivities(this.project.id, this.project.activities[i].id);
    }
  },

  // write projects_activities
  writeProjectsActivities: function(p_id, a_id) {
    this.projects_activities.push({
      project_id: p_id,
      activity_id: a_id
    });
  },

  add: function() { // add to models
    Collections._helpers.addData({
      projects_activities: this.projects_activities,
      activities: this.activities,
      projects: this.projects
    });
  }
}
