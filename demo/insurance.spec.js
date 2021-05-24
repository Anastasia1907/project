const puppeteer = require("puppeteer");
const faker = require("faker");

let browser;
let page;

const lead = {
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    phone: faker.phone.phoneNumber(),
    street: faker.address.streetName(),
    city: faker.address.city(),
    country: faker.address.county(),
    email: faker.internet.email(),
    pass: faker.internet.password()
};

beforeAll(async() => {
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 0
    });
    page = await browser.newPage()
});


describe("Insuarence test", () => {
    test('registration', async() => {
        await page.goto('http://demo.guru99.com/insurance/v1/index.php');
        const RegistrButton = await page.waitForXPath('/html/body/div[3]/a');
        await RegistrButton.click();
        await page.waitForXPath('/html/body/div[3]/h1');
        await page.select('#user_title', "General");
        await page.type('#user_firstname', lead.name);
        await page.type('#user_surname', lead.lastname);
        await page.type('#user_phone', lead.phone);
        await page.select('#user_dateofbirth_1i', "1995");
        await page.click('#licencetype_f');
        await page.select('#user_licenceperiod', "10");
        await page.select('#user_occupation_id', "2");
        await page.type('#user_address_attributes_street', lead.street);
        await page.type('#user_address_attributes_city', lead.city);
        await page.type('#user_address_attributes_county', lead.country);
        await page.type('#user_user_detail_attributes_email', lead.email);
        await page.type('#user_user_detail_attributes_password', lead.pass);
        await page.type('#user_user_detail_attributes_password_confirmation', lead.pass);
        const CreateButton = await page.waitForXPath('/html/body/div[3]/form/div[5]/input[2]');
        await CreateButton.click();
        const LoginForm = await page.waitForXPath('/html/body/div[3]/form/div[3]/input');
        expect(LoginForm).toBeTruthy();
    }, 30000);

    test('login', async() => {
        await page.type('#email', lead.email);
        await page.type('#password', lead.pass);
        const LoginButton = await page.waitForXPath('/html/body/div[3]/form/div[3]/input');
        await LoginButton.click();
        const HomePage = await page.waitForXPath('/html/body/div[3]/div/div[1]/h2');
        expect(HomePage).toBeTruthy()
    }, 10000);

    
    test('Request', async() => {
        const RequestTab = await page.waitForXPath('/html/body/div[3]/div/ul/li[2]/a');
        await RequestTab.click();
        await page.select('#quotation_breakdowncover', "3");
        await page.click('#quotation_windscreenrepair_t');
        await page.type('#quotation_incidents', "death");
        await page.type('#quotation_vehicle_attributes_registration', "Audi");
        await page.type('#quotation_vehicle_attributes_mileage', "20000");
        await page.type('#quotation_vehicle_attributes_value', "3000000");
        await page.select('#quotation_vehicle_attributes_parkinglocation', "Road");
        await page.select('#quotation_vehicle_attributes_policystart_1i', "2020");
        await page.screenshot({path: 'screenshot.png'}); 
        const Calc = await page.waitForXPath('/html/body/div[3]/div/div[2]/form/div[8]/input[1]');
        await Calc.click();
        const Premium = await page.waitForXPath('/html/body/div[3]/div/div[2]/form/p');
        expect(Premium).toBeTruthy()
    }, 20000);

    test('logout', async() => {
        const LogoutButton = await page.waitForXPath('/html/body/div[3]/form/input');
        await LogoutButton.click();
        const LoginPage = await page.waitForXPath('/html/body/div[3]/h3');
        expect(LoginPage).toBeTruthy()
    })
});


afterAll(() => {
    browser.close()
})