class ProjectsController < ApplicationController
  def index
    @projects = current_user.projects
    render json: @projects
  end

  def show
    @project = Project.find(params[:id])

    render json: @project
  end
end
