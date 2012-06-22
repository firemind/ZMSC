Feature: Booking API
  Background:
    Given the following users:
      | id | username   | password |
      | 1  | John       | secret   |
      | 1  | Josh       | unknown  |
    And the following activities:
      | id | name       |
      | 1  | MyActivity  |
      | 2  | MyActivity2 |
    And the following projects:
      | id | name       |
      | 1  | MyProject  |
      | 2  | MyProject2 |
    And the following bookings:
      | id | date        | start_time | end_time | comment  | project_id | activity_id | user_id |
      | 1  | 28.06.2012  | 07:45      | 09:30    | Alles ok | 1          | 2           | 1       |
      | 1  | 28.06.2012  | 09:45      | 11:50    | Alles ok | 2          | 1           | 1       |
      | 1  | 28.06.2012  | 13:15      | 15:10    | Alles ok | 1          | 1           | 1       |
      | 1  | 28.06.2012  | 15:25      | 17:00    | Alles ok | 2          | 2           | 1       |
      | 1  | 28.06.2012  | 08:00      | 17:00    | Alles ok | 2          | 2           | 2       |

  Scenario: Index action
    When I log in as "John" using password "secret"
    And I visit "/bookings"
    Then the JSON response should have 4 activities
    And the JSON response at "0/id" should be 1
    And the JSON response at "1/id" should be 2

  Scenario: Show action
    When I log in as "John" using password "secret"
    And I visit "/bookings/1"
    Then the JSON response at "start_time" should be "07:45"

  Scenario: Create Action
    When I log in as "John" using password "secret"
    And I send post "{'booking':{'date':'29.06.2012','start_time':'08:10','end_time':'17:15','comment':'10 minutes late','project_id':1,'activity_id':2}}" to "/bookings" 
    And I visit "/bookings"
    Then the JSON response should have 5 activities

  Scenario: Update Action
    When I log in as "John" using password "secret"
    And I send put "{'booking':{'date':'29.06.2012','start_time':'08:10','end_time':'17:15','comment':'10 minutes late','project_id':1,'activity_id':2}}" to "/bookings/2" 
    And I visit "/bookings/2"
    Then the JSON response at "start_time" should be "09:10"

  Scenario: Delete Action
    When I log in as "John" using password "secret"
    And I visit "/bookings"
    Then the JSON response should have 4 activities
    When I send delete "{}" to "/bookings/3" 
    And I visit "/bookings"
    Then the JSON response should have 3 activities
