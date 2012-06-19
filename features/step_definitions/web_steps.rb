When /^I visit "([^"]*)"$/ do |arg1|
  visit  arg1
end

When /^I log in as "([^"]*)" using password "([^"]*)"$/ do |u,p|
    step %{I send post "{'username':'#{u}', 'password':'#{p}'}" to "/login"}
end

When /^I send (post|put|delete) "([^"]*)" to "([^"]*)"$/ do |method, params, url|
  page.driver.send method.to_sym, url, ActiveSupport::JSON.decode(params.gsub("'", '"'))
#  page.driver.status_code.should eql 200

end


