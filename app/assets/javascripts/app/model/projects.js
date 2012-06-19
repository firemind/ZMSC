Project = Model.extend({
  tests: ["id", "name"],

  getActivities: function() {
    return projects_activities.eachProject(this.id, function(pa) {
      return pa.getActivities();
    });
  }
});

Projects = Collection.extend({
  model: Project,
  collectionName: "projects"
});

projects = new Projects();
projects.loadData();
