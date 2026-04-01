const {test,expect} = require('@playwright/test');


test('Browser Context Playwright test', async ({page})=>
{
   // const context =await browser.newContext();
   // const page =await context.newPage();

   const email="atul.singh2189@gmail.com";
   const ProductName= 'ZARA COAT 3';
     const products = page.locator(".card-body");
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

   await page.locator("#userEmail").fill(email);
   await page.locator ("#userPassword").fill("Atul9936@");
   await page.locator("#login").click();

  // console.log(await page.locator(".card-body b").first().textContent());

  await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").first().waitFor();
  const titles=   await page.locator(".card-body b").allTextContents();
  console.log(titles);

  const count = await products.count();
  for(let i =0;i<count;i++){
  if( await products.nth(i).locator("b").textContent() ===ProductName ) 
    {
    // add to cart
    await products.nth(i).locator("text= Add To Cart").click();
    break;
  }
}

await page.locator("[routerlink*='cart']").click();
await page.locator("div li").first().waitFor();
const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
expect(bool).toBeTruthy();
await page.locator("text=Checkout").click();
await page.locator("[placeholder*='Country']").pressSequentially("ind");
const dropdown = page.locator(".ta-results");
await dropdown.waitFor();
const optionsCount = await dropdown.locator("button").count();
for(let i=0;i<optionsCount;i++){
   const text= await dropdown.locator("button").nth(i).textContent();   
     if(text===" India"){
      await dropdown.locator("button").nth(i).click();
      break;
     }
}

expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
await page.locator(".action__submit").click();
await expect (page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
const orderID=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
//await page.pause();
  console.log(orderID);
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  for(let i=0;i<await rows.count();i++){
  const rowOrderId= await rows.nth(i).locator("th").textContent();
  if(orderID.includes(rowOrderId))
    {
      await rows.nth(i).locator("button").first().click();
      break;
  }
    
  }
const orderIdDetails = await page.locator(".col-text").textContent();
expect(orderID.includes(orderIdDetails)).toBeTruthy();

});



 