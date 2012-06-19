class ActivityProject < ActiveRecord::Base
  attr_accessible :activity_id, :project_id
  set_table_name :activities_projects
  
end
