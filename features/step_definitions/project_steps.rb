Given /^the following projects:$/ do |projects|
    Project.create!(projects.hashes)
    step %{there should be #{projects.hashes.length} projects}

end

Then /^there should be (.*) projects$/ do |n|
  if defined?(Spec::Rails::Matchers)
    Project.count.should == n.to_i
  else
    assert_equal n.to_i, Project.count
  end
end
