const puppeteer = require("puppeteer");
const faker = require("faker");

let browser;
let page;
let page2;
let page3;

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
    browser = await puppeteer.launch({headless: false, slowMo: 60});
    page = await browser.newPage()
});

describe("start", () => {
    /*test('registration', async() => {
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

    test('flights, no result', async() => {
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

    test('empty hotels', async() => {
        const hotelsLink = await page.waitForXPath('/html/body/div[2]/table/tbody/tr/td[1]/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[3]/td[2]/a');
        await hotelsLink.click();
        const resultHotels = await page.waitForXPath('/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[4]/td/table/tbody/tr[1]/td[2]/table/tbody/tr[3]/td/p/font[1]/b/font[1]');
        expect(resultHotels).toBeTruthy()

    });

    test('toys shop', async() => {
        page2 = await browser.newPage();
        await page2.goto('http://demo.guru99.com/payment-gateway/purchasetoy.php');
        const selectNumber = await page2.waitForXPath('/html/body/section/div/form/div/div[4]/select');
        await selectNumber.click();
        const BuyButton = await page2.waitForXPath('/html/body/section/div/form/div/div[8]/ul/li/input');
        await BuyButton.click();
        await page2.waitForXPath('/html/body/section/div/header/h2');
        await page2.type('#card_nmuber', "1234123412341234");
        await page2.select('#month', "12");
        await page2.select('#year', "2028");
        await page2.type('#cvv_code', "123")
        const PayButton = await page2.waitForXPath('/html/body/section/div/form/div[2]/div/ul/li/input');
        await PayButton.click();
        const resultToyshop = await page2.waitForXPath('/html/body/section/div/div/h2');
        expect(resultToyshop).toBeTruthy();

    }, 30000);
*/
    test('telecom', async() => {
        page3 = await browser.newPage();
        await page3.goto('http://demo.guru99.com/telecom/index.html');
        const AddUserLink = await page3.waitForXPath('/html/body/section/div/div[1]/div[1]/h3/a');
        await AddUserLink.click();
        await page3.click('#pending');
        await page3.type('#fname', lead.name);
        await page3.type('#lname', lead.sername);
        await page3.type('#email', lead.email);
        await page3.type('#message', lead.address);
        await page3.type('#telephoneno', lead.phone);
        const Submit = await page3.waitForXPath('/html/body/section/div/form/div/div[9]/ul/li[1]/input');
        await Submit.click();
        let path = await page3.$x('/html/body/section/div/div/table/tbody/tr[1]/td[2]/h3');
        path = path.pop();
        path = await path.getProperty('innerText');
        path = await path.jsonValue();
        const HomeButton = await page3.waitForXPath('/html/body/section/div/div/ul/li/a');
        await HomeButton.click();
        const AddTarif = await page3.waitForXPath('/html/body/section/div/div[1]/div[2]/h3/a');
        await AddTarif.click();
        await page3.type('#customer_id', path);
        const SubmitTarif = await page3.waitForXPath('/html/body/section/div/form/div/div[6]/input');
        await SubmitTarif.click();
    }, 30000)

})

afterAll(() => {
    browser.close()
})