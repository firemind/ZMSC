class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  include ActionController::Cookies
  include ActionController::Helpers
  before_filter :authenticate, :except => :login


  def current_user
    return User.find(session[:user_id]) if session[:user_id]
  end

  def login
    session[:user_id] = User.where(username: params[:username], password: params[:password]).first.id
    authenticate 
  end

  private
  def authenticate
    head :unauthorized unless current_user
  end

end
