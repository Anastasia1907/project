const puppeteer = require("puppeteer");
 

let browser;
let page;

beforeAll(async() => {
    browser = await puppeteer.launch({ headless: true, slowMo: 0});
    page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080
    })
});

describe("negative tests", () => {
    test ('invalid login', async() => {
        await page.goto('https://portal-dev.cloud.leadline.io/login');
        await page.waitForSelector('#login-form');
        await page.click("input[name=email]");
        await page.type("input[name=email]", 'anastasia@escritossad.net');
        await page.click("input[name=password]");
        await page.type("input[name=password]", '1234Qwer');
        const loginbutton = await page.waitForXPath('//*[@id="login-form"]/button');
        await loginbutton.click();
        const errmsg = await page.waitForXPath('/html/body/div[1]/div/div/div/div/div[1]/div/div[2]/form/p');
        expect(errmsg).toBeTruthy();
    }, 20000)
    test('valid Login', async() => {
        await page.click("input[name=email]", {clickCount: 3});
        await page.keyboard.press('Backspace');
        await page.type("input[name=email]", 'anastasia-tester@escritossad.net');
        await page.click("input[name=password]");
        const loginbutton = await page.waitForXPath('//*[@id="login-form"]/button');
        await loginbutton.click();
        await page.waitForSelector('#context-navigation');
    }, 20000);
    test('invalid characters in "Pos title" field', async() => {
        const CreateButton = await page.waitForXPath('/html/body/div[1]/div/div[1]/div[4]/button');
        await CreateButton.click();
        const NameField = await page.waitForXPath('//*[@id="positions"]/div/div[1]/div[3]/div[2]/div/div[1]/div/div[2]/div/div/input');
        await NameField.click();
        await NameField.type("йцу");
        const SubmitButtoon = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div[1]/div[5]/button');
        await SubmitButtoon.click();
        const alert1 = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div[2]/div/div[2]');
        expect(alert1).toBeTruthy(); 
    }, 20000);
    test('empty "DisplayName" field', async() => {
        const NameField = await page.waitForXPath('//*[@id="positions"]/div/div[1]/div[3]/div[2]/div/div[1]/div/div[2]/div/div/input');
        await NameField.click({clickCount: 3});
        await page.keyboard.press('Backspace');
        await NameField.type("test")
        const DisplayName = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div[1]/div[3]/div[2]/div/div[2]/div/div[3]/div/div/input');
        await DisplayName.click({clickCount: 3});
        await page.keyboard.press('Backspace');
        const SubmitButtoon = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div[1]/div[5]/button');
        await SubmitButtoon.click();
        const alert2 = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div[2]/div/div[2]');
        expect(alert2).toBeTruthy();
    }, 10000);

    test('publish uncompleted position', async() => {
        const PositionPage = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div[1]/div[2]/div/div/div[1]');
        await PositionPage.click();
        const PublishButton = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div[4]/div/div[4]/div[2]/div/button');
        await PublishButton.click();
        const ConfirmButton = await page.waitForXPath('/html/body/div[6]/div[3]/div/div[2]/button[1]');
        await ConfirmButton.click()
        const alert3 = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div[2]/div/div[2]');
        expect(alert3).toBeTruthy();
    }, 20000)
});
    test('invalid account settings: First name', async() => {
        const ProfileButton = await page.waitForXPath('/html/body/div[1]/div/div[1]/div[5]/div');
        await ProfileButton.click();
        const ProfileSettings = await page.waitForXPath('/html/body/div[4]/div[3]/ul/li[1]');
        await ProfileSettings.click();
        const FirstNameField = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div/div[3]/div[2]/div[2]/div[1]/div/div[2]/div/div/div/input');
        await FirstNameField.click();
        await FirstNameField.type('^%#');
        const UpdateButton = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div/div[3]/div[2]/div[3]/button');
        await UpdateButton.click();
        const alert4 = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div/div[3]/div[2]/div[2]/div[1]/div/div[2]/div/div/p');
        expect(alert4).toBeTruthy()
    }, 20000);

    test('invalid account settings: Last name', async() => {
        const FirstNameField = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div/div[3]/div[2]/div[2]/div[1]/div/div[2]/div/div/div/input');
        await FirstNameField.click({clickCount:3});
        await page.keyboard.press('Backspace');
        await FirstNameField.type("Nastya");
        const LastNameField = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div/div[3]/div[2]/div[2]/div[2]/div/div[2]/div/div/div/input');
        await LastNameField.click();
        await LastNameField.type("#^*");
        const UpdateButton = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div/div[3]/div[2]/div[3]/button');
        await UpdateButton.click();
        const alert5 = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div/div[3]/div[2]/div[2]/div[2]/div/div[2]/div/div/p');
        expect(alert5).toBeTruthy()
    }, 10000);
    
    test('invalid account settings: email address', async() => {
        const LastNameField = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div/div[3]/div[2]/div[2]/div[2]/div/div[2]/div/div/div/input');
        await LastNameField.click({clickCount: 3});
        await page.keyboard.press('Backspace');
        await LastNameField.type("test");
        const EmailField = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div/div[3]/div[2]/div[2]/div[3]/div/div[2]/div/div/div/input');
        await EmailField.click({clickCount: 3});
        await page.keyboard.press('Backspace');
        await EmailField.type("test");
        const UpdateButton = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div/div[3]/div[2]/div[3]/button');
        await UpdateButton.click();
        const alert6 = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div/div[3]/div[2]/div[2]/div[3]/div/div[2]/div/div/p');
        expect(alert6).toBeTruthy();
    }, 10000);

    test('invalid account settings: phone number', async() => {
        const EmailField = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div/div[3]/div[2]/div[2]/div[3]/div/div[2]/div/div/div/input');
        await EmailField.click({clickCount: 3});
        await page.keyboard.press('Backspace');
        await EmailField.type("anastasia-tester@escritossad.net");
        const PhoneField = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div/div[3]/div[2]/div[2]/div[4]/div/div[2]/div/div/div/input');
        await PhoneField.click({clickCount: 3});
        await page.keyboard.press('Backspace');
        await PhoneField.type("555");
        const UpdateButton = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div/div[3]/div[2]/div[3]/button');
        await UpdateButton.click();
        const alert7 = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div/div[3]/div[2]/div[2]/div[4]/div/div[2]/div/div/p');
        expect(alert7).toBeTruthy();
    }, 10000)

afterAll(() => {
    browser.close();
})
