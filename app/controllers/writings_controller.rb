class WritingsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :edit, :create, :update, :destroy]

  PER_PAGE = 20

  def index
    writings = Writing.with_category.order('id DESC')

    if !params[:category_id].blank? &&
       !Category.is_root_id?(params[:category_id].to_i)

      category = Category.find(params[:category_id])
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

    @writings = writings

    if is_json_request
      render json: {
        writings:    @writings,
        page:        current_page,
        total_page:  total_page_count
      }
    else

    end
  end

  def show
    @writing = Writing.where(id: params[:id]).with_category.first

    if is_json_request
      render json: {writing: @writing}
    else

    end
  end

  def new
    @writing = Writing.new(category_id: Category::ROOT_ID)
    @categories = Category.hierarchy_categories.map {|c| [c.id, c.name]}

    if is_json_request
      render json: {writing: @writing, categories: @categories}
    else

    end
  end

  def edit
    @writing = Writing.find(params[:id])
    @categories = Category.hierarchy_categories.map {|c| [c.id, c.name]}

    if is_json_request
      render json: {writing: @writing, categories: @categories}
    else

    end
  end

  def create
    @writing = Writing.create!(writing_params)

    if is_json_request
      render json: {writing: @writing}
    else
      redirect_to short_writing_path(@writing.id)
    end

  rescue Exception => e
    if is_json_request
      render nothing: true
    else
      redirect_to new_writing_path, alert: e.to_s
    end
  end

  def update
    @writing = Writing.find(params[:id])
    @writing.update_attributes!(writing_params)

    if is_json_request
      render json: {writing: @writing}
    else
      redirect_to short_writing_path(params[:id])
    end
  rescue Exception => e
    if is_json_request
      render nothing: true
    else
      redirect_to edit_writing_path(params[:id]), alert: e.to_s
    end
  end

  def destroy
    @writing = Writing.find(params[:id])
    @writing.destroy

    if is_json_request
      render json: {success: true}
    else
      redirect_to writings_path
    end
  rescue Exception => e
    if is_json_request
      render nothing: true
    else
      redirect_to short_writing_path(params[:id]), alert: e.to_s
    end
  end

  private

  def writing_params
    params.require(:writing).permit(:title, :content, :user_id, :category_id)
  end
end
