class AddPosition < ActiveRecord::Migration
  def up
    add_column :bookings, :pos_lat, :float
    add_column :bookings, :pos_lng, :float
  end

  def down
  end
end
