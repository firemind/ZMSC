class Booking < ActiveRecord::Base
  belongs_to :user
  belongs_to :activity
  belongs_to :project
  attr_accessible :activity_id, :comment, :date, :end_time, :project_id, :start_time, :user_id
  def as_json(options={})
    {
      id: self.id, 
      url: self.url,
      date: self.date, 
      comment: self.comment, 
      start_time: self.start_time, 
      end_time: self.end_time, 
      project: self.project.as_json, 
      activity: self.activity.as_json
    }
  end

  def url
    "#{BASEURL}bookings/#{id}"
  end
end
