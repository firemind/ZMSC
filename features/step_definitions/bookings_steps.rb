Given /^the following bookings:$/ do |bookings|
    Booking.create!(bookings.hashes)
    step %{there should be #{bookings.hashes.length} bookings}

end

Then /^there should be (.*) bookings$/ do |n|
  if defined?(Spec::Rails::Matchers)
    Booking.count.should == n.to_i
  else
    assert_equal n.to_i, Booking.count
  end
end
