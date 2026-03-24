const {test,expect} = require('@playwright/test');


test('Browser Context Playwright test', async ({page})=>
{
   // const context =await browser.newContext();
   // const page =await context.newPage();
   
   await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
   console.log(await page.title());
   // await page.locator(".text-reset").click();
   // await page.locator("#firstName").fill("atul");
   // await page.locator("#lastName").fill("singh");
   // await page.locator("#userEmail").fill("atul.singh2189@gmail.com");
   // await page.locator("#userMobile").fill("9876543210");
   // await page.locator("#userPassword").fill("Atul9936@");
   // await page.locator("#confirmPassword").fill("Atul9936@");
   // await page.locator("#login").click();
   // await page.locator(".text-reset").click();

   await page.locator("#userEmail").fill("atul.singh2189@gmail.com");
   await page.locator ("#userPassword").fill("Atul9936@");
   await page.locator("#login").click();

  // console.log(await page.locator(".card-body b").first().textContent());

 // await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").first().waitFor();

    const titles=   await page.locator(".card-body b").allTextContents();
    console.log(titles);
});



 