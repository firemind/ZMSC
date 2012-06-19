settings.edit("John", "secret");

JSONStorage.set("projects", [{id: 1, name: "project1"}]);
JSONStorage.set("activities", [{id: 1, name: "activity1"}]);
JSONStorage.set("activities_projects", [{project_id: 1, activity_id: 1}]);
JSONStorage.set("bookings", [{
  id: 1,
  date: "2012-01-01T00:00:00Z",
  start_time: "2000-01-01T07:45:00Z",
  end_time: "2000-01-01T08:45:00Z",
  comment: "wichtige arbeit erledigt",
  project_id: 1,
  activity_id: 1
}]);
