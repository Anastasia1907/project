const puppeteer = require("puppeteer");
const faker = require("faker");

let page, brower;
const width = 1920;
const height = 1080;

const loginURL = "https://crane.vrealsoft.com/";
const email = faker.internet.email();

beforeAll(async () => {
    brower = await puppeteer.launch({
        headless: false,
        slowMo: 80
    });
    page = await brower.newPage();
    await page.setViewport({ width, height });
});

describe("test toolbar", () => {
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
        await page.waitForXPath('/html/body/div[4]/div/div/div[2]/div[1]')
        let detailsWindow = await page.$x('/html/body/div[4]/div/div/div[2]/div[1]');
        detailsWindow = detailsWindow.pop();
        detailsWindow = await detailsWindow.getProperty('innerText');
        detailsWindow = await detailsWindow.jsonValue();
        expect(detailsWindow).toBe("פרטים נוספים");
        const closeDetailsButton = await page.waitForXPath('/html/body/div[4]/div/div/div[1]/button/span[1]');
        await closeDetailsButton.click()
    }, 10000);

   /*test("edit crane details", async() => {
        const threeDotMenu2 = await page.waitForXPath('/html/body/div[1]/div/div[5]/div[2]/div[3]/table[1]/tbody/tr[1]/td[7]/div');
        await threeDotMenu2.click();
        const editDetails = await page.waitForXPath('//*[@id="popover-basic"]/div[2]/div[2]');
        await editDetails.click();
        let editCraneWindow = await page.$x('/html/body/div[4]/div/div/div[2]/div');
        editCraneWindow = editCraneWindow.pop();
        editCraneWindow = await editCraneWindow.getProperty('innerText');
        editCraneWindow = await editCraneWindow.jsonValue();
        expect(editCraneWindow).toBe("עדכון פרטי מנוף");
        const closeDetailsButton = await page.waitForXPath('/html/body/div[6]/div/div/div[1]/button/span[1]');
        await closeDetailsButton.click()
    }, 20000);

    test("assignment update", async() => {
        //const threeDotMenu3 = await page.waitForXPath('/html/body/div[1]/div/div[5]/div[2]/div[3]/table[1]/tbody/tr[1]/td[7]/div');
        //await threeDotMenu3.click();
        const assignmentUpdateButton = await page.waitForXPath('//*[@id="popover-basic"]/div[2]/div[3]');
        await assignmentUpdateButton.click();
        //await page.waitForXPath('/html/body/div[5]/div/div/div[2]/div');
        /*let assignmentWindow = await page.$x('/html/body/div[5]/div/div/div[2]/div');
        assignmentWindow = assignmentWindow.pop();
        assignmentWindow = await assignmentWindow.getProperty('innerText');
        assignmentWindow = await assignmentWindow.jsonValue();
        expect(assignmentWindow).toBe("עדכון שיוך ");
        const closeAssign = await page.waitForXPath('//*[@id="popover-basic"]/div[2]/div[3]');
        await closeAssign.click();
        


    }, 10000)*/

    /*test("add crane with valid data", async() => {
        const plusButton = await page.waitForXPath('/html/body/div/div/div[5]/div[2]/div[3]/div/div[2]');
        await plusButton.click();
        let addCraneWindow = await page.$x('/html/body/div[5]/div/div/div[2]/div/div[1]');
        addCraneWindow = addCraneWindow.pop();
        addCraneWindow = await addCraneWindow.getProperty('innerText');
        addCraneWindow = await addCraneWindow.jsonValue();
        expect(addCraneWindow).toBe("הוספת מנוף");
        await page.type('input[name="sn"]', "123123123");
        await page.type('input[name="model"]', "model");
        await page.select('select[name="type"]', "Feeder");
        await page.type('input[name="manufacturer"]', "fnc");
        const addCraneSubmit = await page.waitForXPath('/html/body/div[5]/div/div/div[2]/div/div[2]/form/div[5]/button');
        await addCraneSubmit.click()
    })*/

    test("harware tab: belongs to crane", async() => {
        const hardwareTab = await page.waitForXPath('/html/body/div[1]/div/div[5]/div[2]/div[1]/div/div/div/ul/li[2]/a');
        await hardwareTab.click();
        const threeDotMenu4 = await page.waitForXPath('/html/body/div[1]/div/div[5]/div[2]/div[2]/div[1]/table[1]/tbody/tr[1]/td[7]/div/img');
        await threeDotMenu4.click();
        const menuItem = await page.waitForXPath('//*[@id="assign-popover"]/div[2]');
        await menuItem.click();
        let AssignBoxWindow = await page.$x('/html/body/div[5]/div/div/div[2]/div/font/font');
        AssignBoxWindow = AssignBoxWindow.pop();
        AssignBoxWindow = await AssignBoxWindow.getProperty('innerText');
        AssignBoxWindow = await AssignBoxWindow.jsonValue();
        expect(AssignBoxWindow).toBe("שיוך קופסה למנוף");
        const closeAssignBox = await page.waitForXPath('/html/body/div[5]/div/div/div[1]/button/span[1]');
        await closeAssignBox.click()
    }, 10000);

    /*test("add box with valid data", async() => {
        const plusButton2 = await page.waitForXPath('/html/body/div[1]/div/div[5]/div[2]/div[2]/div[1]/div/div[2]/div');
        await plusButton2.click();
        let addBoxWindow = await page.$x('/html/body/div[5]/div/div/div[2]/div');
        addBoxWindow = addBoxWindow.pop();
        addBoxWindow = await addBoxWindow.getProperty('innerText');
        addBoxWindow = await addBoxWindow.jsonValue();
        expect(addBoxWindow).toBe("הוספת קופסה שחורה");
        await page.select('select[name="type"]', "Full");
        await page.type('input[name="friendlyName"]', "New");
        const addBoxSubmit = await page.waitForXPath('/html/body/div[5]/div/div/div[2]/form/div[3]/button');
        await addBoxSubmit.click()
    }, 10000)*/

    test("licenses tab: belongs to box", async() => {
        const licensesTab = await page.waitForXPath('/html/body/div[1]/div/div[5]/div[2]/div[1]/div/div/div/ul/li[3]/a');
        await licensesTab.click();
        const threeDotMenu5 = await page.waitForXPath('/html/body/div[1]/div/div[5]/div[2]/div[2]/div[1]/table[1]/tbody/tr[1]/td[6]/div/img');
        await threeDotMenu5.click();
        const menuItem1 = await page.waitForXPath('//*[@id="assign-popover"]/div[2]');
        await menuItem1.click();
        let belongsToBoxWindow = await page.$x('/html/body/div[5]/div/div/div[2]/div/font/font');
        belongsToBoxWindow = belongsToBoxWindow.pop();
        belongsToBoxWindow = await belongsToBoxWindow.getProperty('innerText');
        belongsToBoxWindow = await belongsToBoxWindow.jsonValue();
        expect(belongsToBoxWindow).toBe("שיוך רישיון לקופסה");
        const closeBelongsToBoxWindow = await page.waitForXPath('/html/body/div[5]/div/div/div[1]/button/span[1]');
        await closeBelongsToBoxWindow.click()
    }, 10000);

    /*test("users tab: add new user", async() => {
        const usersTab = await page.waitForXPath('/html/body/div[1]/div/div[5]/div[2]/div[1]/div/div/div/ul/li[4]/a');
        await usersTab.click();
        const addUserButton = await page.waitForXPath('/html/body/div[1]/div/div[5]/div[2]/div[3]/div/div[2]');
        await addUserButton.click();
        let addUserForm = await page.$x('/html/body/div[5]/div/div/div[2]/div');
        addUserForm = addUserForm.pop();
        addUserForm = await addUserForm.getProperty('innerText');
        addUserForm = await addUserForm.jsonValue();
        expect(addUserForm).toBe("הוספת משתמש");
        await page.type('input[name="mail"]', email);
        await page.select('select[name="company"]', "356b7e40-25cd-4802-bc39-1564b03da852");
        await page.select('select[name="role"]', "OperationManager");
        const addUserSubmit = await page.waitForXPath('/html/body/div[5]/div/div/div[2]/form/div[4]/button');
        await addUserSubmit.click();
    }, 10000)*/

    test("open notifications page", async() => {
        const notifButton = await page.waitForXPath('/html/body/div[1]/div/div[1]/div/div/a[1]');
        await notifButton.click();
        let emptyNotif = await page.$x('/html/body/div[1]/div/div[5]/div[2]/div/div/div/font/font');
        emptyNotif = emptyNotif.pop();
        emptyNotif = await emptyNotif.getProperty('innerText');
        emptyNotif = await emptyNotif.jsonValue();
        expect(emptyNotif).toBe("אין התראות חדשות להצגה")
    });

    /*test("upload previous alerts")*/


});

afterAll(() => {
    brower.close()
})