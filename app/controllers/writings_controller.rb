class WritingsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :edit, :create, :update, :destroy]

  def index
    @writings = Writing.with_category.order('id DESC').page(params[:page]).per(20)
  end

  def show
    @writing = Writing.where(id: params[:id]).with_category.first
  end

  def new
    @writing = Writing.new
    @categories = Category.hierarchy_categories.map {|c| [c.id, c.name]}
  end

  def edit
    @writing = Writing.find(params[:id])
    @categories = Category.hierarchy_categories.map {|c| [c.id, c.name]}
  end

  def create
    @writing = Writing.create!(writing_params)

    if request.xhr?
      render json: @writing
    else
      redirect_to writing_path(@writing.id)
    end
  end

  def update
    @writing = Writing.find(params[:id])
    @writing.update_attributes!(writing_params)

    if request.xhr?
      render json: @writing
    else
      redirect_to writing_path(params[:id])
    end
  end

  def destroy
    @writing = Writing.find(params[:id])
    @writing.destroy

    if request.xhr?
      render json: {success: true}
    else
      redirect_to writings_path
    end
  end

  private

  def writing_params
    params.require(:writing).permit(:title, :content, :user_id)
  end
end
