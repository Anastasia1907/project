const faker = require("faker");
//const jest = require("jest");
const puppeteer = require("puppeteer");

//const APP = "http://shop.bugred.ru/user/register/index"

const lead = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.random.word()
};

let page;
let browser;
const width = 1920;
const height = 1080;

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: [`--window-size=${width},${height}`]
    });
    page = await browser.newPage();
    await page.setViewport({width, height});
    await page.goto('http://shop.bugred.ru/user/register/index')
});

describe("Registration form", () => {
    test("lead register", async () => {
        await page.waitForSelector("form[method=POST]");
        await page.click("input[name=name]");
        await page.type("input[name=name]", lead.name);
        await page.click("input[name=email]");
        await page.type("input[name=email]", lead.email);
        await page.click("input[name=password]");
        await page.type("input[name=password]", lead.password);
        await page.click("input[name=password2]");
        await page.type("input[name=password2]", lead.password);
        await page.click("button[name=_csrf]");
        await page.waitForSelector("button[class='alertify-button alertify-button-ok']");
        await page.click("button[class='alertify-button alertify-button-ok']");
        await page.click("input[type=email]");
        await page.type("input[name=email]", lead.email);
        await page.click("input[name=password]");
        await page.type("input[name=password]", lead.password);
        await page.click("button[name=_csrf]");
        await page.waitForSelector('#navbarSupportedContent');
    }, 70000);
});

afterAll(() => {
    browser.close();
});