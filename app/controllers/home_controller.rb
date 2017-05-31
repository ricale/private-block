class HomeController < ApplicationController
  def index
    @props = {
      categories: Category.hierarchy_categories_with_writing_count
    }
  end
end
