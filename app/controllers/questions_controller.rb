class QuestionsController < ApplicationController

  def get_random_question
    total_count = Question.all.count
    offset = rand(total_count)
    @question = Question.offset(offset).first
    index= total_count
    while(index>0)
      if (Result.where(:question_id => @question.id,:user_id => params[:user_id]).first)
        offset = rand(total_count)
        @question = Question.offset(offset).first
      else
        break;
      end
    index = index - 1
    end
    p "*****"
    p @question.id
    p "*****"

    if(index == 0)
      render :json => {}, :status => :unprocessable_entity
    else
      render :json => @question.to_json(:methods => [:get_options] ), :status => :ok
    end
  end

  # def get_all_question
  #   @questions = Question.all
  #   render :json => @question.to_json(:methods => [:get_options] ), :status => :ok
  # end

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
