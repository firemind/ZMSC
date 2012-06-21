class Project < ActiveRecord::Base
  attr_accessible :name
  validates_uniqueness_of :name
  has_and_belongs_to_many :activities
  def as_json(options={})
    j = {:id => self.id, :name => self.name, url: self.url }
    j.merge!(activities: self.activities.as_json) if options[:activities]
    j
  end

  def url
    "#{BASEURL}projects/#{id}"
  end
end
