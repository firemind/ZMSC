Given /^the following users:$/ do |users|
    User.create!(users.hashes)
    step %{there should be #{users.hashes.length} users}

end

Then /^there should be (.*) users$/ do |n|
  if defined?(Spec::Rails::Matchers)
    User.count.should == n.to_i
  else
    assert_equal n.to_i, User.count
  end
end
