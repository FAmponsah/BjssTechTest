# Set up instructions

1. Download and install Visual Code: https://code.visualstudio.com/download.

2. Download and install NodeJS: https://nodejs.org/en/download/:
   a. verify it is installed correctly by opening a command prompt and running: node -v or node --version.

3. Download and install Java JDK.

4. Download chromedriver and place it in a file that is on your path:
   a. ChromeDriver: https://sites.google.com/a/chromium.org/chromedriver/downloads.

5. Install the following node modules at the root of your project:
   a. npm install node-bin-setup
   b. npm install
   c. Install Cucumber: npm install selenium-cucumber-js
   d. Install Selenium webdriver: npm install selenium-webdriver
   e. Install Chai assertion tool: npm install chai
   f. INstall axios: npm install axios

6. Create a .vscode folder in the root of your project and then create a launch.json file in it and set its      content to:
    {
        // Use IntelliSense to learn about possible attributes.
        // Hover to view descriptions of existing attributes.
        // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
        "version": "0.2.0",
        "configurations": [
            {
                "type": "node",
                "request": "launch",
                "name": "Run Tag",
                "program": "${workspaceFolder}/node_modules/cucumber/bin/cucumber-js",
                "cwd": "${workspaceFolder}",
                "console": "integratedTerminal",
                "args": [
                    --tags", "@shorttechtest",
                ]
            }
        ]
    }

7. Hit F5 in VSCode to run the project after changing the --tags argument to run individual scenarios (e.g. @clickchallengingdomlink) or the entire tests (@shorttechtest).


# Tech Debt
1. Download and add other webdrivers (e.g. Firefox, Edge, etc.), and add their cofigurations to world.js to enable running the tests in other browsers.

2. Refactor the axios api call to create a user into an api.js file in support to facilitate it's reusability and also add other CRUD methods (e.g. to delete users at the end of the tests, etc.).