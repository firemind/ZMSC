# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)



["users", "projects", "activities", "activities_projects", "bookings"].each {|table_name|
  ActiveRecord::Base.connection.execute("DELETE FROM #{table_name}")
}

ActiveRecord::Base.connection.execute("VACUUM")

User.create!(id: 1, username: 'John', password: 'secret')
Project.create!(name: 'Project 1')
Project.create!(name: 'Project 2')
Project.create!(name: 'Project 3')
Activity.create!(name: 'Activity 1')
Activity.create!(name: 'Activity 2')
Activity.create!(name: 'Activity 3')
ActivityProject.create!(activity_id: 1, project_id: 1)
ActivityProject.create!(activity_id: 1, project_id: 2)
ActivityProject.create!(activity_id: 1, project_id: 3)
ActivityProject.create!(activity_id: 2, project_id: 2)
ActivityProject.create!(activity_id: 2, project_id: 3)
ActivityProject.create!(activity_id: 3, project_id: 3)
Booking.create!(date: '19.06.2012', start_time: '07:45', end_time: '09:30', comment: 'Alles ok',  activity_id: 2, project_id: 3, user_id: 1)
Booking.create!(date: '19.06.2012', start_time: '10:45', end_time: '11:30', comment: 'Alles ok',  activity_id: 2, project_id: 3, user_id: 1)
Booking.create!(date: '19.06.2012', start_time: '13:45', end_time: '15:30', comment: 'Alles ok',  activity_id: 2, project_id: 3, user_id: 1)
Booking.create!(date: '18.06.2012', start_time: '07:45', end_time: '09:30', comment: 'Alles ok',  activity_id: 2, project_id: 3, user_id: 1)
Booking.create!(date: '18.06.2012', start_time: '10:45', end_time: '11:30', comment: 'Alles ok',  activity_id: 2, project_id: 3, user_id: 1)
Booking.create!(date: '18.06.2012', start_time: '13:45', end_time: '15:30', comment: 'Alles ok',  activity_id: 2, project_id: 3, user_id: 1)
Booking.create!(date: '18.06.2012', start_time: '15:45', end_time: '17:30', comment: 'Alles ok',  activity_id: 2, project_id: 3, user_id: 1)
Booking.create!(date: '18.06.2012', start_time: '17:45', end_time: '19:30', comment: 'Alles ok',  activity_id: 2, project_id: 3, user_id: 1)
Booking.create!(date: '17.06.2012', start_time: '07:45', end_time: '17:30', comment: 'Alles ok',  activity_id: 2, project_id: 3, user_id: 1)
Booking.create!(date: '16.06.2012', start_time: '07:45', end_time: '16:30', comment: 'Alles ok',  activity_id: 2, project_id: 3, user_id: 1)
Booking.create!(date: '15.06.2012', start_time: '07:45', end_time: '17:20', comment: 'Alles ok',  activity_id: 2, project_id: 3, user_id: 1)
