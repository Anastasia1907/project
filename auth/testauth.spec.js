const puppeteer = require("puppeteer");
const dappeteer = require("dappeteer");
const faker = require("faker");

const path = require("path");

let browser, page, mmPage;
const width = 1920;
const height = 1080;

//const email = faker.internet.email();

const METAMASK_PATH = path.resolve() + '/metamask/9.3.0';

async function getMetamaskPage(browser) {
  return new Promise((resolve, reject) => {
    browser.on('targetcreated', async target => {
      if (target.url().match("chrome-extension://[a-z]+/home.html")) {
        try {
          const page = await target.page()
          resolve(page)
        } catch (e) {
          reject(e)
        }
      }
    })
  })
}


beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 60,
    args: [
      `--disable-extensions-except=${METAMASK_PATH}`,
      `--load-extension=${METAMASK_PATH}`,
    ]
  });
  
  mmPage = await getMetamaskPage(browser);
});


describe("auth test", () => {
  test("metamask openning", async () => {
    const continueButton = await mmPage.waitFor('#app-content > div > div.main-container-wrapper > div > div > div > button');
    await continueButton.click();
    const Import = await mmPage.waitForXPath('/html/body/div[1]/div/div[3]/div/div/div[2]/div/div[2]/div[1]/button');
    await Import.click();
    const NoTY = await mmPage.waitForXPath('/html/body/div[1]/div/div[3]/div/div/div/div[5]/div[1]/footer/button[1]');
    await NoTY.click();
    const Frase = await mmPage.waitForXPath('/html/body/div[1]/div/div[3]/div/div/form/div[4]/div[1]/div/input');
    await Frase.type('elite globe brain require space local industry begin exhaust unfold broken fruit');
    const password = await mmPage.waitForXPath('/html/body/div[1]/div/div[3]/div/div/form/div[5]/div/input');
    await password.type('123456789');
    const pass2 = await mmPage.waitForXPath('/html/body/div[1]/div/div[3]/div/div/form/div[6]/div/input');
    await pass2.type('123456789');
    const confirm = await mmPage.waitForXPath('/html/body/div[1]/div/div[3]/div/div/form/div[7]/div');
    await confirm.click();
    const enter = await mmPage.waitForXPath('/html/body/div[1]/div/div[3]/div/div/form/button');
    await enter.click();
    const congratulations = await mmPage.waitForXPath('/html/body/div[1]/div/div[3]/div/div/button');
    await congratulations.click();
    const startwork = await mmPage.waitForXPath('/html/body/div[2]/div/div/section/footer/button');
    await startwork.click();
  }, 70000);

  test("authencity openning", async () => {
    const page = await browser.newPage();
    await page.setViewport({width, height});
    await page.goto('https://authencity.vrealsoft.com/');
    await mmPage.bringToFront();
    const cancelButton = await mmPage.waitForXPath('/html/body/div[1]/div/div[4]/div/div/div[1]/div[2]');
    await cancelButton.click();
    const connect = await mmPage.waitForXPath('/html/body/div[1]/div/div[3]/div/div[2]/div[4]/div[2]/button[2]');
    await connect.click();
    const connect2 = await mmPage.waitForXPath('/html/body/div[1]/div/div[3]/div/div[2]/div[2]/div[2]/footer/button[2]');
    await connect2.click();
    const network = await mmPage.waitForXPath('/html/body/div[1]/div/div[1]/div/div[2]/div[1]/div');
    await network.click();
    const netselect = await mmPage.waitForXPath('/html/body/div[1]/div/div[3]/div/li[4]/span');
    await netselect.click();
    await page.bringToFront();
    const Nickname = await page.waitForXPath('//*[@id="signUpForm"]/div[5]/div/input');
    await Nickname.type('testUserX');
    const Firstname = await page.waitForXPath('//*[@id="signUpForm"]/div[6]/div[1]/input');
    await Firstname.type('Vreal');
    const Lastname = await page.waitForXPath('//*[@id="signUpForm"]/div[6]/div[2]/input');
    await Lastname.type('QA');
    const Calendar = await page.waitForXPath('//*[@id="signUpForm"]/div[7]/div[1]/input');
    await Calendar.click();
    const yr = await page.waitForXPath('//*[@id="signUpForm"]/div[7]/div[1]/div/div/div[2]/div/div/button[1]');
    await yr.click();
    const month = await page.waitForXPath('//*[@id="signUpForm"]/div[7]/div[1]/div/div/div[2]/div/div/button[1]');
    await month.click();
    const date = await page.waitForXPath('//*[@id="signUpForm"]/div[7]/div[1]/div/div/div[2]/div/div/div/div[2]/button[3]');
    await date.click();
    const email = await page.waitForXPath('//*[@id="signUpForm"]/div[7]/div[2]/input');
    await email.type('email@test.com');
    const ClaimButton = await page.waitForXPath('//*[@id="signUpForm"]/button/div');
    await ClaimButton.click();
    //const checkbox1 = await page.waitForXPath('//*[@id="custom-modal"]/div/div/div[2]/div[2]/div[1]/div');
    //await checkbox1.click();
    //const checkbox2 = await page.waitForXPath('//*[@id="custom-modal"]/div/div/div[2]/div[2]/div[2]/div');
    //await checkbox2.click();
    //const termsButton = await page.waitForXPath('//*[@id="custom-modal"]/div/div/div[3]/button');
    //await termsButton.click();
    //await mmPage.bringToFront();
    //await mmPage.reload();
    //const confirm1 = await mmPage.waitForXPath('//*[@id="app-content"]/div/div[4]/div/div[3]/button[2]');
    //await confirm1.click();
    //await page.bringToFront();
    const error1 = await page.waitForXPath('/html/body/div/div[2]/div/div[2]');
    expect(error1).toBeTruthy()
    

  }, 50000)
})

afterAll(()=> {
  browser.close()
})