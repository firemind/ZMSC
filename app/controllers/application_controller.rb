class ApplicationController < ActionController::API
  before_filter :authenticate
  include ActionController::HttpAuthentication::Basic
  include ActionController::HttpAuthentication::Basic::ControllerMethods
  include ActionController::HttpAuthentication::Digest::ControllerMethods


  def current_user
    user, pass = ActionController::HttpAuthentication::Basic::user_name_and_password(request)
    User.where(username: user, password: pass).first
  end
  private
  def authenticate
    authenticate_or_request_with_http_basic("Login Required") do |username|
      u = User.where(username: username).first
      u ? u.password : nil
    end
  end

end
