class CategoriesController < ApplicationController
  before_action :authenticate_user!

  def index
    categories = Category.hierarchy_categories

    render_result({
      categories: {
        list: categories
      }
    })
  end

  def new
    category = Category.new
    parents = Category.family_categories(Category.root.id)

    render_result({
      categories: {
        selected: category,
        parents:  parents
      }
    })
  end

  def edit
    category = Category.find(params[:id])
    parents = Category.family_categories(Category.root.id)

    render_result({
      categories: {
        selected: category,
        parents:  parents
      }
    })
  end

  def create
    category = Category.create!(category_params)
    categories = Category.hierarchy_categories

    render_result({
      categories: {
        list: categories,
      }
    })
  end

  def update
    category = Category.find(params[:id])
    category.update_attributes!(category_params)

    categories = Category.hierarchy_categories

    render_result({
      categories: {
        list: categories,
      }
    })
  end

  def destroy
    category = Category.find(params[:id])
    category.destroy

    categories = Category.hierarchy_categories

    render_result({
      categories: {
        list: categories,
      }
    })
  end

  private

  def category_params
    params.require(:category).permit(:name, :parent_id)
  end
end
