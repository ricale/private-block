# == Schema Information
#
# Table name: categories
#
#  id              :integer          not null, primary key
#  name            :string(255)      not null
#  parent_id       :integer
#  depth           :integer          default(0), not null
#  order_in_parent :integer          default(0), not null
#  created_at      :datetime
#  updated_at      :datetime
#  family          :integer
#

require 'test_helper'

class CategoryTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
