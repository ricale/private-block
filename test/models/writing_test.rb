# == Schema Information
#
# Table name: writings
#
#  id          :integer          not null, primary key
#  title       :string(255)      not null
#  content     :text(65535)      not null
#  created_at  :datetime
#  updated_at  :datetime
#  category_id :integer          not null
#  user_id     :integer          not null
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
