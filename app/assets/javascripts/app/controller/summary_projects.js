$(document).ready(function(){
  window.OneSummaryProjectView = Backbone.View.extend({
    tagName: 'li',

    template: _.template($('#summary_project_ele').html()),

    render:function (eventName) {
      this.$el.html(this.template({m:this.model }));
      this.$el.jqmData('projectId', this.model.get('id'));
      this.$el.bind('click', function(){
        project = Collections.projects.get($(this).jqmData('projectId'));
        saView = new SummaryActivitiesView({model: project});
        saView.render();
      });
      return this;
    }
  });
  window.SummaryProjectsView = Backbone.View.extend({
    el: $("#summary_projects"),
    list: "#summary_projects_list",

    addAll: function(){
      $(this.list).empty();
      
      _.each(Collections.projects.models, function(project) {
        view = new OneSummaryProjectView({model: project});
        $(this.list).append(view.render().el);
      }, this);
    },
    initialize: function(){
      this.collection.on('dataload', this.addAll, this);
    }
  });
  new SummaryProjectsView({collection: Collections.projects});
});

$("#summary_projects").live('pageinit', function(){
  Collections.getProjects();
});

$("#summary_projects").live('pageshow', function(){
  renderProjectChart();
  $("#summary_projects_list").trigger("create");
  $("#summary_projects_list").listview();
  $("#summary_projects_list").listview("refresh");
});
