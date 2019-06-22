---
title: "Configuration"
metaTitle: "Syntax Highlighting is the meta title tag for this page"
metaDescription: "This is the meta description for this page"
---

# Action Types

## js 
## css
## html

# Samples
The following is a code block with JavaScript language syntax highlighting.

```javascript
var config = {

  /*
  The Global tags purpose is to hide most of the MastHeads in standard share point
  */ 
  global: [
    
    {
      type: "js",
      script: `
        if (true){
        var suiteNavPlaceHolder = document.querySelector('[id="SuiteNavPlaceHolder"]');
        if (suiteNavPlaceHolder){
          suiteNavPlaceHolder.style.display="none"     
        }
        var pageHeader = document.querySelector('[data-automation-id="pageHeader"]');
        if (pageHeader){
          pageHeader.style.display="none"     
        }
        var siteHeader = document.querySelector('[data-automationid="SiteHeader"]');
        if (siteHeader){
          siteHeader.style.display="none"     
        }
        }


`
    }
    
    
    
  ],
 /*
   Section 1 - Customers at the  center ... - Bubble background image
  */ 
  section1: [
    {
      type: "js",
     
      script: `
      
      var element =  document.querySelector('[data-zoneid="undefined"]');
      // if (!element){
      //   return console.log("Element not found)
      // }

      while (element){
        element = element.parentElement
        console.log(element.tagName, element.dataset)
       
        if (element.dataset.automationId === "CanvasZone"){
          element.style.backgroundImage ="url(https://raw.githubusercontent.com/extranets/cdn/master/media/bgBubbles%402x.png)"   
          element.style.backgroundPosition= "0% -10%"
          // element.style.height= "400px"
      }
      }



  `
    },
    {
      type: "xhtml",
     
      html: `
<h1>Section 1</h1>
  `
    },
    {
      type: "xscript",
      module:"xscript",
      script: `
// placeholder
  `
    }
  ],
/*
  Section 2 - The Nets way - Bubble background image
  */ 
 
  section2: [
    {
      type: "parentAction",
      query: { automationId: "CanvasZone" },
      script: `
element.style.backgroundImage ="url(https://raw.githubusercontent.com/extranets/cdn/master/media/bgBubbles%402x.png)"
element.style.backgroundPosition= "0% 60%"
//element.style.border= "2px solid green"
  `
    }
    ],
    /*
  Section 3 - Contacts - Bubble background image
  */ 
 
  section3: [
    {
      type: "parentAction",
      query: { automationId: "CanvasZone" },
      script: `
element.style.backgroundImage ="url(https://raw.githubusercontent.com/extranets/cdn/master/media/bgBubbles%402x.png)"
element.style.backgroundPosition= "0% 60%"
//element.style.border= "2px solid green"
  `
    }
  ]
};


/**
 * 
spo login https://christianiabpos-admin.sharepoint.com
spo app add --filePath /Users/niels/code/clients/nets/nets-intranets.com/packages/sharepoint-webpart/swissknife/sharepoint/solution/nets-webpart-swissknife.sppkg --overwrite
spo app deploy --id 76a55fa5-441a-4d96-94e6-e6bb5e3add61
spo theme set -n CustomerExperience -p /Users/niels/code/clients/nets/nets-intranets.com/packages/management/CustomerExperience.json
 */
```

Supports multiple languages.

The following is a code block with diff. Lines with `+` highlighted in green shade indicating an addition. Lines with `-` highlighted in red shade indicating a deletion.

```javascript
- const data = ['1','2'];
+ const data = [1,2];
```

## Live Editing example

```javascript react-live=true
<button className={'btn btn-default'}>Change my text</button>
```
