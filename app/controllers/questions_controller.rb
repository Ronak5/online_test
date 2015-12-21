class QuestionsController < ApplicationController
  # GET /questions
  # GET /questions.json

  # GET /questions/1
  # GET /questions/1.json
  def show
  end

  # GET /questions/new
  def new
    @question = Question.new
  end

  # GET /questions/1/edit
  def edit
  end

  # POST /questions
  # POST /questions.json
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

  # PATCH/PUT /questions/1
  # PATCH/PUT /questions/1.json
  # def update
  #   respond_to do |format|
  #     if @question.update(question_params)
  #       format.html { redirect_to @question, notice: 'Question was successfully updated.' }
  #       format.json { render :show, status: :ok, location: @question }
  #     else
  #       format.html { render :edit }
  #       format.json { render json: @question.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # DELETE /questions/1
  # DELETE /questions/1.json
  def destroy
    @question.destroy

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_question
      @question = Question.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    # def question_params
    #   params[:question]
    # end
end
