require 'spec_helper.rb'
describe Project do
  let(:project){ Project.create!(name: "MyProject") }

  context "#to_json" do
    it "includes names" do
      names = %({"name":"MyProject"})
      project.to_json.should be_json_eql(names)
    end

  end
end
