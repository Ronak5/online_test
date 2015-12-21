class SessionsController < ApplicationController
  def create
    if params[:email].nil? || params[:password].nil?
      render :json => {}, :status => :unprocessable_entity
    else
      @user = User.authenticate(params[:email], params[:password])
      if @user.nil?
        render :json => {}, :status => :unauthorized
      else
        sign_in(@user)
        render :json => @user, :status => :ok
      end
    end
  end

  def destroy
    user_sign_out
    redirect_to root_path
  end

  def new

  end
end
