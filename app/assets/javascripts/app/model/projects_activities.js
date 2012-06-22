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

// ProjectsActivities class (model: ProjectActivity)
ProjectsActivities = Collection.extend({
  model: ProjectActivity,
  collectionName: "activities_projects",

  /*
   * call func for each ProjectActivity which matches <conditions>
   * get array of the return values of func
   */
  eachWhere: function(conditions, func) {
    var toReturn = [];
    var all = this.where(conditions)
    for(var i in all) {
      toReturn.push(func(all[i]));
    }
    return toReturn;
  },

  // call eachWhere with activity_id = <id>
  eachActivity: function(id, func) {
    return this.eachWhere({activity_id: id}, func);
  },

  // call eachWhere with project_id = <id>
  eachProject: function(id, func) {
    return this.eachWhere({project_id: id}, func);
  },

  oldAddData: Collection.prototype.addData,

  addData: function(datas) {
    _.each(datas, function(data) {
      if(this.where(data).length == 0) {
        this.oldAddData(data);
      }
    }, this);
  }
});
