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

class Writing < ActiveRecord::Base
  validates_presence_of :title
  validates_presence_of :content

  before_validation :default_values

  def default_values
    self.category_id = 0 if self.category_id.nil?
    self.user_id     = 0 if self.user_id.nil?
  end
end
