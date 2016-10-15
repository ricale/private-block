class HomeController < ApplicationController
  def index
    categories = Category.hierarchy_categories_with_writing_count

    render_result({
      categories: {
        list: categories
      }
    })
  end
end
