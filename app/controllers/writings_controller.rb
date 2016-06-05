class WritingsController < ApplicationController
  def index
    @writings = Writing.all
  end

  def show
  end

  def new
    @writing = Writing.new
  end

  def edit
  end

  def create
    @writing = Writing.create!(writing_params)

    if request.xhr?
      render json: @writing
    else
      redirect_to writing_path
    end
  end

  def update
  end

  def destroy
  end

  private

  def writing_params
    params.require(:writing).permit(:title, :content, :user_id)
  end
end
