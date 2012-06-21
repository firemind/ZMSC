// ProjectActivity class
ProjectActivity = Model.extend({
  // define tests
  tests: ["project_id", "activity_id"],

  // get the activity
  getActivity: function() {
    return Collections.activities.get(this.get("activity_id"));
  },
  
  // get the project
  getProject: function() {
    return Collections.projects.get(this.get("project_id"));
  }
});

ProjectsActivities = Collection.extend({
  model: ProjectActivity,
  collectionName: "activities_projects",

  eachWhere: function(conditions, func) {
    var toReturn = [];
    var all = this.where(conditions)
    for(var i in all) {
      toReturn.push(func(all[i]));
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
