const puppeteer = require("puppeteer");

let page, brower;
const width = 1920;
const height = 1080;

const loginURL = "https://crane.vrealsoft.com/";

beforeAll(async () => {
    brower = await puppeteer.launch({
        headless: false,
        slowMo: 80
    });
    page = await brower.newPage();
    await page.setViewport({ width, height });
});

describe("test settings", () => {
    test("open personal info", async () => {
        await page.goto(loginURL);
        await page.waitForXPath('/html/body/div[3]/div/div/div/div/div/form/div[1]/h2');
        await page.type('#email', "alex.povereny@gmail.com")
        await page.type('#password', "Eitanpo3");
        await page.click('#next');
        await page.waitForXPath('/html/body/div[1]/div/div[1]/div/div/div')
        const Profile = await page.waitForXPath('/html/body/div[1]/div/div[1]/div/div/a[3]')
        await Profile.click();
        let PersonalInforation = await page.$x('/html/body/div[1]/div/div[5]/div[2]/div/div/div/div/div[1]/span');
        PersonalInforation = PersonalInforation.pop();
        PersonalInforation = await PersonalInforation.getProperty('innerText');
        PersonalInforation = await PersonalInforation.jsonValue();
        expect(PersonalInforation).toBe("פרטים אישיים");
    }, 30000);

    test("open settings", async() => {
        const SettingsIcon = await page.waitForXPath('/html/body/div[1]/div/div[1]/div/div/a[2]');
        await SettingsIcon.click();
        await page.waitForXPath('/html/body/div[1]/div/div[5]/div[2]/div[3]/div/div[1]');
        let Cranesettings = await page.$x('/html/body/div[1]/div/div[5]/div[2]/div[3]/div/div[1]');
        Cranesettings = Cranesettings.pop();
        Cranesettings = await Cranesettings.getProperty('innerText');
        Cranesettings = await Cranesettings.jsonValue();
        expect(Cranesettings).toBe("הגדרות מנופים")
    }, 20000);

    test("view crane details", async() => {
        const threeDotMenu = await page.waitForXPath('/html/body/div[1]/div/div[5]/div[2]/div[3]/table[1]/tbody/tr[1]/td[7]/div');
        await threeDotMenu.click();
        const moreDetails = await page.waitForXPath('//*[@id="popover-basic"]/div[2]/div[1]');
        await moreDetails.click();
        let detailsWindow = await page.$x('/html/body/div[4]/div/div/div[2]/div[1]');
        detailsWindow = detailsWindow.pop();
        detailsWindow = await detailsWindow.getProperty('innerText');
        detailsWindow = await detailsWindow.jsonValue();
        expect(detailsWindow).toBe("פרטים נוספים")
    }, 20000)
});

afterAll(() => {
    brower.close()
})