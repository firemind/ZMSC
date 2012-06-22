$(document).ready(function(){
  // list element
  window.OneSummaryProjectView = Backbone.View.extend({
    tagName: 'li',

    template: _.template($('#summary_project_ele').html()),

    render:function (eventName) {
      // render template
      this.$el.html(this.template({m:this.model }));
      // set project id
      this.$el.jqmData('projectId', this.model.get('id'));
      // onclick
      this.$el.bind('click', function(){
        project = Collections.projects.get($(this).jqmData('projectId'));
        // render ths SummaryActivities view
        console.debug(project.get("id"));
        saView = new SummaryActivitiesView({model: {activities: project.getActivities(), project_id: project.get("id")}});
        saView.render();
      });
      return this;
    }
  });
  window.SummaryProjectsView = Backbone.View.extend({
    el: $("#summary_projects"),
    list: "#summary_projects_list",

    // add all list elements
    addAll: function(){
      // empty the list
      $(this.list).empty();
      
      // for each project
      _.each(Collections.projects.models, function(project) {
        // create list element
        view = new OneSummaryProjectView({model: project});
        // append rendered list element to the list
        $(this.list).append(view.render().el);
      }, this);
    },
    initialize: function(){
      // addAll when the data is loaded
      this.collection.on('dataload', this.addAll, this);
    }
  });
  new SummaryProjectsView({collection: Collections.projects});
});

// when page is initialized get Projects
$("#summary_projects").live('pageinit', function(){
  Collections.getProjects();
});

$("#summary_projects").live('pageshow', function(){
  // render project chart
  renderProjectChart();
  // rerender listview
  $("#summary_projects_list").trigger("create");
  $("#summary_projects_list").listview();
  $("#summary_projects_list").listview("refresh");
});
