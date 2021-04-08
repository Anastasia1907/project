const puppeteer = require("puppeteer");
const faker = require("faker");

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch({headless: true, slowMo: 0});
    page = await browser.newPage();
});

describe("test expect", () => {
    test("validation", async () => {
        await page.goto('http://demo5.sellbe.com/');
        await page.waitForSelector("nav[class='menu-blk clr']");
        await page.click("input[id=log-pass]");
        await page.type("input[id=log-pass]", 'pas');
        await page.click("input[class='btn'][type='button'][value='Войти']");
        const element = await page.$("span[for='log-mail'][class='err-txt']");
        expect(element).toBeTruthy()
    }, 20000);
    test("not empty", async () => {
        await page.click("input[id=log-mail]");
        await page.type("input[id=log-mail]", 'test@test.com');
        await page.click("input[id=log-pass]", { clickCount: 3 });
        await page.keyboard.press('Backspace');
        await page.click("input[class='btn'][type='button'][value='Войти']");
        const msg = await page.$("span[for='log-pass'][class='err-txt']");
        expect(msg).toBeTruthy()
    });
    test("invalid data", async() => {
        await page.click("input[id='log-pass']");
        await page.type("input[id='log-pass']", 'password');
        await page.click("input[class='btn'][type='button'][value='Войти']");
        const msg2 = await page.$("div[class='pop-ttl']");
        expect(msg2).toBeTruthy()
    }, 20000);
    test("invalid email", async() => {
        await page.click("span[class='cls-btn ico']");
        await page.click("input[id='log-mail']");
        await page.type("input[id='log-mail']", 'ql');
        await page.click("input[class='btn'][type='button'][value='Войти']");
        const msg3 = await page.$("span[for='log-mail'][class='err-txt']");
        expect(msg3).toBeTruthy()
    }, 20000)
});


afterAll(() => {
    browser.close();
});