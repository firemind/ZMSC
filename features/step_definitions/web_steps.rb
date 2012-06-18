When /^I visit "([^"]*)"$/ do |arg1|
  visit  arg1
end

When /^I log in as "([^"]*)" using password "([^"]*)"$/ do |u,p|
  if page.driver.respond_to?(:basic_auth)
      page.driver.basic_auth(u, p)
  elsif page.driver.respond_to?(:basic_authorize)
      page.driver.basic_authorize(u, p)
  elsif page.driver.respond_to?(:browser) && page.driver.browser.respond_to?(:basic_authorize)
      page.driver.browser.basic_authorize(u,p)
  else
      raise "I don't know how to log in!"
  end
end

When /^I send (post|put|delete) "([^"]*)" to "([^"]*)"$/ do |method, params, url|
  page.driver.send method.to_sym, url, ActiveSupport::JSON.decode(params.gsub("'", '"'))
#  page.driver.status_code.should eql 200

end


