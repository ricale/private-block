class CategoriesController < ApplicationController
  before_action :authenticate!

  around_action :wrap_default_result_and_resque

  def authenticate!
    if current_user.blank?
      return render_result({
        categories: {
        },
        message: I18n.t('devise.failure.unauthenticated')
      }, status: 401)
    end
  end

  def index
    categories = Category.hierarchy_categories.with_writing_count

    @props = {
      categories:  categories
    }
  end

  def new
    category = Category.new
    parents = Category.family_categories(Category.root.id)

    @props = {
      category: category,
      parents:  parents
    }
  end

  def edit
    category = Category.find(params[:id])
    parents = Category.family_categories(Category.root.id)

    @props = {
      category: category,
      parents:  parents
    }
  end

  def create
    category = Category.create!(category_params)

    redirect_to categories_path
  end

  def update
    category = Category.find(params[:id])
    category.update_attributes!(category_params)

    redirect_to categories_path
  end

  def destroy
    category = Category.find(params[:id])
    category.destroy

    redirect_to categories_path
  end

  private

  def category_params
    params.require(:category).permit(:id, :name, :parent_id)
  end
end
