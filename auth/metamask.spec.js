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


beforeAll( async() => {
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 60,
        args: [
            `--disable-extensions-except=${METAMASK_PATH}`,
            `--load-extension=${METAMASK_PATH}`,
        ]
    });
    page = await browser.newPage()
    mmPage = await getMetamaskPage(browser);
});

// async function main() {
// }

// main()


describe("auth test", () => {
    test("opening", async () => {
        const startButton = await mmPage.waitForXPath('/html/body/div[1]/div/div[3]/div/div/div/button');
        await startButton.click()
    })
})

//afterAll(() => {
 //   browser.close()
//})