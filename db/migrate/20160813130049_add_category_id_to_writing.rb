class AddCategoryIdToWriting < ActiveRecord::Migration
  def change
    add_column :writings, :category_id, :integer
  end
end
