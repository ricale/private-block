class AddIndexToWriting < ActiveRecord::Migration
  def change
    add_index :writings, :user_id
    add_index :writings, [:user_id, :category_id]
  end
end
