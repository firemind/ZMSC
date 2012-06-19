class ApplicationController < ActionController::Base
  before_filter :authenticate, :except => [:login]

  def current_user
    return User.find(session[:user_id]) if session[:user_id]
  end

  def login
    session[:user_id] = User.where(username: params[:username], password: params[:password]).first.id
    authenticate or render layout: false
  end

  private
  def authenticate
    ::Rails.logger.debug "!!! session:: #{session.inspect}\n"
    head :unauthorized unless current_user
  end

end
