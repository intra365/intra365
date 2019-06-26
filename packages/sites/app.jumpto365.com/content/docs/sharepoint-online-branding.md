---
title: SharePoint Online Branding
id: sharepoint-online-branding
---

## Hacks

### Remove the standard masthead
Removes the top navigation bar, the page header and the site sheader of a SharePoint Modern page

```javascript

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
        
```

done