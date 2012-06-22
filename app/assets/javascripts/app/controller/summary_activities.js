$(document).ready(function(){
  // list element
  window.OneSummaryActivityView = Backbone.View.extend({
      tagName: 'li',

      template: _.template($('#summary_activity_ele').html()),

      render:function (eventName) {
        // render template
        this.$el.html(this.template({
          m:this.model,
          timeSpent: this.model.getTimeSpentFormated(saProjectID)
        }));
        return this;
      }
  });

  // full view
  window.SummaryActivitiesView = Backbone.View.extend({
    el: $("#summary_activities"),
    list: "#summary_activities_list",

    render: function(){
      // set project id
      saProjectID = this.model.project_id;
      console.debug(this.model.activities);
      // empty the list
      $(this.list).empty();
      // for each activity
      _.each(this.model.activities, function(activity) {
        // create list element view
        var view = new OneSummaryActivityView({model: activity});
        // append the rendered list element view
        $(view.render().el).appendTo(this.list);
      }, this);
    }
  });
});

$("#summary_activities").live('pageshow', function(){
  console.debug(saProjectID);
  // render activity chart
  renderActivityChart(saProjectID);
  // rerender the listview
  $("#summary_activities_list").trigger("create");
  $("#summary_activities_list").listview();
  $("#summary_activities_list").listview("refresh");
});
