class CreateBookings < ActiveRecord::Migration
  def change
    create_table :bookings do |t|
      t.date :date, :null => false
      t.time :start_time, :null => false
      t.time :end_time
      t.text :comment, :null => false, :default => ''
      t.integer :project_id, :null => false
      t.integer :activity_id, :null => false
      t.integer :user_id, :null => false

      t.timestamps
    end
  end
end
