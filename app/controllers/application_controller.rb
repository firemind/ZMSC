class ApplicationController < ActionController::Base
  before_filter :authenticate, :except => [:login]

  def current_user
    return User.find(session[:user_id]) if session[:user_id]
  end

  def login
    u = User.where(username: params[:username], password: params[:password]).first
    session[:user_id] =  u ? u.id : nil
    authenticate or render layout: false
  end

  private
  def authenticate
    head :unauthorized unless current_user
  end

end
