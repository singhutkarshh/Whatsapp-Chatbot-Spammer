const peppeteer = require("puppeteer");

const contactname = "Notes";
const noOfMsgs = 10;


(async function main(){
   
    try {
        //initialising pup and creating a browser page
        const browser = await peppeteer.launch({headless:false});
        const page = await browser.newPage();
        await page.setUserAgent(
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
        );

        //Navigating to whatsapp
        await page.goto("https://web.whatsapp.com/");

        //waiting for page to load
        await page.waitForSelector("._3m_Xw");
        await delay(5000);
     
        // find the contact
        await page.click(`span[title='${contactname}']`);
        await page.waitForSelector("._13NKt");

        // Find the message bar and focus on it
        const editor = await page.$("div[tabindex='-1']");
        await editor.focus();

        // loop and send msgs
        for(var i = 0; i < noOfMsgs ; i++){
            await page.evaluate(()=>{
                const message = "This is you boy!";
                document.execCommand("InsertText",false,message);
            });
            await page.click("span[data-testid='send']");
        }

    } catch (error) {
        console.log(error);
    }

})();

const delay = (time) =>{
    return new Promise((resolve)=>{
        setTimeout(resolve, time);
    });
}