$(document).ready(function(){
  window.OneSummaryActivityView = Backbone.View.extend({
      tagName: 'li',

      template: _.template($('#summary_activity_ele').html()),

      render:function (eventName) {
        this.$el.html(this.template({m:this.model }));
        return this;
      }
  });
  window.SummaryActivitiesView = Backbone.View.extend({
    el: $("#summary_activities"),
    list: "#summary_activities_list",

    initialize: function(){
      saProjectID = this.model.get("id");
      $(this.list).empty();
      _.each(this.model.getActivities(), function(activity) {
        var view = new OneSummaryActivityView({model: activity});
        $(view.render().el).appendTo(this.list);
      }, this);
    }
  });
});

$("#summary_activities").live('pageshow', function(){
  renderActivityChart(saProjectID);
  $("#summary_activities_list").trigger("create");
  $("#summary_activities_list").listview();
  $("#summary_activities_list").listview("refresh");
});
