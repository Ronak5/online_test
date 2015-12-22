class QuestionsController < ApplicationController

  def get_random_question
    total_count = Question.all.count
    offset = rand(total_count)
    p params[:user_id]
    @question = Question.offset(offset).first
    while (Result.where(:question_id => @question.id , :user_id => params[:user_id]).count != 0 && total_count > 0)
      p params[:user_id]
      offset = rand(total_count)
      @question = Question.offset(offset).first
      total_count = total_count - 1
      p "total count inside loop"
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
