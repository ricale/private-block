# == Schema Information
#
# Table name: writings
#
#  id          :integer          not null, primary key
#  title       :string(255)
#  content     :text(65535)
#  user_id     :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  category_id :integer
#
# Indexes
#
#  index_writings_on_user_id                  (user_id)
#  index_writings_on_user_id_and_category_id  (user_id,category_id)
#

require 'test_helper'

class WritingTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end