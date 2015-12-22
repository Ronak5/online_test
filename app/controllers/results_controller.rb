class ResultsController < ApplicationController

  def create
    anwser = Answer.where(:question_id => params[:result][:question_id],:option_id => params[:result][:option_id]).first
    if anwser
      is_correct = true
    else
      is_correct = false
    end
    result = Result.new(:question_id => params[:result][:question_id] , :option_id => params[:result][:option_id] , :user_id => params[:result][:user_id] ,:is_correct => is_correct)
    if result.save
      render :nothing => true , :status => :ok
    else
      render :nothing => true , :status => :unprocessable_entity
    end
  end


  def get_attempts
    count =  Result.where(:user_id => params[:user_id]).count
    render :json => count , :status => :ok
  end
end
