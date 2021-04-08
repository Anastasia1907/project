const puppeteer = require("puppeteer");
const faker = require("faker");

let browser;
let page;

const lead = { 
    name: faker.name.firstName,
    sername: faker.name.lastName,
    phone: faker.random.number,
    email: faker.internet.email,
    address: faker.random.word,
    city: faker.random.word,
    UserName: faker.internet.email,
    Pass: faker.random.number
}

beforeAll(async() => {
    browser = await puppeteer.launch({headless: true, slowMo: 0});
    page = await browser.newPage()
});

describe("start", () => {
    test('registration', async() => {
        await page.goto('http://demo.guru99.com/test/newtours/');
        const RegisterTab = await page.waitForXPath('/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr/td[2]/a');
        await RegisterTab.click();
        await page.waitForSelector("input[name=firstName]");
        await page.click("input[name=firstName]");
        await page.type("input[name=firstName]", "Test");
        await page.click("input[name=lastName]");
        await page.type("input[name=lastName]", "Test");
        await page.click("input[name=phone]");
        await page.type("input[name=phone]", "123456789");
        await page.click('#userName');
        await page.type('#userName', "mngr136913");
        await page.click('#email');
        await page.type('#email', "mngr136913");
        await page.click("input[name=password]");
        await page.type("input[name=password]", "abc321!");
        await page.click("input[name=confirmPassword]");
        await page.type("input[name=confirmPassword]", "abc321!");
        await page.click("input[name=submit]");
        await page.waitForXPath('/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[4]/td/table/tbody/tr/td[2]/table/tbody/tr[3]/td/p[2]/font/a');
    }, 30000);

    test('sign in', async() => {
        const SignINLink = await page.waitForXPath('/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[4]/td/table/tbody/tr/td[2]/table/tbody/tr[3]/td/p[2]/font/a');
        await SignINLink.click();
        await page.waitForXPath('/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[4]/td/table/tbody/tr/td[2]/table/tbody/tr[5]/td/form/table/tbody/tr[1]/td[2]/input');
        await page.click("input[name=userName]");
        await page.type("input[name=userName]", "mngr136913");
        await page.click("input[name=password]");
        await page.type("input[name=password]", "abc321!");
        await page.click("input[name=submit]");
        const confirmLogin = await page.waitForXPath('/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[4]/td/table/tbody/tr/td[2]/table/tbody/tr[3]/td/p[1]/font');
        expect(confirmLogin).toBeTruthy();
    }, 20000);

    test('flights', async() => {
        const flightsLink = await page.waitForXPath('/html/body/div[2]/table/tbody/tr/td[1]/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/a');
        await flightsLink.click();
        await page.waitForSelector("input[name=tripType]");
        await page.select("select[name=passCount]", "option[value=3]")
        //await page.click("select[name=fromPort]");
        await page.select("select[name=passCount]", "option[value=London]");
        //const From = await page.waitForXPath('/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[4]/td/table/tbody/tr/td[2]/table/tbody/tr[5]/td/form/table/tbody/tr[4]/td[2]/select/option[8]');
        //await From.click();
        await page.select("select[name=fromDay]", "option[value=12]");
        //const Day = await page.waitForXPath('/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[4]/td/table/tbody/tr/td[2]/table/tbody/tr[5]/td/form/table/tbody/tr[5]/td[2]/select[2]/option[16]');
        //await Day.click();
        await page.click("input[value=First]");
        await page.click("input[name=findFlights]");
        const result = await page.waitForXPath('/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[4]/td/table/tbody/tr[1]/td[2]/table/tbody/tr[1]/td/p/font/b/font[1]');
        expect(result).toBeTruthy()
    }, 20000);

    test('')

})

afterAll(() => {
    browser.close()
})