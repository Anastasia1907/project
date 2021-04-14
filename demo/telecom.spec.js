const puppeteer = require("puppeteer");
const faker = require("faker");

let browser;
let page;
let path;

const lead = {
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    address: faker.random.word()
};

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: true,
        slowMo: 0
    });
    page = await browser.newPage();
});

describe("telecom test", () => {
    test('registration', async () => {
        await page.goto('http://demo.guru99.com/telecom/index.html');
        const AddUserLink = await page.waitForXPath('/html/body/section/div/div[1]/div[1]/h3/a');
        await AddUserLink.click();
        const Radio = await page.waitForXPath('/html/body/section/div/form/div/div[2]/label');
        await Radio.click();
        await page.type("#fname", lead.name);
        await page.type('#lname', lead.lastname);
        await page.type('#email', lead.email);
        const msg = await page.waitForXPath('/html/body/section/div/form/div/div[7]');
        await msg.click();
        await msg.type(lead.address);
        await page.type('#telephoneno', "1212121212");
        const Submit = await page.waitForXPath('/html/body/section/div/form/div/div[9]/ul/li[1]/input');
        await Submit.click();
    }, 20000);    


    test('add tarif', async() => {
        await page.waitFor(5000);
        path = await page.$x('/html/body/section/div/div/table/tbody/tr[1]/td[2]/h3');
        path = path.pop();
        path = await path.getProperty('innerText');
        path = await path.jsonValue();
        console.log(path);
        const HomeButton = await page.waitForXPath('/html/body/section/div/div/ul/li/a');
        await HomeButton.click();
        const AddTarif = await page.waitForXPath('/html/body/section/div/div[1]/div[2]/h3/a');
        await AddTarif.click();
        const IDPAste = await page.waitForXPath('//*[@id="customer_id"]');
        await IDPAste.type(path);
        const SubmitTarif = await page.waitForXPath('/html/body/section/div/form/div/div[6]/input');
        await SubmitTarif.click();
        const resultTrif = await page.waitForXPath('/html/body/section/div/marquee/h3');
        expect(resultTrif).toBeTruthy();
        //const SelectTarif = await page.waitForXPath('/html/body/section/div/form/div[1]/table/tbody/tr/td[1]/label');
        //await SelectTarif.click();
        const AddTarif2 = await page.waitForXPath('/html/body/section/div/form/div[2]/input');
        await AddTarif2.click();
        const  Confirmation = await page.waitForXPath('/html/body/section/div/h2');
        expect(Confirmation).toBeTruthy();
    }, 30000);

    test('add tarif plan', async() => {
        const HomeButton2 = await page.waitForXPath('/html/body/section/div/ul/li/a');
        await HomeButton2.click();
        const AddTarifLink = await page.waitForXPath('/html/body/section/div/div[3]/div[1]/h3/a');
        await AddTarifLink.click();
        await page.waitFor(5000);
        await page.type('#rental1', "12");
        await page.type('#local_minutes', "13");
        await page.type('#inter_minutes', "14");
        await page.type('#sms_pack', "15");
        await page.type('#minutes_charges', "16");
        await page.type('#inter_charges', "17");
        await page.type('#sms_charges', "18");
        const SubmitNewTarif = await page.waitForXPath('/html/body/section/div/form/div/div[36]/ul/li[1]/input');
        await SubmitNewTarif.click();
        const resultAdd = await page.waitForXPath('/html/body/section/div/h2');
        expect(resultAdd).toBeTruthy()
    }, 20000);

    test('pay', async() => {
        const HomeButton3 = await page.waitForXPath('/html/body/section/div/ul/li/a');
        await HomeButton3.click();
        const PayLink = await page.waitForXPath('/html/body/section/div/div[3]/div[2]/h3/a');
        await PayLink.click();
        const IDinput = await page.waitForXPath('/html/body/section/div/form/div/div[3]/input');
        await IDinput.type(path);
        const Continue = await page.waitForXPath('/html/body/section/div/form/div/div[6]/input');
        await Continue.click();
        const Billing = await page.waitForXPath('/html/body/section/div/header/h1');
        expect(Billing).toBeTruthy()
    }, 10000)

});

afterAll(() => {
    browser.close()
})