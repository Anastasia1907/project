const puppeteer = require("puppeteer");

let browser;
let page;

beforeAll( async() => {
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 60,
        args: [
            '--disable-extensions-except=/path/to/extension/',
            '--load-extension=/path/to/extension/',
          ]
    });
    page = await browser.newPage()
});

describe("auth test", () => {
    test("opening", async() => {
        await page.goto('https://authencity.vrealsoft.com/');
        await page.waitForXPath('/html/body/div[1]/div/div[4]/div/div/div/div[1]/div/div/div/button/div[1]');

    })
})

afterAll( () => {
    browser.close()
})