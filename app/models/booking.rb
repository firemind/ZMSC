class Booking < ActiveRecord::Base
  belongs_to :user
  belongs_to :activity
  belongs_to :project
  attr_accessible :activity_id, :comment, :date, :end_time, :project_id, :start_time, :user_id
  def as_json(options={})
    {
      id: self.id, 
      date: self.date, 
      comment: self.comment, 
      start_time: self.start_time, 
      project_id: self.project_id, 
      activity_id: self.activity_id
    }
  end
end
