class ActivitiesController < ApplicationController
  def index
    @activities = current_user.activities
    render json: @activities
  end

  def show
    @activity = Activity.find(params[:id])

    render json: @activity.as_json(:projects => true)
  end
end
