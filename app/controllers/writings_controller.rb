class WritingsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :edit, :create, :update, :destroy]

  around_action :wrap_default_result_and_resque

  PER_PAGE = 20

  def index
    writings = Writing.with_category.order('id DESC')

    category_id = params[:category_id].blank? ? nil : params[:category_id].to_i

    if !category_id.blank? &&
       !Category.is_root_id?(category_id.to_i)

      category = Category.find(category_id)
      writings = 
        if category.depth == 2
          writings.where(category_id: category.id)
        else
          writings.where(category_id: [category.id].concat(category.children.map(&:id)))
        end
    end

    total_writing_count = writings.select('COUNT(*) AS count').first.count
    total_page_count = total_writing_count / PER_PAGE + 1

    current_page = params[:page].to_i
    current_page = 1 if current_page == 0
    writings = writings.limit(PER_PAGE).offset((current_page - 1) * PER_PAGE)

    categories = Category.hierarchy_categories_with_writing_count


    @props = {
      writings: writings,
      page: current_page,
      totalPage: total_page_count,
      categoryId: category_id,
      categories: categories,
      query: params
    }
  end

  def show
    writing = Writing.where(id: params[:id]).with_category.first
    categories = Category.hierarchy_categories_with_writing_count

    @props = {
      writing: writing,
      categories: categories,
    }
  end

  def new
    writing = Writing.new(category_id: Category::ROOT_ID)
    categories = Category.hierarchy_categories_with_writing_count


    @props = {
      writing: writing,
      categories: categories
    }
  end

  def edit
    writing = Writing.find(params[:id])
    categories = Category.hierarchy_categories_with_writing_count

    @props = {
      writing: writing,
      categories: categories
    }
  end

  def create
    writing = Writing.create!(writing_params)
    writing = Writing.where(id: writing.id).with_category.first

    redirect_to writing_path(writing)
  end

  def update
    writing = Writing.find(params[:id])
    writing.update_attributes!(writing_params)
    writing = Writing.where(id: writing.id).with_category.first

    redirect_to writing_path(writing)
  end

  def destroy
    writing = Writing.find(params[:id])
    writing.destroy

    redirect_to writings_path
  end

  private

  def writing_params
    params.require(:writing).permit(:title, :content, :user_id, :category_id)
  end
end
