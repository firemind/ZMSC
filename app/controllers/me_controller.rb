class MeController < ApplicationController
  def index
    u = current_user 
    render json: {
        id:  u.id,
        url: u.url,
        bookings: u.bookings.map { |b|
          b.as_json
        }
      }
  end

  def projects
    render json: current_user.projects.as_json(:activities => true)
  end

end
