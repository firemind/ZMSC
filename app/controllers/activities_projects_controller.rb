class ActivitiesProjectsController < ApplicationController
  def index
   render json: ActivityProject.all.map{|ap| {activity_id:  ap.activity_id,project_id: ap.project_id} }
   #render json: { activities: current_user.activities.map{|a|
     #{ id: a.id, projects: a.projects.map{|p| { id: p.id } } }
   #}}
  end 
end
