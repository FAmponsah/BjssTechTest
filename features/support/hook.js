const { AfterAll, After, Before } = require('cucumber');

Before(async function() {
  if (this.driver) {
      await this.driver.manage().window().maximize();
  }
});

After(async function() {
  if (this.driver) {
    await this.driver.close();
  }
});

AfterAll(async function () { 
  if (this.driver) {
    await this.driver.quit();
    this.driver.null;
  }
});
  
