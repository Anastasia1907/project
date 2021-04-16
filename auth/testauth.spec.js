const puppeteer = require("puppeteer");
const dappeteer = require("dappeteer");

let browser;
let page;

/*beforeAll( async() => {
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 60,
    });
    page = await browser.newPage()
});*/

async function main() {
    const browser = await dappeteer.launch(puppeteer)
    const metamask = await dappeteer.getMetamask(browser)
    await metamask.importAccount("party trim dragon stand gift giant security charge charge dumb forest pause")
    await metamask.switchNetwork('ropsten')
    /*const Start = await page.waitForXPath('/html/body/div[1]/div/div[3]/div/div/div/button');
    await Start.click();
    const Import = await page.waitForXPath('/html/body/div[1]/div/div[3]/div/div/div[2]/div/div[2]/div[1]/button');
    await Import.click();
    const NoTY = await page.waitForXPath('/html/body/div[1]/div/div[3]/div/div/div/div[5]/div[1]/footer/button[1]');
    await NoTY.click();
    const Frase = await page.waitForXPath('/html/body/div[1]/div/div[3]/div/div/form/div[4]/div[1]/div/input');
    await Frase.type('party trim dragon stand gift giant security charge charge dumb forest pause');
    const password = await page.waitForXPath('/html/body/div[1]/div/div[3]/div/div/form/div[5]/div/input');
    await password.type('123456789');
    const pass2 = await page.waitForXPath('/html/body/div[1]/div/div[3]/div/div/form/div[6]/div/input');
    await pass2.type('123456789');
    const confirm = await page.waitForXPath('/html/body/div[1]/div/div[3]/div/div/form/div[7]/div');
    await confirm.click();
    const enter = await page.waitForXPath('/html/body/div[1]/div/div[3]/div/div/form/button');
    await enter.click();*/
    const page = await browser.newPage()
    await page.goto('https://authencity.vrealsoft.com/')
    const payButton = await page.$('#pay-with-eth')
    await payButton.click()
    await metamask.confirmTransaction()
}

main()


describe("auth test", () => {
    test("opening", async () => {
        //await page.waitForXPath('/html/body/div/div[1]/div[1]/div[4]/img');

    })
})

//afterAll(() => {
 //   browser.close()
//})