class SessionsController < ApplicationController
  def create
    @user = User.authenticate(params[:email], params[:password])
    if @user.nil?
      format.html { redirect_to users_url, notice: 'Incorrect username and password.' }
      format.json { render json: @user.errors, status: :unprocessable_entity }
    else
      # @user.reset_remember_token!
      user_sign_in(@user)
      format.html { redirect_to users_url, notice: 'login successfully.' }
      format.json { render json: true, status: :ok }
    end
  end

  def destroy
    user_sign_out
    render :json => true, :status => :ok
  end

  def new

  end
end
