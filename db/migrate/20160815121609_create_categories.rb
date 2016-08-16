class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string  :name,            null: false
      t.string  :parent_id
      t.integer :depth,           null: false
      t.integer :order_in_parent, null: false
      t.integer :family

      t.timestamps null: false
    end
  end
end
