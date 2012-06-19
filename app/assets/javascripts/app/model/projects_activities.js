ProjectActivity = Model.extend({
  tests: ["project_id", "activity_id"],

  getActivities: function() {
    return activities.where({id: this.get("activity_id")});
  },
  
  getProjects: function() {
    return projects.where({id: this.get("project_id")});
  }
});

ProjectsActivities = Collection.extend({
  model: ProjectActivity,
  collectionName: "activities_projects",

  eachWhere: function(conditions, func) {
    var toReturn = [];
    var all = this.where(conditions)
    for(var i in all) {
      $.merge(toReturn, func(all[i]));
    }
    return toReturn;
  },

  eachActivity: function(id, func) {
    return this.eachWhere({activity_id: id}, func);
  },

  eachProject: function(id, func) {
    return this.eachWhere({project_id: id}, func);
  }
});

projects_activities = new ProjectsActivities();
projects_activities.loadData();
