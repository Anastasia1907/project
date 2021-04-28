const puppeteer = require("puppeteer");
const iPhone = puppeteer.devices['iPhone 6'];

let page, brower;


const loginURL = "https://crane.vrealsoft.com/";

beforeAll(async () => {
    brower = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        devtools: true,
        ignoreHTTPSErrors: true,
        defaultViewport: {
            width: 375,
            height: 667,
            isMobile: true,
        }
    });
    page = await brower.newPage();
    await page.emulate(iPhone);

});

describe("test login", () => {
    test("empty fields", async () => {
        await page.goto(loginURL);
        await page.waitForXPath('/html/body/div[3]/div/div/div/div/div/form/div[1]/h2');
        await page.click('#next');
        await page.waitForXPath('/html/body/div[3]/div/div/div/div/div/form/div[3]/div[1]/div/p');
        let alertEmptyFields1 = await page.$x('/html/body/div[3]/div/div/div/div/div/form/div[3]/div[1]/div/p');
        alertEmptyFields1 = alertEmptyFields1.pop();
        alertEmptyFields1 = await alertEmptyFields1.getProperty('innerText');
        alertEmptyFields1 = await alertEmptyFields1.jsonValue();
        expect(alertEmptyFields1).toBe('Please enter your Email Address');
        await page.waitForXPath('/html/body/div[3]/div/div/div/div/div/form/div[3]/div[2]/div[2]/p');
        let alertEmptyFields2 = await page.$x('/html/body/div[3]/div/div/div/div/div/form/div[3]/div[2]/div[2]/p');
        alertEmptyFields2 = alertEmptyFields2.pop();
        alertEmptyFields2 = await alertEmptyFields2.getProperty('innerText');
        alertEmptyFields2 = await alertEmptyFields2.jsonValue();
        expect(alertEmptyFields2).toBe('Please enter your password')
    }, 10000);

    test("empty email", async () => {
        await page.type('#email', " ");
        await page.type('#password', "123456");
        await page.click('#next');
        await page.waitForXPath('/html/body/div[3]/div/div/div/div/div/form/div[3]/div[1]/div/p');
        let alertEmptyLogin = await page.$x('/html/body/div[3]/div/div/div/div/div/form/div[3]/div[1]/div/p');
        alertEmptyLogin = alertEmptyLogin.pop();
        alertEmptyLogin = await alertEmptyLogin.getProperty('innerText');
        alertEmptyLogin = await alertEmptyLogin.jsonValue();
        expect(alertEmptyLogin).toBe('Please enter your Email Address');
    });

    test("empty password", async () => {
        await page.type('#email', "test@test.com");
        await page.click('#password', { clickCount: 3 });
        await page.keyboard.press('Backspace');
        await page.click('#next');
        await page.waitForXPath('/html/body/div[3]/div/div/div/div/div/form/div[3]/div[2]/div[2]/p');
        let alertEmptyPassword = await page.$x('/html/body/div[3]/div/div/div/div/div/form/div[3]/div[2]/div[2]/p');
        alertEmptyPassword = alertEmptyPassword.pop();
        alertEmptyPassword = await alertEmptyPassword.getProperty('innerText');
        alertEmptyPassword = await alertEmptyPassword.jsonValue();
        expect(alertEmptyPassword).toBe('Please enter your password')
    });

    test("login with incorrect email", async () => {
        await page.type('#password', "123123");
        await page.click('#next');
        await page.waitForXPath('/html/body/div[3]/div/div/div/div/div/form/div[2]/p');
        let alertIncorrectEmail = await page.$x('/html/body/div[3]/div/div/div/div/div/form/div[2]/p');
        alertIncorrectEmail = alertIncorrectEmail.pop();
        alertIncorrectEmail = await alertIncorrectEmail.getProperty('innerText');
        alertIncorrectEmail = await alertIncorrectEmail.jsonValue();
        expect(alertIncorrectEmail).toBe("We can't seem to find your account")
    });

    test("login with invalid email: without @ and .", async () => {
        await page.click('#email', { clickCount: 3 });
        await page.keyboard.press('Backspace');
        await page.type('#email', "test");
        await page.click('#next');
        await page.waitForXPath('/html/body/div[3]/div/div/div/div/div/form/div[3]/div[1]/div/p')
        let alertInvalidEmail = await page.$x('/html/body/div[3]/div/div/div/div/div/form/div[3]/div[1]/div/p');
        alertInvalidEmail = alertInvalidEmail.pop();
        alertInvalidEmail = await alertInvalidEmail.getProperty('innerText');
        alertInvalidEmail = await alertInvalidEmail.jsonValue();
        expect(alertInvalidEmail).toBe("Please enter a valid email address.")
    });

    test("login with invalid email: without @", async () => {
        await page.click('#email', { clickCount: 3 });
        await page.keyboard.press('Backspace');
        await page.type('#email', "test.com");
        await page.click('#next');
        await page.waitForXPath('/html/body/div[3]/div/div/div/div/div/form/div[3]/div[1]/div/p')
        let alertInvalidEmail2 = await page.$x('/html/body/div[3]/div/div/div/div/div/form/div[3]/div[1]/div/p');
        alertInvalidEmail2 = alertInvalidEmail2.pop();
        alertInvalidEmail2 = await alertInvalidEmail2.getProperty('innerText');
        alertInvalidEmail2 = await alertInvalidEmail2.jsonValue();
        expect(alertInvalidEmail2).toBe("Please enter a valid email address.")
    });

    test("login with invalid email: without .", async () => {
        await page.click('#email', { clickCount: 3 });
        await page.keyboard.press('Backspace');
        await page.type('#email', "test@test");
        await page.click('#next');
        await page.waitForXPath('/html/body/div[3]/div/div/div/div/div/form/div[3]/div[1]/div/p');
        let alertInvalidEmail3 = await page.$x('/html/body/div[3]/div/div/div/div/div/form/div[3]/div[1]/div/p');
        alertInvalidEmail3 = alertInvalidEmail3.pop();
        alertInvalidEmail3 = await alertInvalidEmail3.getProperty('innerText');
        alertInvalidEmail3 = await alertInvalidEmail3.jsonValue();
        expect(alertInvalidEmail3).toBe("Please enter a valid email address.")
    })

    test("login with incorrect password", async () => {
        await page.click('#email', { clickCount: 3 });
        await page.keyboard.press('Backspace');
        await page.type('#email', "alex.povereny@gmail.com");
        await page.click('#next');
        await page.waitForXPath('/html/body/div[3]/div/div/div/div/div/form/div[2]');
        let alertIncorrectPassword = await page.$x('/html/body/div[3]/div/div/div/div/div/form/div[2]');
        alertIncorrectPassword = alertIncorrectPassword.pop();
        alertIncorrectPassword = await alertIncorrectPassword.getProperty('innerText');
        alertIncorrectPassword = await alertIncorrectPassword.jsonValue();
        expect(alertIncorrectPassword).toBe("Your password is incorrect")
    }, 10000);

    test("login with valid data", async () => {
        await page.click('#password', { clickCount: 3 });
        await page.keyboard.press('Backspace');
        await page.type('#password', "Eitanpo3");
        await page.click('#next');
        await page.waitForXPath('/html/body/div/div/div[5]/div[2]/div/h3/div')
    }, 10000);

});

afterAll(() => {
    brower.close()
})
