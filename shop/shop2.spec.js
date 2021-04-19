const puppeteer = require("puppeteer");
const faker = require("faker");

let browser;
let page;

const lead = {
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    pass: faker.internet.password(),
    company: faker.random.word(),
    address: faker.address.streetName(),
    city: faker.address.city(),
    code: faker.address.countryCode(),
    address2: faker.address.streetAddress()
}

beforeAll(async() => {
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 50
    });
    page = await browser.newPage();
    await page.setViewport({
        width: 560,
        height: 530
    })
});


describe("shop", () => {
    test("registration", async() => {
        await page.goto('http://automationpractice.com/index.php');
        const signinbutton = await page.waitForXPath('/html/body/div/div[1]/header/div[2]/div/div/nav/div[1]/a');
        await signinbutton.click();
        await page.waitForXPath('/html/body/div/div[2]/div/div[3]/div/div/div[1]/form/div/div[2]/input');
        //await page.waitFor(5000);
        await page.type('#email_create', lead.email);
        //await page.waitForXPath('/html/body/div/div[2]/div/div[3]/div/div/div[1]/form/div/div[3]/button');
        //await page.waitFor(5000);
        await page.click('#SubmitCreate');
        //await page.hover('#customer_firstname');
        await page.waitFor(10000);
        await page.click('#id_gender2');
        await page.type('#customer_firstname', lead.name);
        await page.type('#customer_lastname', lead.lastname)
        await page.type('#passwd', lead.pass);
        await page.select('#days', "22");
        await page.select('#months', "10");
        await page.select('#years', "1988");
        //await page.type('#firstname', lead.name);
        //await page.type('#lastname', lead.lastname);
        await page.type('#company', lead.company);
        await page.type('#address1', lead.address);
        await page.type('#city', lead.city);
        await page.select('#id_state', "13");
        await page.type('#postcode', "12345");
        await page.type('#phone_mobile', lead.phone);
        await page.click('#alias', {clickCount: 3});
        await page.keyboard.press('Backspace');
        await page.type('#alias', lead.address2);
        await page.click('#submitAccount');
        const ProfileMenu = await page.waitForXPath('/html/body/div/div[2]/div/div[3]/div/div/div[1]/ul/li[1]/a/span');
        expect(ProfileMenu).toBeTruthy()
    }, 70000);

    test("shoping", async() => {
        const WomaLink = await page.waitForXPath('/html/body/div/div[1]/header/div[3]/div/div/div[6]/ul/li[1]/a');
        await WomaLink.click();
        const ProductView = await page.waitForXPath('/html/body/div/div[2]/div/div[3]/div[2]/ul/li[1]/div/div[1]/div/a[2]');
        await ProductView.click();
        await page.waitForXPath('/html/body/div/div[2]/div/div[3]/div/div/div/div[4]/form/div/div[1]/div[1]/p[1]/span');
        await page.select('#group_1', "3");
        await page.click('#color_14');
        const AddToCart = await page.waitForXPath('/html/body/div/div[2]/div/div[3]/div/div/div/div[4]/form/div/div[3]/div[1]/p/button');
        await AddToCart.click();
        const ContinueShoping = await page.waitForXPath('/html/body/div/div[1]/header/div[3]/div/div/div[4]/div[1]/div[2]/div[4]/span');
        await ContinueShoping.click();
        const WomanTab = await page.waitForXPath('/html/body/div/div[2]/div/div[1]/a[2]');
        await WomanTab.click();
        const CartButton = await page.waitForXPath('/html/body/div/div[1]/header/div[3]/div/div/div[3]/div/a');
        await CartButton.click();
        const PaymentButton = await page.waitForXPath('/html/body/div/div[2]/div/div[3]/div/p[2]/a[1]');
        await PaymentButton.click();
        const AddressTab = await page.waitForXPath('/html/body/div/div[2]/div/div[3]/div/form/div/div[1]/div[1]/div/label');
        expect(AddressTab).toBeTruthy()
    }, 20000);

    test("delivery", async() => {
        const CheckoutButton = await page.waitForXPath('/html/body/div/div[2]/div/div[3]/div/form/p/button');
        await CheckoutButton.click();
        await page.click('#cgv');
        const CheckoutButton2 = await page.waitForXPath('/html/body/div/div[2]/div/div[3]/div/div/form/p/button');
        await CheckoutButton2.click();
        const ByCheck = await page.waitForXPath('/html/body/div/div[2]/div/div[3]/div/div/div[3]/div[2]/div/p/a');
        await ByCheck.click();
        const Confirm = await page.waitForXPath('/html/body/div/div[2]/div/div[3]/div/form/p/button');
        await Confirm.click();
        const alertOrder = await page.waitForXPath('/html/body/div/div[2]/div/div[3]/div/p[1]');
        expect(alertOrder).toBeTruthy()
    }, 10000)
});

afterAll( () => {
    browser.close()
})