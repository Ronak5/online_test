class QuestionsController < ApplicationController

  def get_random_question
    @question = Question.first
    total_count = Question.all.count
    p total_count
    p @question.id
    p params[:user_id]
    p Result.where(:question_id => @question.id , :user_id => params[:user_id]).count
    while (Result.where(:question_id => @question.id , :user_id => params[:user_id]).count != 0)
      p @question.id
      p params[:user_id]
      if total_count == 0
        break;
      end
      @question = Question.find(@question.id +1)
      total_count = total_count - 1
      p "total count inside loop"
      p total_count
    end

    if total_count == 0
      @question = Question.new(:id => -1, :description => "no question")
      p "1"
      p @question
      render :json => @question, :status => :ok
    else
      p "2"
      p @question
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
