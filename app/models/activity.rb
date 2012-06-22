class Activity < ActiveRecord::Base
  attr_accessible :name
  validates_uniqueness_of :name
  has_and_belongs_to_many :projects
  def as_json(options={})
    j = {:id => self.id, :name => self.name, url: self.url}
    j.merge!(projects: self.projects.as_json) if options[:projects]
    j
  end

  def url
    "#{BASEURL}activities/#{id}"
  end
end
