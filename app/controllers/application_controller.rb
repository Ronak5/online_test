class ApplicationController < ActionController::Base
  include Clearance::Controller
  include Clearance::Authentication
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception

  def require_user_login_access
    @user = User.find_by_remember_token(request.headers['Authorization'])
    unless @user && signed_in?
      render :nothing => true, :status => :unauthorized
    end
  end

  def user_sign_in(user)
    if user
      cookies[:remember_token] = {
          :value   => user.remember_token,
          :expires => Clearance.configuration.cookie_expiration.call(cookies)
      }
      self.current_user = user
    end
  end

  def user_sign_out
    current_user.reset_remember_token! if current_user
    cookies.delete(:remember_token)
    self.current_user = nil
  end

end
