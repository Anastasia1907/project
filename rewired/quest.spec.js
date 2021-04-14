const puppeteer = require("puppeteer");

let browser;
let page;
let page1;

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 20
    });

    page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080
    });
});

describe('Pass questionnaire', () => {
    test('Copy link', async () => {
        await page.goto('https://portal-dev.cloud.leadline.io/login');
        await page.waitForSelector('#login-form');
        await page.click("input[name=email]");
        await page.type("input[name=email]", 'anastasia-tester@escritossad.net');
        await page.click("input[name=password]");
        await page.type("input[name=password]", '1234Qwer');
        const LoginButton = await page.waitForXPath('//*[@id="login-form"]/button');
        await LoginButton.click();
        const EditLink = await page.waitForXPath('//*[@id="positions"]/div/div[4]/div/div[1]/div/div[1]/div[2]/a');
        await EditLink.click();
        const CampaignLink = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div[4]/div/div[1]/div[1]/div[1]/div[2]/a[4]');
        await CampaignLink.click();
        await page.waitForSelector('#Outline');
        let path = await page.$x('/html/body/div[1]/div/div[2]/div/div/div/div[3]/div[2]/div/div[7]/div/div[2]/div/div/div[1]/span');
        path = path.pop();
        path = await path.getProperty('innerText');
        path = await path.jsonValue();
        console.log(path);
        console.log(typeof path);
        const page1 = await browser.newPage();
        const pageURL = path;
        await page1.goto(pageURL);
        await page1.waitForSelector('#button-joinus1');
        await page1.click('#button-joinus1');
        await page1.waitForSelector('#registrationFirstName');
        await page1.click('#registrationFirstName');
        await page1.type('#registrationFirstName', 'Mike');
        await page1.click('#registrationLastName');
        await page1.type('#registrationLastName', 'Smith');
        await page1.click('#registrationEmail');
        await page1.type('#registrationEmail', 'MSmith1@test.com');
        await page1.click('#registrationCheckbox');
        await page1.click('#registrationContinue');
        await page1.waitFor(5000);
        await page1.keyboard.press('Escape');
        const location = await page1.waitForXPath('/html/body/div/div/div[1]/div/div/div[3]/div[1]/div/div/div/input');
        await location.click();
        await page1.keyboard.press('ArrowDown', {clickCount: 2});
        await page1.keyboard.press('Enter');
        await page1.click('#mui-component-select-citizenship');
        const citizen = await page1.waitForXPath('/html/body/div[2]/div[3]/ul/li[1]');
        await citizen.click();
        const drag = await page1.waitForXPath('/html/body/div/div/div[1]/div/div/div[3]/div[3]/div[1]/div/fieldset/div/label[1]/span[1]/span/input');
        await drag.click();
        const travel = await page1.waitForXPath('/html/body/div/div/div[1]/div/div/div[3]/div[4]/div[1]/div/fieldset/div/label[1]/span[1]/span/input');
        await travel.click();
        const experience = await page1.waitForXPath('/html/body/div/div/div[1]/div/div/div[4]/div[1]/div[1]/div/div');
        await experience.click();
        const years = await page1.waitForXPath('/html/body/div[2]/div[3]/ul/li[12]');
        await years.click();
        const level = await page1.waitForXPath('/html/body/div/div/div[1]/div/div/div[4]/div[2]/div[1]/div/div');
        await level.click();
        await page1.keyboard.press('ArrowDown', {clickCount: 8});
        await page1.keyboard.press('Enter');
        const submit = await page1.waitForXPath('/html/body/div/div/div[1]/div/div/div[1]');
        await submit.click()
        await page1.waitForSelector('#reject-body');

        await page1.waitFor(5000);
    }, 70000)
})

afterAll(() => {
    browser.close()
})