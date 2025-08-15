Feature: Search for videos on YouTube iOS

  Scenario: Search and filter videos
    Given the YouTube app is launched
    When I search for "WebdriverIO tutorial"
    Then I should see videos with keyword "WebdriverIO" or "Automation" or "Test" under 5 minutes
