const {test,expect} = require('@playwright/test');


test('Browser Context Playwright test', async ({browser})=>
{
   const context =await browser.newContext();
   const page =await context.newPage();
   const userName=page.locator("#username");
   const signIn=page.locator("#signInBtn");
   const cardTitles= page.locator(".card-body a");
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title());
    await userName.fill("rahulshetty")
    await page.locator("[type='password']").fill("Learning@830$3mK2")
   // await page.locator("#password").fill("learning")
    await signIn.click();
   console.log(await page.locator("[style*='block']").inputValue());
   await expect (page.locator("[style*='block']")).toContainText('Incorrect');

   await userName.fill("");
   await userName.fill("rahulshettyacademy");
   await signIn.click();

  console.log(await cardTitles.first().inputValue());
  console.log(await cardTitles.nth(1).inputValue());

  const allTitles= await cardTitles.allTextContents();
  console.log(allTitles);

});


test('UI controls', async ({page})=>
{
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const userName=page.locator("#username");
   const signIn=page.locator("#signInBtn");
   const dropdown = page.locator("select.form-control");
   const documentlink =page.locator("[href*='documents-request']");
   await dropdown.selectOption("consult");
   await page.locator(".radiotextsty").last().click();
   await page.locator("#okayBtn").click();

   console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    await expect(documentlink).toHaveAttribute("class","blinkingText");
   //await page.pause();
});


test.only('Child Window Handling', async ({browser})=>
   {

   const context =await browser.newContext();
   const page =await context.newPage();
   const userName=page.locator("#username");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 
    const documentlink =page.locator("[href*='documents-request']");
   const[newPage]= await Promise.all(
      [
    context.waitForEvent('page'),
    documentlink.click(),
   ])
    
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
   
    //console.log(domain);
    await page.locator("#username").fill(domain);
    await page.pause();

    console.log(await page.locator("#username").inputValue());
});