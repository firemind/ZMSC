Given /^the following activities:$/ do |activities|
    Activity.create!(activities.hashes)
    step %{there should be #{activities.hashes.length} activities}

end

Then /^there should be (.*) activities$/ do |n|
  if defined?(Spec::Rails::Matchers)
    Activity.count.should == n.to_i
  else
    assert_equal n.to_i, Activity.count
  end
end
