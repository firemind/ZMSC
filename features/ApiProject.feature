Feature: Project API
  Background:
    Given the following projects:
      | id | name       |
      | 1  | MyProject  |
      | 2  | MyProject2 |
    And the following users:
      | id | username   | password |
      | 1  | John       | secret   |

  Scenario: Index action
    When I log in as "John" using password "secret"
    And I visit "/projects"
    Then the JSON response should have 2 projects
    And the JSON response at "0/id" should be 1
    And the JSON response at "1/id" should be 2

  Scenario: Show action
    When I visit "/projects/1"
    Then the JSON response at "name" should be "MyProject"
