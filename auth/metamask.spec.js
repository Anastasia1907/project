const puppeteer = require("puppeteer");
const dappeteer = require("dappeteer");
const path = require("path");

let browser, page, mmPage;

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
  //page = await browser.newPage();
  
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
    await Frase.type('party trim dragon stand gift giant security charge charge dumb forest pause');
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
    /*await page.setViewport({
      width: 1920,
      height: 1080
    });*/
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
    const menu = await page.waitForXPath('/html/body/div/div[2]/div[1]/div[4]/button');
    await menu.click();
    const connection = await page.waitForXPath('/html/body/div/div[2]/div[1]/div[4]/div/div[4]');
    await connection.click();
    await mmPage.bringToFront();
    await mmPage.reload();
    const sign = await mmPage.waitForXPath('/html/body/div[1]/div/div[4]/div/div[3]/button[2]');
    await sign.click();
    await page.bringToFront();
    const result = await page.waitForXPath('/html/body/div/div[2]/div/div[2]');
    expect(result).toBeTruthy();
    const menu2 = await page.waitForXPath('/html/body/div/div[2]/div[1]/div[4]/button');
    await menu2.click();
    await menu2.click();
    const selection = await page.waitForXPath('/html/body/div/div[2]/div[1]/div[4]/div/div[4]');
    await selection.click();
    const profileselection = await page.waitForXPath('/html/body/div/div[2]/div[1]/div/div/div[2]/div[3]/div[1]/div');
    await profileselection.click();
    const cookie = await page.waitForXPath('/html/body/div/div[1]/div/div[2]/div/button[2]');
    await cookie.click();
    const inputBIO = await page.waitForXPath('/html/body/div/div[3]/div[1]/div/form[1]/div[4]/div/textarea');
    await inputBIO.type("Lorem ipsum");
    const saveBIO = await page.waitForXPath('/html/body/div/div[2]/div[1]/div/form[1]/div[5]/button');
    await saveBIO.click()
  }, 40000);
 
  /*test("editing profile", async () => {
    /*const cookie = await page.waitForXPath('/html/body/div/div[1]/div/div[2]/div/button[2]');
    await cookie.click();
    const cancelBIO = await page.waitForXPath('/html/body/div/div[3]/div[1]/div/form[1]/div[5]/div');
    await cancelBIO.click();
    const pencilBIO = await page.waitForXPath('/html/body/div/div[2]/div[1]/div/form[1]/div[3]/button');
    await pencilBIO.click();
    const inputBIO = await page.waitForXPath('/html/body/div/div[3]/div[1]/div/form[1]/div[4]/div/textarea');
    await inputBIO.click();
    const saveBIO = await page.waitForXPath('/html/body/div/div[2]/div[1]/div/form[1]/div[5]/button');
    await saveBIO.click()
    await page.bringToFront();
    const copyWallet = await page.waitForXPath('/html/body/div/div[2]/div[2]/div[1]/div[2]/div[2]/div/div[1]');
    await copyWallet.click()
  }, 30000)*/
})

/*afterAll(() => {
  browser.close()
})*/