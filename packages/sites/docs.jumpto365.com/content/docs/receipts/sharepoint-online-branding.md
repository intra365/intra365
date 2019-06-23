---
title: "SharePoint Online Branding"
metaTitle: "Configuring SharePoint Online"
metaDescription: "This is the meta description"
hideInSidebar: true
---

# Branding SharePoint Online

SharePoint Online provides very little ability to let you comply to the Corporate Visual Identity of your company.


## Hacks

### Remove the standard masthead
Removes the top navigation bar, the page header and the site header of a SharePoint Modern page

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

