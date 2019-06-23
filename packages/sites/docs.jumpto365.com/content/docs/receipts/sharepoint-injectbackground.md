---
title: "Adding a background image to a section "

---

# Adding a background image to a section 

Locates the section you have marked on the page and alter the Style of the section

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

