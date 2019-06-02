/**
 * 
 * http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/chrome_exports_Driver.html
 * https://cheerio.js.org/
 */


const fs = require('fs-extra');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const By = require('selenium-webdriver/lib/by');
const chromium = require('chromium');
const path = require("path")
const _ = require("lodash")
const cheerio = require("cheerio")
const chalk = require("chalk")

var TurndownService = require('turndown')

var turndownService = new TurndownService()


require('chromedriver');

function getref(html){
if (!html){
    return null
}

var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);


var ref = html.match(regex)
return ref
}


/**
 * pmg-numbered-content-number
 * pmg-numbered-content-heading
 * pmg-numbered-content-desc 
 * pmg-numbered-content-image
 * @param {*} bodyHTML
 * @returns
 */
function scrapProductivityLibraryPage(bodyHTML){
    const $ = cheerio.load(bodyHTML)
 
    var results = []
    
    var headerElement = $("#lib-header")
    var header = $(headerElement).html()

    var subheaderElement = $(".pmg-library-card-content-desc")
    var subHeader = $(subheaderElement).html()

    
    console.log(chalk.green(header))
    

    var elements = $(".pmg-numbered-content-number")
    for (let index = 0; index < elements.length; index++) {
        const element = elements[index];
        const numberHtml = $(element).html()
        const headingElement = $(element).next()
        const headingHtml = $(headingElement).html()
        const textElement = $(headingElement).next()
        const textHtml = $(textElement).html()
        const imgElement = $(textElement).next()
        const imgStyle = $(imgElement).attr("style")
        const imgRef = getref(imgStyle)
        const imgHtml = getref($(imgElement).html())
        var headingMarkdown = turndownService.turndown(headingHtml)
        var textMarkdown = turndownService.turndown(textHtml)
       // var imgMarkdown = turndownService.turndown(imgHtml)
       // const image = text.next()
        var img = imgRef && Array.isArray(imgRef) ? imgRef[0] : null
        var video =  imgHtml && Array.isArray(imgHtml) ? imgHtml[0] : null
       // console.log(headingHtml)
        results.push({
            number:numberHtml,headingMarkdown,textMarkdown,img ,video
        })
        
    }
    return {
        title: header,
        subTitle : subHeader,
        elements : results}
}

function load(driver, site,scrapper) {
    return new Promise((resolve, reject) => {
      

        driver.get(site.url)
            .then((a, b, c) => {

                console.log(chalk.grey(site.url))
                var x = driver.findElement(By.By.tagName("body"))
                x.then(a=>{
                    a.getAttribute("outerHTML").then(bodyHTML=>{
                        
                        var  pageData = scrapper(bodyHTML)
                        return resolve({url:site.url,pageData})
                    
                    })
                    
                })
                .catch(e=>{

                    console.log(chalk.yellow("Loading error", e))
                    resolve()
                })

                // takeScreenshot(driver, site.id)
                //     .then((x, y, c) => {
                //         resolve(true)
                //     })

            })
            .catch(err => {
                console.log("load",err)
                resolve(false)


            })
    });
}

function takeScreenshot(driver, name) {
    return new Promise((resolve, reject) => {
        driver.takeScreenshot().then((data) => {

            var dest = path.join(__dirname, `dump/${name}.png`)
            var destdir = path.join(__dirname, `dump`)
            fs.mkdirsSync(destdir)
            fs.writeFileSync(dest, data, 'base64');
            console.log('Screenshot is saved');
            resolve()
        });

    });
}
function scrap(_sites,scrapper) {
    var sites = _.cloneDeep(_sites)

    return new Promise((resolve, reject) => {


        let options = new chrome.Options();
        options.setChromeBinaryPath(chromium.path);
        options.addArguments('--headless');
        options.addArguments('--disable-gpu');
        options.addArguments('--window-size=1280,1024');

        new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build()
            .then(driver => {
                var pages = []
                function get() {
                    if (sites.length === 0) {
                        return resolve(pages)
                    }
                    var site = sites.pop()

                    load(driver, site,scrapper)
                        .then(page => {
                            if (page) pages.push(page)
                            get()
                        })
                        .catch(e=>{
                            console.log("scrap one",e,site.url)
                            get()
                        })
                }

                get()
            })

    });


    //   });



}

module.exports = {scrap,scrapProductivityLibraryPage}

//return
var productivityLibrarySites = require("./sites")
//productivityLibrarySites = ["https://www.microsoft.com/en-us/microsoft-365/success/productivitylibrary/use-your-device-like-a-pc-to-stay-productive-and-secure"]
scrap(productivityLibrarySites,scrapProductivityLibraryPage)
    .then(pages => {
        var dest = path.join(__dirname, `dump/pages.json`)
        var destdir = path.join(__dirname, `dump`)
        fs.mkdirsSync(destdir)
        fs.writeJSONSync(dest,pages);

        console.log("done")
        process.exit(0)
    })
    .catch(e=>{
        console.log("root",e)
        process.exit(1)
    })