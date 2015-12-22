class QuestionsController < ApplicationController

  def get_random_question
    @question = Question.order("RANDOM()").first
    total_count = Question.all.count
    while (Result.where(:question_id => @question.id , :user_id => params[:user_id]).count != 0 && total_count != 0)
      @question = Question.order("RANDOM()").first
      total_count = total_count - 1
    end
    if total_count == 0
      render :nothing => true, :status => :ok
    else
      render :json => @question.to_json(:methods => [:get_options] ), :status => :ok
    end
  end


  def create
    params.permit!
    @question = Question.new(:description => params[:question_data][:description])
    if @question.save
      params[:question_data][:options].each_with_index  do |opt,index|
        option = Option.create(:question_id => @question.id, :description => opt)
        if index == params[:question_data][:answer].to_i
          Answer.create(:question_id => @question.id, :option_id => option.id)
        end
      end
      render :json => @question, :status => :ok
    else
      render :nothing => true, :status => :unprocessable_entity
    end
  end
end
