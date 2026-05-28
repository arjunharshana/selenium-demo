const { By, until } = require('selenium-webdriver');
const { buildGridDriver } = require('../config/gridDriver');

async function simulateUser(userId) {
    let driver;
    try {
        driver = await buildGridDriver();
        console.log(`[User ${userId}] Browser acquired. Executing flow...`);
        
        await driver.get('https://the-internet.herokuapp.com/login');
        await driver.findElement(By.id('username')).sendKeys('tomsmith');
        await driver.findElement(By.id('password')).sendKeys('SuperSecretPassword!');
        await driver.findElement(By.css("button[type='submit']")).click();

        let flashBanner = await driver.wait(until.elementLocated(By.id('flash')), 5000);
        let successText = await flashBanner.getText();

        if (successText.includes("secure area")) {
            console.log(`[User ${userId}] Login successful.`);
            return true; 
        }
        throw new Error("Validation text not found");

    } catch (error) {
        console.error(`[User ${userId}] Failed:`, error.message);
        return false;
    } finally {
        if (driver) await driver.quit();
    }
}

async function runLoadTest(concurrentUsers) {
    console.log(`\nSTARTING LOAD TEST: ${concurrentUsers} CONCURRENT USERS`);
    console.time("LoadTestDuration");

    const testPromises = [];

    for (let i = 1; i <= concurrentUsers; i++) {
        testPromises.push(simulateUser(i));
    }

    const results = await Promise.all(testPromises);

    const passes = results.filter(r => r === true).length;
    const fails = results.length - passes;

    console.log("\n==================================");
    console.log("LOAD TEST RESULTS");
    console.log("==================================");
    console.log(`Total Simulated Users: ${concurrentUsers}`);
    console.log(`Successful Logins: ${passes}`);
    console.log(`Failed Logins: ${fails}`);
    console.timeEnd("LoadTestDuration");
    console.log("==================================\n");
}

runLoadTest(5);