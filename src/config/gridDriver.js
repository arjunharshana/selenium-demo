const { Builder } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox'); 

async function buildGridDriver() {
    // set firefox to headless mode
    let options = new firefox.Options();
    options.addArguments('-headless'); 

    console.log("Connecting to Docker Grid at localhost:4444...");

    let driver = await new Builder()
        .forBrowser('firefox') 
        .setFirefoxOptions(options)
        .usingServer('http://localhost:4444/wd/hub') 
        .build();

    return driver;
}

module.exports = { buildGridDriver };