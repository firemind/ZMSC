class Project < ActiveRecord::Base
  attr_accessible :name
  validates_uniqueness_of :name
  has_and_belongs_to_many :activities
  def as_json(options={})
    {:id => self.id, :name => self.name }
  end
end
