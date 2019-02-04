const assert = require('chai').assert;
const { Given, When, Then } = require('cucumber');
const { By, until } = require('selenium-webdriver');
const api = require('./support/api');
const locators = require('./locators');

let apiResponse = '';

Given('I have navigated to {string}', async function (herokuAppUrl) {
  await this.driver.get(herokuAppUrl);
});

Given('I have a valid json request as', async function (dataString) {
  this.dataString = dataString;
});

When('I click on the {string}', async function (linkOrButtonText) {
  let linkOrButtonElement = '';
  switch (linkOrButtonText) {
    case 'Challenging DOM link':
      linkOrButtonElement = await this.driver.findElement(By.xpath(locators.CHALLENGING_DOM_LINK_XPATH));
      break;
    case 'Dynamic Loading Page link':
      linkOrButtonElement = await this.driver.findElement(By.xpath(locators.DYNAMIC_PAGE_LINK_XPATH));
      break;
    case 'Dynamic Loading Element Two link':
      linkOrButtonElement = await this.driver.findElement(By.xpath(locators.DYNAMIC_LOADING_ELEMENT2_XPATH));
      break;
    case 'Start button':
      linkOrButtonElement = await this.driver.findElement(By.xpath(locators.START_BUTTON_XPATH));
      break;
    default: break;
  }
  await linkOrButtonElement.click();
});

When('I send this request to {string}', async function (url) {
  apiResponse = await api.createUser(url, this.dataString);
});

Then('the blue, red, and green button ids should change after I have clicked on the red button', async function () {
  let blueButtonIdBeforeClick = await this.driver.findElement(By.xpath(locators.BLUE_BUTTON_XPATH)).getAttribute('id');
  let redButtonIdBeforeClick = await this.driver.findElement(By.xpath(locators.RED_BUTTON_XPATH)).getAttribute('id');
  let greenButtonIdBeforeClick = await this.driver.findElement(By.xpath(locators.GREEN_BUTTON_XPATH)).getAttribute('id');

  await this.driver.findElement(By.xpath(locators.RED_BUTTON_XPATH)).click();

  let blueButtonIdAfterClick = await this.driver.findElement(By.xpath(locators.BLUE_BUTTON_XPATH)).getAttribute('id');
  let redButtonIdAfteClick = await this.driver.findElement(By.xpath(locators.RED_BUTTON_XPATH)).getAttribute('id');
  let greenButtonIdAfteClick = await this.driver.findElement(By.xpath(locators.GREEN_BUTTON_XPATH)).getAttribute('id');

  const scenario = ' after clicking on the red button on challenging dom page.';
  assert.notEqual(blueButtonIdBeforeClick, blueButtonIdAfterClick, 'The id of the blue button has not changed' + scenario);
  assert.notEqual(redButtonIdBeforeClick, redButtonIdAfteClick, 'The id of the red button has not changed' + scenario);
  assert.notEqual(greenButtonIdBeforeClick, greenButtonIdAfteClick, 'The id of the green button has not changed' + scenario);
});

Then('I should see {string} displayed after the loading bar has disappeared', async function (expectedFinishText) {
  const timeToWait = 70 * 1000;
  await this.driver.wait(until.elementLocated(By.xpath(locators.DISMISSED_LOADING_BAR_XPATH)), timeToWait);

  let finishElement = await this.driver.findElement(By.xpath(locators.FINISH_ELEMENT_XPATH));
  let actualFinishText = await finishElement.getText();

  const scenario = ' after the loading bar had been dismissed.';
  assert.strictEqual(expectedFinishText, actualFinishText, 'The ' + expectedFinishText + ' text is not as expected' + scenario);
});

Then('the response properties should be', async function (dataTable) {
  let expectedData = dataTable.rawTable;
  let expectedStatus = await expectedData[1][0];
  let expectedStatusText = await expectedData[1][1];

  let actualStatus = apiResponse.status;
  let actualStatusText = apiResponse.statusText;

  const scenario = ' after sending a valid HTTP create user request to the correct api';
  assert.equal(expectedStatus, actualStatus, 'The HTTP response status is not ' + expectedStatus + ' as expected' + scenario);
  assert.equal(expectedStatusText, actualStatusText, 'The HTTP response statusText is not ' + expectedStatusText + ' as expected' + scenario);
});
