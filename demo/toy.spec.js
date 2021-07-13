const puppeteer = require("puppeteer")

let browser, page, page2, cardInfo, CVV, date

beforeAll(async() => {
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 40
    });
    page = await browser.newPage()
});


describe("test toy shop", () => {
    test('copy card data', async() => {
        await page.goto('http://demo.guru99.com/payment-gateway/index.php');
        page2 = await browser.newPage()
        await page2.bringToFront()
        await page2.goto('http://demo.guru99.com/payment-gateway/cardnumber.php')
        let newPage = await page2.$x('/html/body/section/div/header/h2')
        newPage = newPage.pop();
        newPage = await newPage.getProperty('innerText');
        newPage = await newPage.jsonValue();
        expect(newPage).toContain('Here is your New Card')
        cardInfo = await page2.$x('//*[@id="three"]/div/h4[1]');
        cardInfo = cardInfo.pop();
        cardInfo = await cardInfo.getProperty('innerText');
        cardInfo = await cardInfo.jsonValue();
        cardInfo = parseInt(cardInfo.match(/\d+/))
        CVV = await page2.$x('/html/body/section/div/h4[2]')
        CVV = CVV.pop()
        CVV = await CVV.getProperty('innerText')
        CVV = await CVV.jsonValue()
        CVV = parseInt(CVV.match(/\d+/))
        date = await page2.$x('/html/body/section/div/h4[3]')
        date = date.pop()
        date = await date.getProperty('innerText')
        date = await date.jsonValue()
        date = await date.replace("Exp:- ", "")
        date = date.split('/')
        date[0] = date[0].replace("0", "")
    })
    
    test('buy toy', async() => {
        console.log(cardInfo)
        console.log(date[0])
        await page.bringToFront()
        const amount = await page.waitForXPath('//*[@id="three"]/div/form/div/div[4]/select')
        await amount.select('3')
        const buyButton = await page.waitForXPath('/html/body/section/div/form/div/div[8]/ul/li/input')
        await buyButton.click()
        await page.waitFor(3000)
        await page.type('#card_nmuber', cardInfo.toString())
        await page.waitFor(1000)
        await page.select('#month', date[0])
        await page.select('#year', date[1])
        await page.type('#cvv_code', CVV.toString())
        const payButton = await page.waitForXPath('/html/body/section/div/form/div[2]/div/ul/li/input')
        await payButton.click()
        await page.waitFor(1000)
        let successfull = await page.$x('/html/body/section/div/div/h2')
        successfull = successfull.pop()
        successfull = await successfull.getProperty('innerText')
        successfull = await successfull.jsonValue()
        expect(successfull).toContain('Payment successfull!')
    }, 50000)

    test('check balance', async() => {
        const menu = await page.waitForXPath('/html/body/header/div/a[2]/span')
        await menu.click()
        const balance = await page.waitForXPath('/html/body/div[2]/a[3]')
        await balance.click()
        await page.waitFor(3000)
        await page.type('#card_nmuber', cardInfo.toString())
        const checkButton = await page.waitForXPath('//*[@id="three"]/div/form/div/div[6]/input')
        await checkButton.click()
        await page.waitFor(1000)
        let limit = await page.$x('/html/body/section/div/div/h4/span')
        limit = limit.pop()
        limit = await limit.getProperty('innerText')
        limit = await limit.jsonValue()
        let cost = await page.$x('/html/body/section/div/div/table/tbody/tr/td[2]/b/font')
        cost = cost.pop()
        cost = await cost.getProperty('innerText')
        cost = await cost.jsonValue()
        cost = parseInt(cost.match(/\d+/))
        let max = 100
        let dif = max-cost
        console.log(dif)
        expect(dif).toBe(40)
    }, 40000)

    test('check buying without money', async() => {
        const shop = await page.waitForXPath('/html/body/header/div/a[1]')
        await shop.click()
        const amount2 = await page.waitForXPath('//*[@id="three"]/div/form/div/div[4]/select')
        await amount2.select('4')
        const buyNow = await page.waitForXPath('/html/body/section/div/form/div/div[8]/ul/li/input')
        await buyNow.click()
        await page.waitForXPath('/html/body/section/div/form/div[1]/div/font[2]')
        await page.type('#card_nmuber', cardInfo.toString())
        await page.select('#month', date[0])
        await page.select('#year', date[1])
        await page.type('#cvv_code', CVV.toString())
        const BuyBuy = await page.waitForXPath('/html/body/section/div/form/div[2]/div/ul/li/input')
        await BuyBuy.click()


    }, 30000)
    
    test('check balance', async() => {
        const menu2 = await page.waitForXPath('/html/body/header/div/a[2]/span')
        await menu2.click()
        const balance2 = await page.waitForXPath('/html/body/div[2]/a[3]')
        await balance2.click()
        await page.waitFor(3000)
        await page.type('#card_nmuber', cardInfo.toString())
        const checkButton2 = await page.waitForXPath('//*[@id="three"]/div/form/div/div[6]/input')
        await checkButton2.click()
        await page.waitFor(1000)
        let limit2 = await page.$x('/html/body/section/div/div/h4/span')
        limit2 = limit2.pop()
        limit2 = await limit2.getProperty('innerText')
        limit2 = await limit2.jsonValue()
        expect(limit2).toContain('-')
    }, 40000)
})

afterAll(() => {
    browser.close()
})