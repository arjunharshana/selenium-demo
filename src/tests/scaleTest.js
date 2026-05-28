const { By, until } = require('selenium-webdriver');
const { buildGridDriver } = require('../config/gridDriver'); // Importing your config

async function runDemoSequence() {
    console.log("Starting test sequence...");
    
    // acquire browser from Grid
    const driver = await buildGridDriver();

    try {
        console.log("[Status] Browser acquired. Navigating to login page...");
        await driver.get('https://the-internet.herokuapp.com/login');
        
        console.log("[Status] Entering credentials...");
        await driver.findElement(By.id('username')).sendKeys('tomsmith');
        await driver.findElement(By.id('password')).sendKeys('SuperSecretPassword!');
        
        console.log("[Status] Submitting form...");
        await driver.findElement(By.css("button[type='submit']")).click();

        console.log("[Status] Waiting for server validation...");
        let flashBanner = await driver.wait(until.elementLocated(By.id('flash')), 5000);
        let successText = await flashBanner.getText();

        if (successText.includes("secure area")) {
            console.log("\nSUCCESS: The headless Firefox Node executed the login perfectly!");
        } else {
            console.log("\nFAILURE: Could not verify login.");
        }

    } catch (error) {
        console.error("Test crashed:", error.message);
    } finally {
        console.log("[Teardown] Releasing Grid Node and closing connection.");
        await driver.quit();
    }
}

runDemoSequence();