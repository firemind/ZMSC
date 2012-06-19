Activity = Model.extend({
  tests: ["id", "name"],

  getProjects: function() {
    return projects_activities.eachActivity(this.id, function(pa) {
      return pa.getProjects();
    });
  }
});

Activities = Collection.extend({
  model: Activity,
  collectionName: "activities"
});

activities = new Activities()
activities.loadData();
