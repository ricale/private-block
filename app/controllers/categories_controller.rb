class CategoriesController < ApplicationController
  before_action :authenticate_user!

  def index
    @categories = Category.hierarchy_categories
  end

  def show
    @category = Category.find(params[:id])
  end

  def new
    @category = Category.new
  end

  def edit
    @category = Category.find(params[:id])
  end

  def create
    @category = Category.new(category_params)
  end

  def update
    @category = Category.find(params[:id])
  end

  def destroy
    @category = Category.find(params[:id])
  end

  private

  def category_params
    params.require(:category).permit(:name)
  end
end
