// create a pie chart in the field #id with the data
function renderPiechart(id, data){
  $.jqplot(id, [data], {
    seriesDefaults: {
      // Make this a pie chart.
      renderer: jQuery.jqplot.PieRenderer, 
      rendererOptions: {
        // Put data labels on the pie slices.
        // By default, labels show the percentage of the slice.
        showDataLabels: true
      }
    }, 
    //seriesColors: [ "#5897C8", "#313131", "#207ECE", "#222222", "#29ABE2", "#404040"],
    grid:{ background: "transparent"} ,
    legend: { show:true, location: 'e' }
  }).redraw();
}

// render activity chart for project <projectID>
function renderActivityChart(projectID){
  renderPiechart(
    'activity_chartdiv',
    Collections.activities.getChartData(projectID)
  );
}

//render project chart
function renderProjectChart(){
  renderPiechart(
    'project_chartdiv',
    Collections.projects.getChartData()
  );
}
