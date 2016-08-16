class Category < ActiveRecord::Base
  belongs_to :parent, class_name: 'Category'
  has_many :children, class_name: 'Category', foreign_key: 'parent_id'
  has_many :writing

  validates_presence_of :name

  validates_numericality_of :depth,           greater_than_or_equal_to: 0
  validates_numericality_of :order_in_parent, greater_than_or_equal_to: 0

  before_validation :create_root_if_needed, on: :create
  before_validation :set_parent_to_root_if_parent_is_invalid

  before_validation :validates_change_of_parent, on: :update, if: :parent_id_changed?

  before_validation :initialize_order_in_parent, on: :create
  before_validation :initialize_order_in_parent, on: :update, if: :parent_id_changed?

  before_validation :initialize_family, on: :create
  before_validation :update_family, on: :update

  before_validation :initialize_depth

  before_destroy :validates_destruction

  # after_update :update_sibling_order_in_parent, if: :parent_id_changed?
  # after_destroy :update_sibling_order_in_parent

  ROOT_ID = 1

  MAX_DEPTH = 2

  scope :family_categories, ->(parent_id) { where("id = ? OR parent_id = ?", parent_id, parent_id) }
  scope :child_categories,  ->(parent_id) { where(parent_id: parent_id).order(:order_in_parent) }
  scope :except_one,        ->(id)        { where.not(id: id) }
  scope :high_categories,   ->(depth)     { where("depth <= ?", depth).order(:order_in_parent) }

  def self.hierarchy_categories(root_id = nil)
    if Category.count == 0
      [Category.create_root]

    else
      if root_id == :all || root_id == nil || root_id.to_i == Category::ROOT_ID
        Category.all.order(:family, :depth, :order_in_parent)
      else
        Category.family_categories(root_id).order(:family, :depth, :order_in_parent)
      end
    end
  end

  def self.root_category
    Category.root || Category.create_root
  end



  def is_root?
    self.id == ROOT_ID
  end



  def descendants_writings
    Writing.in_categories(Category.hierarchy_categories(id).map { |c| c.id } << id)
  end

  def ancestors_and_me(top_ancestor = :root, except_top = false)
    top_ancestor = Category.root if top_ancestor == :root

    if self == top_ancestor || is_root?
      except_top ? [] : [self]

    elsif parent.is_root?
      [self]

    else
      parent.ancestors_and_me(top_ancestor, except_top) << self
    end
  end



  def up
    if is_root?
      raise "Root category cannot change position."
    end

    up_in_order_in_parent
  end

  def down
    if is_root?
      raise "Root category cannot change position."
    end

    down_in_order_in_parent
  end



  private

  # before_validation, about root

  def create_root_if_needed
    if is_first_category_except_root?
      Category.create_root
    end

    true
  end

  def set_parent_to_root_if_parent_is_invalid
    if has_invalid_parent?
      self.parent_id = Category::ROOT_ID

    else
      if is_root? && parent_id_changed?
        raise "Root category can not change parent"
      end
    end
  end

  def is_first_category_except_root?
    Category.count == 0 && (parent_id != nil || (parent_id == nil && name != "root"))
  end

  def has_invalid_parent?
    Category.where(id: parent_id).empty? && !is_root?
  end

  #
  # before_validation, on: :create

  def validates_change_of_parent
    if !children.empty?
      raise "This category cannot change parent."
    end

    if id == parent_id.to_i
      raise "This category cannot change parent."
    end
  end

  def initialize_family
    self.family =
      if parent.nil?
        0
      elsif parent == Category.root
        order_in_parent + 1
      else
        parent.family
      end
  end

  def initialize_depth
    if parent.nil?
      self.depth = 0
    else
      if parent.depth >= MAX_DEPTH
        raise "Depth #{parent.depth + 1} is too deep. (Maximum depth is 2)"
      else
        self.depth = parent.depth + 1
      end
    end
  end

  def initialize_order_in_parent
    self.order_in_parent =
      if parent
        last_order = Category.child_categories(parent_id).maximum(:order_in_parent)
        last_order ? last_order + 1 : 0

      else
        0
      end
  end

  #
  # before_validation, on: :update

  def update_family
    initialize_family

    # move to after_save
    unless children.empty?
      children.each do |child|
        child.update_columns(family: self.family)
      end
    end
  end

  #
  # before_destroy

  def validates_destruction
    if children.count != 0
      raise "This category has children"
    elsif writing.count != 0
      raise "This category has writing"
    elsif parent_id == nil
      raise "This category is root category"
    end
  end

  #
  # after_update

  def update_sibling_order_in_parent
    Category.child_categories(parent_id_was)
            .where("order_in_parent > ?", order_in_parent_was).each do |sibling|

      sibling.order_in_parent -= 1
      sibling.save
    end
  end

  #
  #

  def up_in_order_in_parent
    if order_in_parent == Category.child_categories(parent_id).minimum(:order_in_parent)
      raise "This category is already positioned top."
    end

    move_order_in_parent(true)
  end

  def down_in_order_in_parent
    if order_in_parent == Category.child_categories(parent_id).maximum(:order_in_parent)
      raise "This category is already positioned bottom."
    end

    move_order_in_parent(false)
  end

  def move_order_in_parent(up)
    sitten_category =
      if up
        Category.where("parent_id = ? AND order_in_parent < ?", parent_id, order_in_parent).order("order_in_parent DESC").first
      else
        Category.where("parent_id = ? AND order_in_parent > ?", parent_id, order_in_parent).order("order_in_parent ASC").first
      end

    sitten_category_order = sitten_category.order_in_parent

    sitten_category.update!(order_in_parent: order_in_parent)
    update!(order_in_parent: sitten_category_order)
  end

  #
  # class method

  def self.create_root
    root = Category.where(id: Category::ROOT_ID).first

    if root.nil?
      Category.create!(id: Category::ROOT_ID, parent_id: nil, name: "root")
    else
      root.update!(parent_id: nil, name: "root")
    end
  end

  def self.root
    Category.find_by(parent_id: nil)
  end
end
