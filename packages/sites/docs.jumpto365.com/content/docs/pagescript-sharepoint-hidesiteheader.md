---
id: pagescript-sharepoint-hidesiteheader
title: "Hide SharePoint Site Title"

---

```js
var SiteHeaderTitle = document.querySelector('[data-automationid="SiteHeaderTitle"]');
        if (SiteHeaderTitle){
          SiteHeaderTitle.style.display="none"     
        }

```