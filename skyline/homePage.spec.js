const puppeteer = require("puppeteer");

let page, brower;
const width = 1920;
const height = 1080;

const loginURL = "https://beta-vl-app.azurewebsites.net/";


beforeAll(async () => {
    brower = await puppeteer.launch({
        headless: false,
        slowMo: 80
    });
    page = await brower.newPage();
    await page.setViewport({ width, height });
});

describe("test home page", () => {
    test("main page: general tab", async () => {
        await page.goto(loginURL);
        await page.waitForXPath('/html/body/div[3]/div/div/div/div/div/form/div[1]/h2');
        await page.type('#email', "brokennote19@gmail.com")
        await page.type('#password', "1234Qwer");
        await page.click('#next');
        let monthlyActivity = await page.$x('/html/body/div[1]/div/div[5]/div[3]/div/div[1]/div[3]/div/div/div[1]/div/font/font');
        monthlyActivity = monthlyActivity.pop();
        monthlyActivity = await monthlyActivity.getProperty('innerText');
        monthlyActivity = await monthlyActivity.jsonValue();
        expect(monthlyActivity).toBe("ממוצע פעילות חודשי");
        let craneActivity = await page.$x('/html/body/div[1]/div/div[5]/div[3]/div/div[1]/div[2]/div/div/div[1]/div/font/font');
        craneActivity = craneActivity.pop();
        craneActivity = await craneActivity.getProperty('innerText');
        craneActivity = await craneActivity.jsonValue();
        expect(craneActivity).toBe("פעילות מנופים");
        let craneAlerts = await page.$x('/html/body/div[1]/div/div[5]/div[3]/div/div[1]/div[1]/div/div/div[1]/div/font/font');
        craneAlerts = craneAlerts.pop();
        craneAlerts = await craneAlerts.getProperty('innerText');
        craneAlerts = await craneAlerts.jsonValue();
        expect(craneAlerts).toBe("התראות מנופים")
    }, 25000);

    test("main page: crane tab", async() => {
        const craneTab = await page.waitForXPath('/html/body/div[1]/div/div[5]/div[2]/div/div/div/div/ul/li[2]/a');
        await craneTab.click();
        let companyName = await page.$x('/html/body/div[1]/div/div[5]/div[3]/div/div/div[1]/div[1]/font/font');
        companyName = companyName.pop();
        companyName = await companyName.getProperty('innerText');
        companyName = await companyName.jsonValue();
        expect(companyName).toBe("סקייליין12")
    })

})

afterAll(() => {
    brower.close()
})