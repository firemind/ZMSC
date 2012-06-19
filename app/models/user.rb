class User < ActiveRecord::Base
  attr_accessible :password, :username

  has_many :bookings

  def activities
    Activity.all
  end
  def projects
    Project.all
  end

  def url
    "#{BASEURL}me"
  end
end
