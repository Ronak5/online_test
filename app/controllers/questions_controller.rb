class QuestionsController < ApplicationController

  def get_random_question
    @question = Question.order("RANDOM()").first
    render :json => @question.to_json(:methods => [:get_options] ), :status => :ok
  end


  def create
    params.permit!
    @question = Question.new(:description => params[:question_data][:description])
    if @question.save
        p @question.id
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
