# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create!(username: 'John', password: 'secret')
Project.create!(name: 'Project 1')
Project.create!(name: 'Project 2')
Project.create!(name: 'Project 3')
Activity.create!(name: 'Activity 1')
Activity.create!(name: 'Activity 2')
Activity.create!(name: 'Activity 3')
