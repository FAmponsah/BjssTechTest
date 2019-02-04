@shorttechtest
Feature: Short Technical Test Solution

@clickchallengingdomlink
Scenario: As a web user I should be able to click on the Challenging DOM link
  Given I have navigated to 'https://the-internet.herokuapp.com/'
  When I click on the 'Challenging DOM link'
  Then the blue, red, and green button ids should change after I have clicked on the red button

@confirmhelloworldisdisplayed
Scenario:  As a web user I should see Hello World! displayed after the loading bar has disappeared
  Given I have navigated to 'https://the-internet.herokuapp.com/'
  And I click on the 'Dynamic Loading Page link'
  And I click on the 'Dynamic Loading Element Two link'
  When I click on the 'Start button'
  Then I should see 'Hello World!' displayed after the loading bar has disappeared

@creatuserviaapi
Scenario: As a web user I should be able to post an HTTP request to an api to create a user
  Given I have a valid json request as
    """json
    {
        "name": "tester",
        "salary": "9876543210",
        "age": "33",
    }
    """
  When I send this request to 'http://dummy.restapiexample.com/create'
  Then the response properties should be
  | status | statusText |
  | 200    | OK         |
