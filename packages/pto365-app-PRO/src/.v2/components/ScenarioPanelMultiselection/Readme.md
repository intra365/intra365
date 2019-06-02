

```js

const MockData = require("../../data/Mocks").default;

let scenarios =   [{
      "subject": "Work together on documents with colleagues",
      "area": "Communication & Media",
      "tools": [{
        "rating": 5,
        "name": "Excel",
        "data": {
          "name": "excel",
          "color": "#02723b",
          "icon": "https://jumpto365.com/resources/images/app/Excel.png",
          "Link": "https://office.live.com/start/Excel.aspx",
          "Content": "https://hexatown.github.io/docs/microsoft/office365/Excel"
        },
        "key": 1
      }, {
        "rating": 5,
        "name": "Office 365",
        "key": 2
      }, {
        "rating": 5,
        "name": "OneDrive",
        "data": {
          "name": "onedrive",
          "color": "#1174c3",
          "icon": "https://jumpto365.com/resources/images/app/OneDrive.png",
          "Content": "https://hexatown.github.io/docs/microsoft/office365/OneDrive"
        },
        "key": 3
      }, {
        "rating": 5,
        "name": "OneNote",
        "data": {
          "name": "onenote",
          "color": "#80397b",
          "icon": "https://jumpto365.com/resources/images/app/OneNote.png",
          "Link": "https://www.onenote.com/notebooks",
          "Content": "https://hexatown.github.io/docs/microsoft/office365/OneNote"
        },
        "key": 4
      }, {
        "rating": 5,
        "name": "Outlook",
        "data": {
          "name": "outlook",
          "color": "#2072b9",
          "icon": "https://jumpto365.com/resources/images/app/Mail.png",
          "Link": "https://outlook.office.com/owa/",
          "Content": "https://hexatown.github.io/docs/microsoft/office365/Mail"
        },
        "key": 5
      }, {
        "rating": 5,
        "name": "PowerPoint",
        "data": {
          "name": "powerpoint",
          "color": "#d24726",
          "icon": "https://jumpto365.com/resources/images/app/PowerPoint.png",
          "Link": "https://office.live.com/start/PowerPoint.aspx",
          "Content": "https://hexatown.github.io/docs/microsoft/office365/PowerPoint"
        },
        "key": 6
      }, {
        "rating": 5,
        "name": "SharePoint",
        "data": {
          "name": "sharepoint",
          "color": "#0072c6",
          "icon": "https://jumpto365.com/resources/images/app/SharePoint.png",
          "Content": "https://hexatown.github.io/docs/microsoft/office365/SharePoint"
        },
        "key": 7
      }, {
        "rating": 5,
        "name": "Skype for Business",
        "data": {
          "name": "skype for business",
          "color": "#00aff0",
          "icon": "https://jumpto365.com/resources/images/app/Skype.png",
          "Content": "https://hexatown.github.io/docs/microsoft/office365/Skype"
        },
        "key": 8
      }, {
        "rating": 5,
        "name": "Word",
        "data": {
          "name": "word",
          "color": "#2b579a",
          "icon": "https://jumpto365.com/resources/images/app/Word.png",
          "Link": "https://office.live.com/start/Word.aspx",
          "Content": "https://hexatown.github.io/docs/microsoft/office365/Word"
        },
        "key": 9
      }],
      "key": 1
    }, {
      "subject": "Understand customer preferences and predict requests",
      "area": "Communication & Media + Sales",
      "tools": [{
        "rating": 5,
        "name": "Excel",
        "data": {
          "name": "excel",
          "color": "#02723b",
          "icon": "https://jumpto365.com/resources/images/app/Excel.png",
          "Link": "https://office.live.com/start/Excel.aspx",
          "Content": "https://hexatown.github.io/docs/microsoft/office365/Excel"
        },
        "key": 1
      }, {
        "rating": 5,
        "name": "Power BI",
        "key": 2
      }, {
        "rating": 5,
        "name": "Yammer",
        "data": {
          "name": "yammer",
          "color": "#007dc6",
          "icon": "https://jumpto365.com/resources/images/app/Yammer.png",
          "Link": "https://www.yammer.com/",
          "Content": "https://hexatown.github.io/docs/microsoft/office365/Yammer"
        },
        "key": 3
      }],
      "key": 2
    }];

<ScenarioPanelMultiSelection scenarios={scenarios}  />
```