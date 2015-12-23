class UsersController < ApplicationController



  def show_info
    render 'show_info', :layout => false
  end
  # GET /users
  # GET /users.json
  def index
    @users = User.all
    render :json => @users.to_json(:methods => [:get_total_attempts , :get_correct_answer] ), :status => :ok
  end

  # GET /users/1
  # GET /users/1.json
  def show
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  # POST /users.json
  def create
    params.permit!
    @user = User.new params[:user]
    if @user.save
      render :json => @user, :status => :ok
    else
      render :json => { "errors" => @user.errors.full_messages} , :status => :unprocessable_entity
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end


end
