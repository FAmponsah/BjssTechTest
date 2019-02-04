var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');

const { setWorldConstructor, setDefaultTimeout } = require('cucumber');

function CustomWorld() {
    this.driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
}

setDefaultTimeout(60 * 1000);

setWorldConstructor(CustomWorld);
