class ActivityProjectRelation < ActiveRecord::Migration
  def up
    create_table :activities_projects, :id => false do |t|
      t.integer :activity_id, :null => false
      t.integer :project_id, :null => false
    end

  end

  def down
  end
end
