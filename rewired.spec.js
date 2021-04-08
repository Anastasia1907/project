const puppeteer = require("puppeteer");
const faker = require("faker");

let browser;
let page;

const lead = {
    positionName: faker.random.word,
    campaignName: faker.random.word
};

beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 0 });
    page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080
    })
});

describe('Position creation', () => {
    test('position form', async () => {
        await page.goto('https://portal-dev.cloud.leadline.io/login');
        await page.waitForSelector('#login-form');
        await page.click("input[name=email]");
        await page.type("input[name=email]", 'anastasia-tester@escritossad.net');
        await page.click("input[name=password]");
        await page.type("input[name=password]", '1234Qwer');
        const loginbutton = await page.waitForXPath('//*[@id="login-form"]/button');
        await loginbutton.click();
        await page.waitFor(6000);
        await page.waitForSelector('#context-navigation');
        const CreatePos = await page.waitForXPath('//*[@id="context-navigation"]/button/span[1]');
        await CreatePos.click();
        const NamePos = await page.waitForXPath('//*[@id="positions"]/div/div[1]/div[3]/div[2]/div/div[1]/div/div[2]/div/div/input');
        await NamePos.type('Teacher');
        const SubmitPos = await page.waitForXPath('//*[@id="positions"]/div/div[1]/div[5]/button/span[1]');
        await SubmitPos.click()
    }, 40000)
});
test('Questionnaire form', async () => {
    await page.waitFor(5000);
    const ContinButton = await page.waitForXPath('/html/body/div[5]/div[3]/div/div[4]/button');
    await ContinButton.click();
    await page.click('#questionnaireJobTitleDropdown');
    await page.type('#questionnaireJobTitleDropdown', 'General');
    await page.waitFor(2000);
    const TitleDropdown = await page.waitForXPath('//*[@id="questionnaireJobTitleDropdown-option-0"]/div');
    await TitleDropdown.click();
    const SeniorityDropdown = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div/div[3]/div[2]/div[1]/div[2]/div[1]/div[1]/div')
    await SeniorityDropdown.click();
    const SenItem = await page.waitForXPath('//*[@id="menu-"]/div[3]/ul/li[4]')
    await SenItem.click();
    await page.waitFor(2000);
    const locationRemote = await page.waitForXPath('//*[@id="questionnairelocations"]/div[1]/div[1]/div/div[2]/label/span[1]/span[1]/input');
    await locationRemote.click();
    const Citizenship = await page.waitForXPath('//*[@id="questionnaireCitizenship"]/div[2]/div[1]/span/span[1]/span[1]/input');
    await Citizenship.click();
    const CitizenshipItem = await page.waitForXPath('//*[@id="questionnaireCitizenship"]/div[1]/div/div/label[1]/span[1]/span[1]/input');
    await CitizenshipItem.click();
    const DrugTestON = await page.waitForXPath('//*[@id="questionnaireDrugTest"]/div[2]/div[1]/span/span[1]/span[1]/input');
    await DrugTestON.click();
    const DrugTest1 = await page.waitForXPath('//*[@id="questionnaireDrugTest"]/div[1]/div[1]/label/span[1]/span[1]/input');
    await DrugTest1.click();
    const DrugTest2 = await page.waitForXPath('//*[@id="questionnaireDrugTest"]/div[1]/div[2]/label/span[1]/span[1]/input');
    await DrugTest2.click();
    const TravelON = await page.waitForXPath('//*[@id="questionnaireTravel"]/div[2]/div[1]/span/span[1]/span[1]/input');
    await TravelON.click();
    const ExperienceON = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div/div[4]/div[2]/div[1]/div[2]/div[1]/span/span[1]/span[1]');
    await ExperienceON.click();
    const EducationON = await page.waitForXPath('//*[@id="questionnaireEducation"]/div[2]/div[1]/span/span[1]/span[1]/input');
    await EducationON.click();
    const EdDrop1 = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div/div[4]/div[2]/div[2]/div[1]/div[1]/div[1]/div/div');
    await EdDrop1.click();
    const Editem1 = await page.waitForXPath('//*[@id="menu-"]/div[3]/ul/li[5]');
    await Editem1.click();
    await page.waitFor(3000);
    const EdDrop2 = await page.waitForXPath('//*[@id="questionnaireEducationsPreferred"]');
    await EdDrop2.click();
    const Editem2 = await page.waitForXPath('//*[@id="menu-"]/div[3]/ul/li[5]');
    await Editem2.click();
    const PositionExit = await page.waitForXPath('//*[@id="positions"]/div/div/div[2]/div/div/div[1]');
    await page.waitFor(2000);
    await PositionExit.click();
    const lendPgae = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div[4]/div/div[1]/div[1]/div[1]/div[2]/a[3]');
    await lendPgae.click();
}, 70000);
test("Creating landing page", async () => {
    await page.waitFor(5000);
    const createButton = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div[3]/div/div[2]/div/div/p/a');
    await createButton.click();
    const editLink = await page.waitForXPath('//*[@id="builder"]/div/div[3]/div[2]/div[2]/div/div[1]/div[2]/div[2]/div');
    await editLink.click();
    const color1 = await page.waitForXPath('/html/body/div[7]/div/div/div[2]/div[2]/div[2]/div[2]');
    await color1.click();
    const input1 = await page.waitForXPath('/html/body/div[7]/div/div/div[2]/div[2]/div[2]/div[2]/input');
    await input1.click();
    await page.keyboard.press('Backspace', { clickCount: 8 });
    await input1.type('#660066');
    const color2 = await page.waitForXPath('/html/body/div[7]/div/div/div[2]/div[2]/div[2]/div[3]');
    await color2.click();
    const input2 = await page.waitForXPath('/html/body/div[7]/div/div/div[2]/div[2]/div[2]/div[3]/input');
    await input2.click();
    await page.keyboard.press('Backspace', { clickCount: 8 });
    await input2.type('#993333');
    const title = await page.waitForXPath('/html/body/div[7]/div/div/div[2]/div[1]/div/div/input');
    await title.click();
    await title.type(' new page');
    const Saving = await page.waitForXPath('/html/body/div[7]/div/div/div[3]/div/button[2]');
    await Saving.click();
    const savePage = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div[2]/div/div/div[3]/i');
    await savePage.click();
    await page.waitFor(5000)
}, 70000);

test("Campaigns", async () => {
    const positions = await page.waitForXPath('//*[@id="builder"]/div/div[2]/div/div/div[1]');
    await positions.click();
    const campaign = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div[4]/div/div[1]/div[1]/div[1]/div[2]/a[4]');
    await campaign.click();
    const createCampaign = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div/div[3]/p/span');
    await createCampaign.click();
    const CampName = await page.waitForXPath('/html/body/div[5]/div[3]/div/div[1]/div/div[2]/div[1]/div/div/input');
    await CampName.click();
    await CampName.type('Test');
    const LendingSelector = await page.waitForXPath('/html/body/div[5]/div[3]/div/div[2]/div/div[2]/div[1]/div/input');
    await LendingSelector.click();
    const selector = await page.waitForXPath('/html/body/div[6]/div[3]/ul/li[2]');
    await selector.click();
    await page.waitFor(5000);
    const submitButton = await page.waitForXPath('/html/body/div[5]/div[3]/div/div[3]/button');
    await submitButton.click();
    const Addchanell = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div/div[3]/div[2]/div/div[5]/div/div[2]/div[1]/button');
    await Addchanell.click();
    const ChannelSelector = await page.waitForXPath('/html/body/div[5]/div[3]/div/div[1]/div/div[2]/div[1]/div/div/div/input');
    await ChannelSelector.click();
    await ChannelSelector.type('testtest');
    const PostType = await page.waitForXPath('/html/body/div[5]/div[3]/div/div[2]/div/div[2]/div[1]/div/div/div/input');
    await PostType.click();
    await PostType.type('inst');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.waitFor(5000);
    const SaveChannel = await page.waitForXPath('/html/body/div[5]/div[3]/div/div[3]/button');
    await SaveChannel.click();
    await page.waitFor(2000);
}, 70000);

test("Publish position", async () => {
    const toHomepage = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div/div[2]/div/div/div[1]');
    await toHomepage.click();
    const PublishButton = await page.waitForXPath('/html/body/div[1]/div/div[2]/div/div/div[4]/div/div[1]/div[2]/div/button');
    await PublishButton.click();
    await page.waitFor(2000);
    const Conformation = await page.waitForXPath('/html/body/div[6]/div[3]/div/div[2]/button[1]/span[1]');
    await Conformation.click();
    await page.waitFor(1000)
}, 20000)

afterAll(() => {
    browser.close()
});


