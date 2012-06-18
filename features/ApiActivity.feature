Feature: Activity API
  Background:
    Given the following activities:
      | id | name       |
      | 1  | MyActivity  |
      | 2  | MyActivity2 |
    And the following users:
      | id | username   | password |
      | 1  | John       | secret   |

  Scenario: Index action
    When I log in as "John" using password "secret"
    And I visit "/activities"
    Then the JSON response should have 2 activities
    And the JSON response at "0/id" should be 1
    And the JSON response at "1/id" should be 2

  Scenario: Show action
    When I log in as "John" using password "secret"
    And I visit "/activities/1"
    Then the JSON response at "name" should be "MyActivity"
