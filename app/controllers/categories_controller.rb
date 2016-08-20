class CategoriesController < ApplicationController
  before_action :authenticate_user!

  def index
    @categories = Category.hierarchy_categories
  end

  def new
    @category = Category.new
    @parents = Category.family_categories(Category.root.id)
  end

  def edit
    @category = Category.find(params[:id])
    @parents = Category.family_categories(Category.root.id)
  end

  def create
    @category = Category.create!(category_params)
    redirect_to categories_path
  end

  def update
    @category = Category.find(params[:id])
    @category.update_attributes!(category_params)
    redirect_to categories_path
  end

  def destroy
    @category = Category.find(params[:id])
    @category.destroy
    redirect_to categories_path
  end

  private

  def category_params
    params.require(:category).permit(:name, :parent_id)
  end
end
