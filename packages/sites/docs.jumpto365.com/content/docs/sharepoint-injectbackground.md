---
title: "Adding a background image to a section "
id: sharepoint-injectbackground

---

```javascript
//Locates the section you have marked on the page and alter the Style of the section
     var element =  document.querySelector('[data-jumpto365navigatorzoneid="section1"]');
      while (element){
        if (element.dataset.automationId === "CanvasZone"){
          element.style.backgroundImage ="url(https://www.host.name/background.png)"
          element.style.backgroundPosition= "0% -10%"

        }
        element = element.parentElement
      }

```
