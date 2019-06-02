let fasttrack = require("./fasttrack.json")
let pto = require("./pto.json")
export default class TestData {


  
    static fasttrack = fasttrack
    static pto = pto
    static areas=[
      "Communication & Media",
      "Communication & Media + Sales",
      "Education",
      "Finance",
      "Financial Services",
      "Financial Services + Finance",
      "Financial Services + Marketing",
      "Financial Services + Sales",
      "Healthcare",
      "Hospitality",
      "Hospitality+Retail ",
      "Human Resources",
      "Manufacturing",
      "Manufacturing + Operations",
      "Manufacturing + Sales",
      "Manufacturing + Sales",
      "Manufacturing + Sales",
      "Marketing",
      "Operations",
      "Operations+Sales ",
      "Professional Services ",
      "Professional Services + Sales",
      "Retail",
      "Retail + Marketing",
      "Retail + Sales",
      "Retail + Human Resources",
      "Retail + Sales",
      "Sales",
      "Generic"
    ]
    static tools= [
      "Excel",
      "Office 365",
      "OneDrive",
      "OneNote",
      "Outlook",
      "PowerPoint",
      "SharePoint",
      "Skype for Business",
      "Word",
      "Power BI",
      "Yammer",
      "Delve",
      "Enterprise Mobility + Security",
      "Microsoft Teams",
      "Flow",
      "PowerApps",
      "Planner",
      "Sway",
      "Windows 10",
      "Project",
      "StaffHub",
      "MyAnalytics",
      "Visio",
      "WINDOWS 10",
      "MICROSOFT TEAMS",
      " OFFICE 365",
      "OUTLOOK",
      "SHAREPOINT",
      "YAMMER",
      "OFFICE 365 BASICS",
      " SHAREPOINT",
      " OFFICE 365 BASICS",
      " PLANNER",
      " SKYPE FOR BUSINESS",
      "Office 365 Basics",
      " OneDrive",
      " POWER BI",
      " YAMMER",
      "MYANALYTICS",
      "DELVE",
      " Outlook",
      " Office 365 Basics"
    ]
static url = "https://docs.hexatown.com/"

    static markdown = `---
layout: service
title: Word Online
inshort: Word processing in the browser
groups: Office Online
linkadmin: https://technet.microsoft.com/en-us/library/word-online-service-description.aspx
linkdev: https://developer.microsoft.com/en-us/word
link: https://office.live.com/start/Word.aspx
xlinkbusiness: 
xmarketing: https://products.office.com/en-us/visio/visio-online
source: https://products.office.com/en/office-online/documents-spreadsheets-presentations-office-online
similar: https://en.wikipedia.org/wiki/List_of_word_processors#Online
xicansharepoint: http://icansharepoint.com/wiki/Index
---

Word Online is a browser-based version of Microsoft Word, the ubiquitous
word processing app you\'ve likely been using for years. Word Online is
a \"lite\" version of the full-fledged desktop app and provides fast
opening times for reading and editing .docx and .doc files. Depending on
your browser settings, PDF files may also open in Word Online. Word
Online is great for reading Word files and making simple edits from
basically any browser on almost any device.

Most Word files will open directly in Word Online when using SharePoint
Online, OneDrive for Business, MS Teams, Yammer, and some other Office
365 apps. Files open in reading mode. To edit the files, simply click
the \"Edit Document\" button and choose to edit the file in Word Online
(directly in the browser) or Word (the desktop app).

Functionality in Word Online is generally limited to day-to-day editing,
text formatting, page layout changes, hyperlinks, and comments, though
it provides excellent support for co-authoring (simultaneous editing by
multiple users). You\'ll want to avoid more complex tasks like image
manipulation, indexes, footnotes, tables, and, notably, and [track
changes](http://icansharepoint.com/version-history-isnt-track-changes/)
(among others) in Word Online. Macros will not run in Word Online.

All changes made in Word Online are saved automatically; there is no
save button. This sometimes causes confusion with how [version
history](http://icsh.pt/VersionHistory),
[co-authoring](http://icsh.pt/CoAuthoring), and [check
in/out](http://icsh.pt/SPCheckOut) work.

If Word Online doesn\'t provide the features you need to do the job,
simply click the \"Edit in Word\" button in the menu bar to access the
desktop version of the app and its more complex features. Some versions
of the desktop app save updates automatically, but some do not. Be aware
of how this feature works on your version.

Resources
---------

-   [Functionality differences between Word and Word
    Online](https://support.office.com/en-us/article/Differences-between-using-a-document-in-the-browser-and-in-Word-3e863ce3-e82c-4211-8f97-5b33c36c55f8)
    \[Microsoft\]

Similar applications
--------------------

-   Google Docs

-   Apple Pages

-   [Other various
    apps](https://en.wikipedia.org/wiki/List_of_word_processors#Online)

Feedback
---------

-   [Word Online UserVoice](https://word.uservoice.com/forums/271331-word-online)
    \[UserVoice\]
    
-   [Word on TechCommunity](https://techcommunity.microsoft.com/t5/Word/ct-p/Word)
    \[Microsoft\]
    
Author
---------

-   [Matt Wade](https://www.linkedin.com/in/thatmattwade/), Office Services MVP
    `

    static scenariosSelected = [{
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
    }]

    static useCasesWithDetails = [
      {
        "name": "bookings",
        "color": "#25abb2",
        "icon": "https://jumpto365.com/resources/images/app/Bookings.png",
        "Content": "https://hexatown.github.io/docs/microsoft/use-cases/fasttrack/14.md"
      },
        
    ]
    static toolsWithDetails = [
    {
      "name": "bookings",
      "color": "#25abb2",
      "icon": "https://jumpto365.com/resources/images/app/Bookings.png",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/Bookings"
    },
    {
      "name": "calendar",
      "color": "#2072b9",
      "icon": "https://jumpto365.com/resources/images/app/Calendar.png",
      "Link": "https://outlook.office.com/owa/?path=/calendar/view/Day",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/Calendar"
    },
    {
      "name": "delve",
      "color": "#1c7bb9",
      "icon": "https://jumpto365.com/resources/images/app/Delve.png",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/Delve"
    },
    {
      "name": "dynamics365",
      "color": "#15224e",
      "icon": "https://jumpto365.com/resources/images/app/Dynamics.png",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/Dynamics"
    },
    {
      "name": "excel",
      "color": "#02723b",
      "icon": "https://jumpto365.com/resources/images/app/Excel.png",
      "Link": "https://office.live.com/start/Excel.aspx",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/Excel"
    },
    {
      "name": "flow",
      "color": "#0077ff",
      "icon": "https://jumpto365.com/resources/images/app/Flow.png",
      "Link": "https://flow.microsoft.com/en-us/",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/Flow"
    },
    {
      "name": "forms",
      "color": "#008271",
      "icon": "https://jumpto365.com/resources/images/app/Forms.png",
      "Link": "https://forms.office.com/",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/Forms"
    },
    {
      "name": "mail",
      "color": "#2072b9",
      "icon": "https://jumpto365.com/resources/images/app/Mail.png",
      "Link": "https://outlook.office.com/owa/",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/Mail"
    },
    {
      "name": "outlook",
      "color": "#2072b9",
      "icon": "https://jumpto365.com/resources/images/app/Mail.png",
      "Link": "https://outlook.office.com/owa/",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/Mail"
    },{
      "name": "newsfeed",
      "color": "#0072c6",
      "icon": "https://jumpto365.com/resources/images/app/Newsfeed.png",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/Newsfeed"
    },
    {
      "name": "onedrive",
      "color": "#1174c3",
      "icon": "https://jumpto365.com/resources/images/app/OneDrive.png",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/OneDrive"
    },
    {
      "name": "onenote",
      "color": "#80397b",
      "icon": "https://jumpto365.com/resources/images/app/OneNote.png",
      "Link": "https://www.onenote.com/notebooks",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/OneNote"
    },
    {
      "name": "people",
      "color": "#2072b9",
      "icon": "https://jumpto365.com/resources/images/app/People.png",
      "Link": "https://outlook.office.com/owa/?path=/people",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/People"
    },
    {
      "name": "planner",
      "color": "#3c853c",
      "icon": "https://jumpto365.com/resources/images/app/Planner.png",
      "Link": "https://tasks.office.com/",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/Planner"
    },
    {
      "name": "powerapps",
      "color": "#742774",
      "icon": "https://jumpto365.com/resources/images/app/PowerApps.png",
      "Link": "https://web.powerapps.com/home",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/PowerApps"
    },
    {
      "name": "powerbi",
      "color": "#f2c811",
      "icon": "https://jumpto365.com/resources/images/app/Power-BI.png",
      "Link": "https://app.powerbi.com/",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/Power-BI"
    },
    {
      "name": "powerpoint",
      "color": "#d24726",
      "icon": "https://jumpto365.com/resources/images/app/PowerPoint.png",
      "Link": "https://office.live.com/start/PowerPoint.aspx",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/PowerPoint"
    },
    {
      "name": "project",
      "color": "#2f722d",
      "icon": "https://jumpto365.com/resources/images/app/Project.png",
      "Link": "http://www.microsoftproject-online.com/",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/Project"
    },
    {
      "name": "sharepoint",
      "color": "#0072c6",
      "icon": "https://jumpto365.com/resources/images/app/SharePoint.png",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/SharePoint"
    },
    {
      "name": "skype",
      "color": "#00aff0",
      "icon": "https://jumpto365.com/resources/images/app/Skype.png",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/Skype"
    },
    {
      "name": "skype for business",
      "color": "#00aff0",
      "icon": "https://jumpto365.com/resources/images/app/Skype.png",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/Skype"
    },{
      "name": "staffhub",
      "color": "#25c8c2",
      "icon": "https://jumpto365.com/resources/images/app/StaffHub.png",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/StaffHub"
    },
    {
      "name": "stream",
      "color": "#c30052",
      "icon": "https://jumpto365.com/resources/images/app/Stream.png",
      "Link": "https://web.microsoftstream.com/",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/Stream"
    },
    {
      "name": "sway",
      "color": "#008272",
      "icon": "https://jumpto365.com/resources/images/app/Sway.png",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/Sway"
    },
    {
      "name": "tasks",
      "color": "#2072b9",
      "icon": "https://jumpto365.com/resources/images/app/Tasks.png",
      "Link": "https://outlook.office.com/owa/?path=/tasks",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/Tasks"
    },
    {
      "name": "teams",
      "color": "#3f418e",
      "icon": "https://jumpto365.com/resources/images/app/Teams.png",
      "Link": "https://teams.microsoft.com/",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/Teams"
    },
    {
      "name": "todo",
      "color": "#3896f9",
      "icon": "https://jumpto365.com/resources/images/app/To-Do.png",
      "Link": "https://todo.microsoft.com/?app",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/To-Do"
    },
    {
      "name": "visio",
      "color": "#4568c4",
      "icon": "https://jumpto365.com/resources/images/app/Visio.png",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/Visio"
    },
    {
      "name": "word",
      "color": "#2b579a",
      "icon": "https://jumpto365.com/resources/images/app/Word.png",
      "Link": "https://office.live.com/start/Word.aspx",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/Word"
    },
    {
      "name": "yammer",
      "color": "#007dc6",
      "icon": "https://jumpto365.com/resources/images/app/Yammer.png",
      "Link": "https://www.yammer.com/",
      "Content": "https://hexatown.github.io/docs/microsoft/office365/Yammer"
    }
  ]
    static  tasks=[
      {
        "area": "Communication & Media",
        "subject": "Work together on documents with colleagues",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Communication & Media",
        "subject": "Work together on documents with colleagues",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Communication & Media",
        "subject": "Work together on documents with colleagues",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Communication & Media",
        "subject": "Work together on documents with colleagues",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Communication & Media",
        "subject": "Work together on documents with colleagues",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Communication & Media",
        "subject": "Work together on documents with colleagues",
        "rating": 5,
        "tool": "PowerPoint"
      },
      {
        "area": "Communication & Media",
        "subject": "Work together on documents with colleagues",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Communication & Media",
        "subject": "Work together on documents with colleagues",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Communication & Media",
        "subject": "Work together on documents with colleagues",
        "rating": 5,
        "tool": "Word"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Understand customer preferences and predict requests",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Understand customer preferences and predict requests",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Understand customer preferences and predict requests",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Meet online to prepare for and troubleshoot a sales event",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Meet online to prepare for and troubleshoot a sales event",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Meet online to prepare for and troubleshoot a sales event",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Collect and analyze social media, web, and print outreach data",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Collect and analyze social media, web, and print outreach data",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Collect and analyze social media, web, and print outreach data",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Protect campaign analytics and other sensitive data",
        "rating": 5,
        "tool": "Enterprise Mobility + Security"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Protect campaign analytics and other sensitive data",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Access customer reviews and other data securely from your device",
        "rating": 5,
        "tool": "Enterprise Mobility + Security"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Access customer reviews and other data securely from your device",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Access customer reviews and other data securely from your device",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Resolve customer inquiries through collaboration",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Resolve customer inquiries through collaboration",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Resolve customer inquiries through collaboration",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Resolve customer inquiries through collaboration",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Create comprehensive press kits by engaging with in-house experts",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Create comprehensive press kits by engaging with in-house experts",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Create comprehensive press kits by engaging with in-house experts",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Create comprehensive press kits by engaging with in-house experts",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Create comprehensive press kits by engaging with in-house experts",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Collaborate on promo event handouts in a chat-based workspace",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Collaborate on promo event handouts in a chat-based workspace",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Collaborate on promo event handouts in a chat-based workspace",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Collaborate on promo event handouts in a chat-based workspace",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Collaborate on promo event handouts in a chat-based workspace",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Communication & Media + Sales",
        "subject": "Collaborate on promo event handouts in a chat-based workspace",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Education",
        "subject": "Balance classroom time with other faculty investments",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Education",
        "subject": "Balance classroom time with other faculty investments",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Education",
        "subject": "Balance classroom time with other faculty investments",
        "rating": 5,
        "tool": "PowerPoint"
      },
      {
        "area": "Education",
        "subject": "Balance classroom time with other faculty investments",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Education",
        "subject": "Help a student write a persuasive research paper",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Education",
        "subject": "Help a student write a persuasive research paper",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Education",
        "subject": "Help a student write a persuasive research paper",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Education",
        "subject": "Help a student write a persuasive research paper",
        "rating": 5,
        "tool": "PowerPoint"
      },
      {
        "area": "Education",
        "subject": "Help a student write a persuasive research paper",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Education",
        "subject": "Help a student write a persuasive research paper",
        "rating": 5,
        "tool": "Word"
      },
      {
        "area": "Education",
        "subject": "Connect to the classroom from anywhere",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Education",
        "subject": "Connect to the classroom from anywhere",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Education",
        "subject": "Connect to the classroom from anywhere",
        "rating": 5,
        "tool": "PowerPoint"
      },
      {
        "area": "Education",
        "subject": "Connect to the classroom from anywhere",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Education",
        "subject": "Connect to the classroom from anywhere",
        "rating": 5,
        "tool": "Word"
      },
      {
        "area": "Education",
        "subject": "Personalize instruction by analyzing student performance",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Education",
        "subject": "Personalize instruction by analyzing student performance",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Education",
        "subject": "Personalize instruction by analyzing student performance",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Education",
        "subject": "Collaborate with other teachers to plan inspiring lessons",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Education",
        "subject": "Collaborate with other teachers to plan inspiring lessons",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Education",
        "subject": "Collaborate with other teachers to plan inspiring lessons",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Education",
        "subject": "Find expertise and resources by using social networks",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Education",
        "subject": "Find expertise and resources by using social networks",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Education",
        "subject": "Find expertise and resources by using social networks",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Education",
        "subject": "Evaluate school data to gain insights about priorities",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Education",
        "subject": "Evaluate school data to gain insights about priorities",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Education",
        "subject": "Evaluate school data to gain insights about priorities",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Education",
        "subject": "Evaluate school data to gain insights about priorities",
        "rating": 5,
        "tool": "PowerPoint"
      },
      {
        "area": "Education",
        "subject": "Evaluate school data to gain insights about priorities",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Education",
        "subject": "Engage with experts to scale math classes and meet student needs",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Education",
        "subject": "Engage with experts to scale math classes and meet student needs",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Education",
        "subject": "Engage with experts to scale math classes and meet student needs",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Education",
        "subject": "Engage with experts to scale math classes and meet student needs",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Education",
        "subject": "Predict student success by using customized reporting tools",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Education",
        "subject": "Predict student success by using customized reporting tools",
        "rating": 5,
        "tool": "Flow"
      },
      {
        "area": "Education",
        "subject": "Predict student success by using customized reporting tools",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Education",
        "subject": "Predict student success by using customized reporting tools",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Education",
        "subject": "Predict student success by using customized reporting tools",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Education",
        "subject": "Predict student success by using customized reporting tools",
        "rating": 5,
        "tool": "PowerApps"
      },
      {
        "area": "Education",
        "subject": "Predict student success by using customized reporting tools",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Education",
        "subject": "Meet education compliance standards to safeguard school data",
        "rating": 5,
        "tool": "Enterprise Mobility + Security"
      },
      {
        "area": "Education",
        "subject": "Meet education compliance standards to safeguard school data",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Education",
        "subject": "Meet education compliance standards to safeguard school data",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Education",
        "subject": "Meet education compliance standards to safeguard school data",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Education",
        "subject": "Meet education compliance standards to safeguard school data",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Education",
        "subject": "Lead a class remotely with rich student interaction",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Education",
        "subject": "Lead a class remotely with rich student interaction",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Education",
        "subject": "Lead a class remotely with rich student interaction",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Education",
        "subject": "Lead a class remotely with rich student interaction",
        "rating": 5,
        "tool": "PowerPoint"
      },
      {
        "area": "Education",
        "subject": "Lead a class remotely with rich student interaction",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Finance",
        "subject": "Manage periodic closing processes",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Finance",
        "subject": "Manage periodic closing processes",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Finance",
        "subject": "Manage periodic closing processes",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Finance",
        "subject": "Use analytics to maximize business opportunities",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Finance",
        "subject": "Use analytics to maximize business opportunities",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Finance",
        "subject": "Use analytics to maximize business opportunities",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Finance",
        "subject": "Use analytics to maximize business opportunities",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Finance",
        "subject": "Plan and manage department budgets",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Finance",
        "subject": "Plan and manage department budgets",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Finance",
        "subject": "Plan and manage department budgets",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Finance",
        "subject": "Plan and manage department budgets",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Finance",
        "subject": "Plan and manage department budgets",
        "rating": 5,
        "tool": "PowerPoint"
      },
      {
        "area": "Finance",
        "subject": "Plan and manage department budgets",
        "rating": 5,
        "tool": "Word"
      },
      {
        "area": "Finance",
        "subject": "Easily and accurately perform financial analysis",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Finance",
        "subject": "Build consensus on financial analysis within your team",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Finance",
        "subject": "Prepare for a corporate earnings release",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Finance",
        "subject": "Prepare for a corporate earnings release",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Finance",
        "subject": "Prepare for a corporate earnings release",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Finance",
        "subject": "Prepare for a corporate earnings release",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Finance",
        "subject": "Prepare for a corporate earnings release",
        "rating": 5,
        "tool": "Planner"
      },
      {
        "area": "Finance",
        "subject": "Prepare for a corporate earnings release",
        "rating": 5,
        "tool": "PowerPoint"
      },
      {
        "area": "Finance",
        "subject": "Prepare for a corporate earnings release",
        "rating": 5,
        "tool": "Word"
      },
      {
        "area": "Financial Services",
        "subject": "Pinpoint market trends that impact financial performance",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Financial Services",
        "subject": "Pinpoint market trends that impact financial performance",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Financial Services",
        "subject": "Engage stakeholders with impactful presentations",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Financial Services",
        "subject": "Engage stakeholders with impactful presentations",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Financial Services",
        "subject": "Engage stakeholders with impactful presentations",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Financial Services",
        "subject": "Spend more time with clients and less time creating reports",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Financial Services",
        "subject": "Spend more time with clients and less time creating reports",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Financial Services",
        "subject": "Spend more time with clients and less time creating reports",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Financial Services",
        "subject": "Spend more time with clients and less time creating reports",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Financial Services",
        "subject": "Spend more time with clients and less time creating reports",
        "rating": 5,
        "tool": "Sway"
      },
      {
        "area": "Financial Services",
        "subject": "Develop investment proposals with real-time expert help",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Financial Services",
        "subject": "Develop investment proposals with real-time expert help",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Financial Services",
        "subject": "Develop investment proposals with real-time expert help",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Financial Services",
        "subject": "Develop investment proposals with real-time expert help",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Financial Services",
        "subject": "Quickly create compelling financial deliverables",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Financial Services",
        "subject": "Quickly create compelling financial deliverables",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Financial Services",
        "subject": "Quickly create compelling financial deliverables",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Financial Services",
        "subject": "Quickly create compelling financial deliverables",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Financial Services",
        "subject": "Hold online training sessions with remote financial advisors",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Financial Services",
        "subject": "Hold online training sessions with remote financial advisors",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Financial Services",
        "subject": "Access financial files quickly and securely from almost anywhere",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Financial Services",
        "subject": "Access financial files quickly and securely from almost anywhere",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Financial Services",
        "subject": "Access financial files quickly and securely from almost anywhere",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Financial Services",
        "subject": "Access financial files quickly and securely from almost anywhere",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Financial Services",
        "subject": "Automate financial processes by using integrated workflows",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Financial Services",
        "subject": "Automate financial processes by using integrated workflows",
        "rating": 5,
        "tool": "Flow"
      },
      {
        "area": "Financial Services",
        "subject": "Automate financial processes by using integrated workflows",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Financial Services",
        "subject": "Automate financial processes by using integrated workflows",
        "rating": 5,
        "tool": "PowerPoint"
      },
      {
        "area": "Financial Services",
        "subject": "Automate financial processes by using integrated workflows",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Financial Services",
        "subject": "Automate financial processes by using integrated workflows",
        "rating": 5,
        "tool": "Word"
      },
      {
        "area": "Financial Services",
        "subject": "Expedite decision-making by meeting with clients in real time",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Financial Services",
        "subject": "Expedite decision-making by meeting with clients in real time",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Financial Services",
        "subject": "Engage customers with a personalized banking experience",
        "rating": 5,
        "tool": "Windows 10"
      },
      {
        "area": "Financial Services",
        "subject": "Incorporate varied input to develop new financial offerings",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Financial Services",
        "subject": "Incorporate varied input to develop new financial offerings",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Financial Services",
        "subject": "Incorporate varied input to develop new financial offerings",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Financial Services",
        "subject": "Incorporate varied input to develop new financial offerings",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Financial Services",
        "subject": "Deliver financial analysis on time from anywhere",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Financial Services",
        "subject": "Deliver financial analysis on time from anywhere",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Financial Services",
        "subject": "Deliver financial analysis on time from anywhere",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Financial Services",
        "subject": "Deliver financial analysis on time from anywhere",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Financial Services",
        "subject": "Deliver personalized content to clients and stakeholders",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Financial Services",
        "subject": "Deliver personalized content to clients and stakeholders",
        "rating": 5,
        "tool": "Sway"
      },
      {
        "area": "Financial Services",
        "subject": "Share client feedback with branch managers",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Financial Services",
        "subject": "Share client feedback with branch managers",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Financial Services",
        "subject": "Share client feedback with branch managers",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Financial Services",
        "subject": "Share client feedback with branch managers",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Financial Services",
        "subject": "Get educated quickly on a new client’s business model",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Financial Services",
        "subject": "Get educated quickly on a new client’s business model",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Financial Services",
        "subject": "Get educated quickly on a new client’s business model",
        "rating": 5,
        "tool": "Sway"
      },
      {
        "area": "Financial Services",
        "subject": "Get educated quickly on a new client’s business model",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Financial Services + Finance",
        "subject": "Monitor and communicate about business performance",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Financial Services + Finance",
        "subject": "Monitor and communicate about business performance",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Financial Services + Finance",
        "subject": "Shorten the product planning cycle",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Financial Services + Finance",
        "subject": "Shorten the product planning cycle",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Financial Services + Finance",
        "subject": "Shorten the product planning cycle",
        "rating": 5,
        "tool": "Project"
      },
      {
        "area": "Financial Services + Finance",
        "subject": "Shorten the product planning cycle",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Financial Services + Finance",
        "subject": "Use modern digital tools to recruit the best analysts",
        "rating": 5,
        "tool": "Flow"
      },
      {
        "area": "Financial Services + Finance",
        "subject": "Use modern digital tools to recruit the best analysts",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Financial Services + Finance",
        "subject": "Use modern digital tools to recruit the best analysts",
        "rating": 5,
        "tool": "PowerApps"
      },
      {
        "area": "Financial Services + Finance",
        "subject": "Use modern digital tools to recruit the best analysts",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Financial Services + Finance",
        "subject": "Use modern digital tools to recruit the best analysts",
        "rating": 5,
        "tool": "StaffHub"
      },
      {
        "area": "Financial Services + Finance",
        "subject": "Use modern digital tools to recruit the best analysts",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Financial Services + Finance",
        "subject": "Use custom tools to streamline financial processes",
        "rating": 5,
        "tool": "Flow"
      },
      {
        "area": "Financial Services + Finance",
        "subject": "Use custom tools to streamline financial processes",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Financial Services + Finance",
        "subject": "Use custom tools to streamline financial processes",
        "rating": 5,
        "tool": "PowerApps"
      },
      {
        "area": "Financial Services + Finance",
        "subject": "Use custom tools to streamline financial processes",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Financial Services + Marketing",
        "subject": "Build consensus in a social network for a new investment product",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Financial Services + Marketing",
        "subject": "Build consensus in a social network for a new investment product",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Financial Services + Marketing",
        "subject": "Build consensus in a social network for a new investment product",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Financial Services + Marketing",
        "subject": "Build consensus in a social network for a new investment product",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Financial Services + Marketing",
        "subject": "Build consensus in a social network for a new investment product",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Financial Services + Marketing",
        "subject": "Build consensus in a social network for a new investment product",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Financial Services + Marketing",
        "subject": "Gain rich insights into your workflow to meet tight deadlines",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Financial Services + Marketing",
        "subject": "Gain rich insights into your workflow to meet tight deadlines",
        "rating": 5,
        "tool": "MyAnalytics"
      },
      {
        "area": "Financial Services + Marketing",
        "subject": "Gain rich insights into your workflow to meet tight deadlines",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Financial Services + Sales",
        "subject": "Manage sell sheet projects in a team-based environment",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Financial Services + Sales",
        "subject": "Manage sell sheet projects in a team-based environment",
        "rating": 5,
        "tool": "Planner"
      },
      {
        "area": "Financial Services + Sales",
        "subject": "Manage sell sheet projects in a team-based environment",
        "rating": 5,
        "tool": "Project"
      },
      {
        "area": "Financial Services + Sales",
        "subject": "Manage sell sheet projects in a team-based environment",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Financial Services + Sales",
        "subject": "Manage sell sheet projects in a team-based environment",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Financial Services + Sales",
        "subject": "Manage sell sheet projects in a team-based environment",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Financial Services + Sales",
        "subject": "Quickly collect, analyze, and visualize credit risk data in a dashboard",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Financial Services + Sales",
        "subject": "Quickly collect, analyze, and visualize credit risk data in a dashboard",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Financial Services + Sales",
        "subject": "Quickly collect, analyze, and visualize credit risk data in a dashboard",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Financial Services + Sales",
        "subject": "Keep up with knowledgeable investor clientele",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Financial Services + Sales",
        "subject": "Keep up with knowledgeable investor clientele",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Financial Services + Sales",
        "subject": "Keep up with knowledgeable investor clientele",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Financial Services + Sales",
        "subject": "Quickly identify and engage with in-house industry experts",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Financial Services + Sales",
        "subject": "Quickly identify and engage with in-house industry experts",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Financial Services + Sales",
        "subject": "Quickly identify and engage with in-house industry experts",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Financial Services + Sales",
        "subject": "Quickly identify and engage with in-house industry experts",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Financial Services + Sales",
        "subject": "Quickly identify and engage with in-house industry experts",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Healthcare",
        "subject": "Keep up with patient care from anywhere",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Healthcare",
        "subject": "Keep up with patient care from anywhere",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Healthcare",
        "subject": "Keep up with patient care from anywhere",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Healthcare",
        "subject": "Keep up with patient care from anywhere",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Healthcare",
        "subject": "Keep up with patient care from anywhere",
        "rating": 5,
        "tool": "PowerPoint"
      },
      {
        "area": "Healthcare",
        "subject": "Keep up with patient care from anywhere",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Healthcare",
        "subject": "Keep up with patient care from anywhere",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Healthcare",
        "subject": "Keep up with patient care from anywhere",
        "rating": 5,
        "tool": "Word"
      },
      {
        "area": "Healthcare",
        "subject": "Identify and alert colleagues about a spreading illness",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Healthcare",
        "subject": "Identify and alert colleagues about a spreading illness",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Healthcare",
        "subject": "Identify and alert colleagues about a spreading illness",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Healthcare",
        "subject": "Identify and alert colleagues about a spreading illness",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Healthcare",
        "subject": "Identify and alert colleagues about a spreading illness",
        "rating": 5,
        "tool": "PowerPoint"
      },
      {
        "area": "Healthcare",
        "subject": "Identify and alert colleagues about a spreading illness",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Healthcare",
        "subject": "Identify and alert colleagues about a spreading illness",
        "rating": 5,
        "tool": "Word"
      },
      {
        "area": "Healthcare",
        "subject": "Provide quick resolution to patient questions",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Healthcare",
        "subject": "Provide quick resolution to patient questions",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Healthcare",
        "subject": "Provide quick resolution to patient questions",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Healthcare",
        "subject": "Provide quick resolution to patient questions",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Healthcare",
        "subject": "Get an informed second opinion faster",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Healthcare",
        "subject": "Get an informed second opinion faster",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Healthcare",
        "subject": "Get an informed second opinion faster",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Healthcare",
        "subject": "Get an informed second opinion faster",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Healthcare",
        "subject": "Get an informed second opinion faster",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Healthcare",
        "subject": "Unite healthcare employees around quality and commitment",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Healthcare",
        "subject": "Unite healthcare employees around quality and commitment",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Healthcare",
        "subject": "Unite healthcare employees around quality and commitment",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Healthcare",
        "subject": "Create a patient care plan",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Healthcare",
        "subject": "Create a patient care plan",
        "rating": 5,
        "tool": "Word"
      },
      {
        "area": "Healthcare",
        "subject": "Manage your nursing shift from your device",
        "rating": 5,
        "tool": "StaffHub"
      },
      {
        "area": "Healthcare",
        "subject": "Protect patient and hospital data while making it accessible",
        "rating": 5,
        "tool": "Enterprise Mobility + Security"
      },
      {
        "area": "Healthcare",
        "subject": "Protect patient and hospital data while making it accessible",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Healthcare",
        "subject": "Use integrated apps and devices to improve patient care",
        "rating": 5,
        "tool": "Windows 10"
      },
      {
        "area": "Healthcare",
        "subject": "Streamline lab operations while ensuring compliance",
        "rating": 5,
        "tool": "Windows 10"
      },
      {
        "area": "Hospitality",
        "subject": "Quickly answer guest questions from anywhere in the hotel",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Hospitality",
        "subject": "Quickly answer guest questions from anywhere in the hotel",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Hospitality",
        "subject": "Quickly answer guest questions from anywhere in the hotel",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Hospitality",
        "subject": "Quickly answer guest questions from anywhere in the hotel",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Hospitality",
        "subject": "Ensure employees across hotel locations are on the same page",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Hospitality",
        "subject": "Ensure employees across hotel locations are on the same page",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Hospitality",
        "subject": "Ensure employees across hotel locations are on the same page",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Hospitality",
        "subject": "Ensure employees across hotel locations are on the same page",
        "rating": 5,
        "tool": "Sway"
      },
      {
        "area": "Hospitality",
        "subject": "Ensure employees across hotel locations are on the same page",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Hospitality+Retail ",
        "subject": "Publish and update team schedules",
        "rating": 5,
        "tool": "StaffHub"
      },
      {
        "area": "Human Resources",
        "subject": "Help employees filter relevant information and find answers faster",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Human Resources",
        "subject": "Help employees filter relevant information and find answers faster",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Human Resources",
        "subject": "Help employees filter relevant information and find answers faster",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Human Resources",
        "subject": "Help employees filter relevant information and find answers faster",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Human Resources",
        "subject": "Support new employees in onboarding",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Human Resources",
        "subject": "Support new employees in onboarding",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Human Resources",
        "subject": "Support new employees in onboarding",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Human Resources",
        "subject": "Support new employees in onboarding",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Human Resources",
        "subject": "Support new employees in onboarding",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Human Resources",
        "subject": "Integrate new hires into the team and work in progress",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Human Resources",
        "subject": "Integrate new hires into the team and work in progress",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Human Resources",
        "subject": "Integrate new hires into the team and work in progress",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Human Resources",
        "subject": "Integrate new hires into the team and work in progress",
        "rating": 5,
        "tool": "Planner"
      },
      {
        "area": "Human Resources",
        "subject": "Empower and engage employees in an enterprise social network",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Human Resources",
        "subject": "Empower and engage employees in an enterprise social network",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Human Resources",
        "subject": "Empower and engage employees in an enterprise social network",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Human Resources",
        "subject": "Empower and engage employees in an enterprise social network",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Human Resources",
        "subject": "Empower and engage employees in an enterprise social network",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Human Resources",
        "subject": "Engage employees with interactive online training",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Human Resources",
        "subject": "Engage employees with interactive online training",
        "rating": 5,
        "tool": "PowerPoint"
      },
      {
        "area": "Human Resources",
        "subject": "Engage employees with interactive online training",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Human Resources",
        "subject": "Engage employees with interactive online training",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Human Resources",
        "subject": "Streamline common HR processes by using intelligent tools",
        "rating": 5,
        "tool": "Flow"
      },
      {
        "area": "Human Resources",
        "subject": "Streamline common HR processes by using intelligent tools",
        "rating": 5,
        "tool": "Planner"
      },
      {
        "area": "Human Resources",
        "subject": "Streamline common HR processes by using intelligent tools",
        "rating": 5,
        "tool": "PowerApps"
      },
      {
        "area": "Human Resources",
        "subject": "Streamline common HR processes by using intelligent tools",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Human Resources",
        "subject": "Analyze and visualize HR data with powerful, intuitive tools",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Human Resources",
        "subject": "Analyze and visualize HR data with powerful, intuitive tools",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Human Resources",
        "subject": "Interview more candidates with greater efficiency",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Human Resources",
        "subject": "Interview more candidates with greater efficiency",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Human Resources",
        "subject": "Interview more candidates with greater efficiency",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Human Resources",
        "subject": "Interview more candidates with greater efficiency",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Human Resources",
        "subject": "Tap collective knowledge to develop a benefits plan",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Human Resources",
        "subject": "Tap collective knowledge to develop a benefits plan",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Human Resources",
        "subject": "Tap collective knowledge to develop a benefits plan",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Human Resources",
        "subject": "Coauthor a new employee handbook",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Human Resources",
        "subject": "Coauthor a new employee handbook",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Human Resources",
        "subject": "Coauthor a new employee handbook",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Human Resources",
        "subject": "Coauthor a new employee handbook",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Human Resources",
        "subject": "Manage a new HR policy rollout",
        "rating": 5,
        "tool": "Planner"
      },
      {
        "area": "Human Resources",
        "subject": "Manage a new HR policy rollout",
        "rating": 5,
        "tool": "Project"
      },
      {
        "area": "Human Resources",
        "subject": "Manage contractors with mobile scheduling",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Human Resources",
        "subject": "Manage contractors with mobile scheduling",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Human Resources",
        "subject": "Manage contractors with mobile scheduling",
        "rating": 5,
        "tool": "StaffHub"
      },
      {
        "area": "Human Resources",
        "subject": "Easily visualize workforce diversity data",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Human Resources",
        "subject": "Easily visualize workforce diversity data",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Human Resources",
        "subject": "Keep up with recruiting when offsite",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Human Resources",
        "subject": "Keep up with recruiting when offsite",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Human Resources",
        "subject": "Store employee data with industry-standard compliance",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Human Resources",
        "subject": "Collaborate to write better job listings",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Human Resources",
        "subject": "Collaborate to write better job listings",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Human Resources",
        "subject": "Collaborate to write better job listings",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Human Resources",
        "subject": "Collaborate to write better job listings",
        "rating": 5,
        "tool": "Word"
      },
      {
        "area": "Human Resources",
        "subject": "Stay better connected to candidates throughout the hiring process",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Human Resources",
        "subject": "Stay better connected to candidates throughout the hiring process",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Human Resources",
        "subject": "Stay better connected to candidates throughout the hiring process",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Human Resources",
        "subject": "Stay better connected to candidates throughout the hiring process",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Human Resources",
        "subject": "Communicate important news within the company",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Human Resources",
        "subject": "Communicate important news within the company",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Human Resources",
        "subject": "Communicate important news within the company",
        "rating": 5,
        "tool": "Sway"
      },
      {
        "area": "Human Resources",
        "subject": "Communicate important news within the company",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Manufacturing",
        "subject": "Resolve service and repair issues faster",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Manufacturing",
        "subject": "Resolve service and repair issues faster",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Manufacturing",
        "subject": "Resolve service and repair issues faster",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Manufacturing",
        "subject": "Resolve service and repair issues faster",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Manufacturing",
        "subject": "Resolve service and repair issues faster",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Manufacturing",
        "subject": "Crowd-source new product ideas",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Manufacturing",
        "subject": "Crowd-source new product ideas",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Manufacturing",
        "subject": "Crowd-source new product ideas",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Manufacturing",
        "subject": "Crowd-source new product ideas",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Manufacturing",
        "subject": "Discover opportunities for operational improvements ",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Manufacturing",
        "subject": "Discover opportunities for operational improvements ",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Manufacturing",
        "subject": "Discover opportunities for operational improvements ",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Manufacturing",
        "subject": "Discover opportunities for operational improvements ",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Manufacturing",
        "subject": "Discover opportunities for operational improvements ",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Manufacturing",
        "subject": "Work with suppliers to bring products to market faster",
        "rating": 5,
        "tool": "Planner"
      },
      {
        "area": "Manufacturing",
        "subject": "Work with suppliers to bring products to market faster",
        "rating": 5,
        "tool": "Project"
      },
      {
        "area": "Manufacturing",
        "subject": "Work with suppliers to bring products to market faster",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Manufacturing",
        "subject": "Work with suppliers to bring products to market faster",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Manufacturing",
        "subject": "Securely work with data and ideas from the factory floor",
        "rating": 5,
        "tool": "Windows 10"
      },
      {
        "area": "Manufacturing",
        "subject": "Bring products to market faster with a connected workforce",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Manufacturing",
        "subject": "Bring products to market faster with a connected workforce",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Manufacturing",
        "subject": "Bring products to market faster with a connected workforce",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Manufacturing",
        "subject": "Bring products to market faster with a connected workforce",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Manufacturing + Operations",
        "subject": "Protect customer and supplier data while maintaining productivity",
        "rating": 5,
        "tool": "Enterprise Mobility + Security"
      },
      {
        "area": "Manufacturing + Operations",
        "subject": "Protect customer and supplier data while maintaining productivity",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Manufacturing + Operations",
        "subject": "Reduce costs by coauthoring product documents in-house",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Manufacturing + Operations",
        "subject": "Reduce costs by coauthoring product documents in-house",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Manufacturing + Operations",
        "subject": "Reduce costs by coauthoring product documents in-house",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Manufacturing + Operations",
        "subject": "Reduce costs by coauthoring product documents in-house",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Manufacturing + Operations",
        "subject": "Reduce costs by coauthoring product documents in-house",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Manufacturing + Operations",
        "subject": "Make data-driven product design decisions",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Manufacturing + Operations",
        "subject": "Make data-driven product design decisions",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Manufacturing + Operations",
        "subject": "Make data-driven product design decisions",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Manufacturing + Operations",
        "subject": "Make data-driven product design decisions",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Manufacturing + Operations",
        "subject": "Make data-driven product design decisions",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Manufacturing + Operations",
        "subject": "Make data-driven product design decisions",
        "rating": 5,
        "tool": "Sway"
      },
      {
        "area": "Manufacturing + Operations",
        "subject": "Deliver clear manufacturing requirements",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Manufacturing + Operations",
        "subject": "Deliver clear manufacturing requirements",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Manufacturing + Operations",
        "subject": "Deliver clear manufacturing requirements",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Manufacturing + Operations",
        "subject": "Deliver clear manufacturing requirements",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Manufacturing + Operations",
        "subject": "Deliver clear manufacturing requirements",
        "rating": 5,
        "tool": "Sway"
      },
      {
        "area": "Manufacturing + Operations",
        "subject": "Deliver clear manufacturing requirements",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Manufacturing + Sales",
        "subject": "Use digital tools to ensure successful promotional events",
        "rating": 5,
        "tool": "Flow"
      },
      {
        "area": "Manufacturing + Sales",
        "subject": "Use digital tools to ensure successful promotional events",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Manufacturing + Sales",
        "subject": "Use digital tools to ensure successful promotional events",
        "rating": 5,
        "tool": "PowerApps"
      },
      {
        "area": "Manufacturing + Sales",
        "subject": "Use digital tools to ensure successful promotional events",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Manufacturing + Sales",
        "subject": "Use digital tools to ensure successful promotional events",
        "rating": 5,
        "tool": "StaffHub"
      },
      {
        "area": "Manufacturing + Sales",
        "subject": "Use digital tools to ensure successful promotional events",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Manufacturing + Sales",
        "subject": "Protect customer contracts, price lists, and related data",
        "rating": 5,
        "tool": "Enterprise Mobility + Security"
      },
      {
        "area": "Manufacturing + Sales",
        "subject": "Protect customer contracts, price lists, and related data",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Manufacturing + Sales",
        "subject": "Protect customer contracts, price lists, and related data",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Manufacturing + Sales",
        "subject": "Protect customer contracts, price lists, and related data",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Manufacturing + Sales",
        "subject": "Securely access company and customer data to score leads",
        "rating": 5,
        "tool": "Enterprise Mobility + Security"
      },
      {
        "area": "Manufacturing + Sales",
        "subject": "Securely access company and customer data to score leads",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Manufacturing + Sales",
        "subject": "Securely access company and customer data to score leads",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Manufacturing + Sales",
        "subject": "Securely access company and customer data to score leads",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Marketing",
        "subject": "Develop an effective Go-to-Market strategy",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Marketing",
        "subject": "Develop an effective Go-to-Market strategy",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Marketing",
        "subject": "Develop an effective Go-to-Market strategy",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Marketing",
        "subject": "Develop an effective Go-to-Market strategy",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Marketing",
        "subject": "Develop an effective Go-to-Market strategy",
        "rating": 5,
        "tool": "PowerPoint"
      },
      {
        "area": "Marketing",
        "subject": "Develop an effective Go-to-Market strategy",
        "rating": 5,
        "tool": "Word"
      },
      {
        "area": "Marketing",
        "subject": "Deliver on-target client proposals",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Marketing",
        "subject": "Deliver on-target client proposals",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Marketing",
        "subject": "Deliver on-target client proposals",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Marketing",
        "subject": "Deliver on-target client proposals",
        "rating": 5,
        "tool": "Sway"
      },
      {
        "area": "Marketing",
        "subject": "Manage a marketing event",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Marketing",
        "subject": "Manage a marketing event",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Marketing",
        "subject": "Manage a marketing event",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Marketing",
        "subject": "Manage a marketing event",
        "rating": 5,
        "tool": "Planner"
      },
      {
        "area": "Marketing",
        "subject": "Collaborate on marketing initiatives through a social network",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Marketing",
        "subject": "Collaborate on marketing initiatives through a social network",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Marketing",
        "subject": "Build a customer advocacy community",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Marketing",
        "subject": "Build a customer advocacy community",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Marketing",
        "subject": "Build a customer advocacy community",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Marketing",
        "subject": "Build a customer advocacy community",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Marketing",
        "subject": "Plan and carry out a successful product launch",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Marketing",
        "subject": "Plan and carry out a successful product launch",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Marketing",
        "subject": "Plan and carry out a successful product launch",
        "rating": 5,
        "tool": "Planner"
      },
      {
        "area": "Marketing",
        "subject": "Plan and carry out a successful product launch",
        "rating": 5,
        "tool": "Project"
      },
      {
        "area": "Marketing",
        "subject": "Plan and carry out a successful product launch",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Marketing",
        "subject": "Plan and carry out a successful product launch",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Marketing",
        "subject": "Quickly create a polished and compelling marketing presentation",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Marketing",
        "subject": "Quickly create a polished and compelling marketing presentation",
        "rating": 5,
        "tool": "PowerPoint"
      },
      {
        "area": "Marketing",
        "subject": "Quickly create a polished and compelling marketing presentation",
        "rating": 5,
        "tool": "Sway"
      },
      {
        "area": "Marketing",
        "subject": "Track campaign performance with interactive visuals",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Marketing",
        "subject": "Track campaign performance with interactive visuals",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Marketing",
        "subject": "Track campaign performance with interactive visuals",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Marketing",
        "subject": "Track campaign performance with interactive visuals",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Marketing",
        "subject": "Build a winning marketing strategy",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Marketing",
        "subject": "Build a winning marketing strategy",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Marketing",
        "subject": "Build a winning marketing strategy",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Marketing",
        "subject": "Build a winning marketing strategy",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Marketing",
        "subject": "Plan a summit by using mobile scheduling",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Marketing",
        "subject": "Plan a summit by using mobile scheduling",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Marketing",
        "subject": "Plan a summit by using mobile scheduling",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Marketing",
        "subject": "Plan a summit by using mobile scheduling",
        "rating": 5,
        "tool": "StaffHub"
      },
      {
        "area": "Marketing",
        "subject": "Plan and manage public relations activities",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Marketing",
        "subject": "Plan and manage public relations activities",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Marketing",
        "subject": "Plan and manage public relations activities",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Marketing",
        "subject": "Plan and manage public relations activities",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Marketing",
        "subject": "Plan and manage public relations activities",
        "rating": 5,
        "tool": "PowerPoint"
      },
      {
        "area": "Marketing",
        "subject": "Plan and manage public relations activities",
        "rating": 5,
        "tool": "Word"
      },
      {
        "area": "Operations",
        "subject": "Manage ongoing case work from anywhere",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Operations",
        "subject": "Manage ongoing case work from anywhere",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Operations",
        "subject": "Manage ongoing case work from anywhere",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Operations",
        "subject": "Manage ongoing case work from anywhere",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Operations",
        "subject": "Manage ongoing case work from anywhere",
        "rating": 5,
        "tool": "PowerPoint"
      },
      {
        "area": "Operations",
        "subject": "Manage ongoing case work from anywhere",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Operations",
        "subject": "Manage ongoing case work from anywhere",
        "rating": 5,
        "tool": "Word"
      },
      {
        "area": "Operations",
        "subject": "Manage your team scrum",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Operations",
        "subject": "Manage your team scrum",
        "rating": 5,
        "tool": "Planner"
      },
      {
        "area": "Operations",
        "subject": "Resolve supply issues faster",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Operations",
        "subject": "Resolve supply issues faster",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Operations",
        "subject": "Resolve supply issues faster",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Operations",
        "subject": "Resolve supply issues faster",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Operations",
        "subject": "Resolve supply issues faster",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Operations",
        "subject": "Help prevent safety incidents",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Operations",
        "subject": "Help prevent safety incidents",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Operations",
        "subject": "Help prevent safety incidents",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Operations",
        "subject": "Connect with experts to resolve a customer complaint",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Operations",
        "subject": "Connect with experts to resolve a customer complaint",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Operations",
        "subject": "Connect with experts to resolve a customer complaint",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Operations",
        "subject": "Connect with experts to resolve a customer complaint",
        "rating": 5,
        "tool": "Planner"
      },
      {
        "area": "Operations",
        "subject": "Employ best practices across company operations",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Operations",
        "subject": "Employ best practices across company operations",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Operations",
        "subject": "Employ best practices across company operations",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Operations",
        "subject": "Employ best practices across company operations",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Operations",
        "subject": "Reduce production downtime with faster maintenance",
        "rating": 5,
        "tool": "Planner"
      },
      {
        "area": "Operations",
        "subject": "Reduce production downtime with faster maintenance",
        "rating": 5,
        "tool": "Project"
      },
      {
        "area": "Operations",
        "subject": "Reduce production downtime with faster maintenance",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Operations",
        "subject": "Reduce production downtime with faster maintenance",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Operations+Sales ",
        "subject": "Produce winning RFPs faster",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Operations+Sales ",
        "subject": "Produce winning RFPs faster",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Operations+Sales ",
        "subject": "Produce winning RFPs faster",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Operations+Sales ",
        "subject": "Produce winning RFPs faster",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Operations+Sales ",
        "subject": "Produce winning RFPs faster",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Professional Services ",
        "subject": "Securely access sales data from almost anywhere",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Professional Services ",
        "subject": "Securely access sales data from almost anywhere",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Professional Services ",
        "subject": "Securely access sales data from almost anywhere",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Professional Services ",
        "subject": "Securely access sales data from almost anywhere",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Professional Services ",
        "subject": "Reduce time-to-market by coauthoring case studies with experts",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Professional Services ",
        "subject": "Reduce time-to-market by coauthoring case studies with experts",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Professional Services ",
        "subject": "Reduce time-to-market by coauthoring case studies with experts",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Professional Services ",
        "subject": "Reduce time-to-market by coauthoring case studies with experts",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Professional Services + Sales",
        "subject": "Create sales reports by developing your own tools and apps",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Professional Services + Sales",
        "subject": "Create sales reports by developing your own tools and apps",
        "rating": 5,
        "tool": "Flow"
      },
      {
        "area": "Professional Services + Sales",
        "subject": "Create sales reports by developing your own tools and apps",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Professional Services + Sales",
        "subject": "Create sales reports by developing your own tools and apps",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Professional Services + Sales",
        "subject": "Create sales reports by developing your own tools and apps",
        "rating": 5,
        "tool": "PowerApps"
      },
      {
        "area": "Professional Services + Sales",
        "subject": "Create sales reports by developing your own tools and apps",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Professional Services + Sales",
        "subject": "Track the success of in-store offers via a corporate social network",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Professional Services + Sales",
        "subject": "Track the success of in-store offers via a corporate social network",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Professional Services + Sales",
        "subject": "Track the success of in-store offers via a corporate social network",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Professional Services + Sales",
        "subject": "Track the success of in-store offers via a corporate social network",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Professional Services + Sales",
        "subject": "Track the success of in-store offers via a corporate social network",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Professional Services + Sales",
        "subject": "Track the success of in-store offers via a corporate social network",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Professional Services + Sales",
        "subject": "More securely access and work with your company sales apps",
        "rating": 5,
        "tool": "Enterprise Mobility + Security"
      },
      {
        "area": "Professional Services + Sales",
        "subject": "More securely access and work with your company sales apps",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Professional Services + Sales",
        "subject": "More securely access and work with your company sales apps",
        "rating": 5,
        "tool": "Windows 10"
      },
      {
        "area": "Retail",
        "subject": "Conduct sales training for store employees across the globe",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Retail",
        "subject": "Conduct sales training for store employees across the globe",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Retail",
        "subject": "Conduct sales training for store employees across the globe",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Retail",
        "subject": "Conduct sales training for store employees across the globe",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Retail",
        "subject": "Provide informed, prompt customer service",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Retail",
        "subject": "Provide informed, prompt customer service",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Retail",
        "subject": "Provide informed, prompt customer service",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Retail",
        "subject": "Securely collaborate with suppliers in a timely manner",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Retail",
        "subject": "Securely collaborate with suppliers in a timely manner",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Retail",
        "subject": "Securely collaborate with suppliers in a timely manner",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Retail",
        "subject": "Securely collaborate with suppliers in a timely manner",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Retail",
        "subject": "Gather and analyze purchasing data from multiple sources ",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Retail",
        "subject": "Gather and analyze purchasing data from multiple sources ",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Retail",
        "subject": "Gather and analyze purchasing data from multiple sources ",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Retail",
        "subject": "Harness the collective knowledge of your firstline workforce",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Retail",
        "subject": "Harness the collective knowledge of your firstline workforce",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Retail",
        "subject": "Harness the collective knowledge of your firstline workforce",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Retail",
        "subject": "Harness the collective knowledge of your firstline workforce",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Retail",
        "subject": "Collect and analyze holiday sales performance data",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Retail",
        "subject": "Collect and analyze holiday sales performance data",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Retail",
        "subject": "Serve customers quickly and securely from the sales floor",
        "rating": 5,
        "tool": "Windows 10"
      },
      {
        "area": "Retail + Marketing",
        "subject": "Maximize profits for seasonal launches by working as a team",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Retail + Marketing",
        "subject": "Maximize profits for seasonal launches by working as a team",
        "rating": 5,
        "tool": "Planner"
      },
      {
        "area": "Retail + Marketing",
        "subject": "Maximize profits for seasonal launches by working as a team",
        "rating": 5,
        "tool": "Project"
      },
      {
        "area": "Retail + Marketing",
        "subject": "Maximize profits for seasonal launches by working as a team",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Retail + Marketing",
        "subject": "Maximize profits for seasonal launches by working as a team",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Retail + Marketing",
        "subject": "Quickly build digital look books from existing collateral",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Retail + Marketing",
        "subject": "Quickly build digital look books from existing collateral",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Retail + Marketing",
        "subject": "Quickly build digital look books from existing collateral",
        "rating": 5,
        "tool": "PowerPoint"
      },
      {
        "area": "Retail + Marketing",
        "subject": "Protect loyalty program data with security and privacy policies",
        "rating": 5,
        "tool": "Enterprise Mobility + Security"
      },
      {
        "area": "Retail + Marketing",
        "subject": "Protect loyalty program data with security and privacy policies",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Retail + Marketing",
        "subject": "Protect loyalty program data with security and privacy policies",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Retail + Marketing",
        "subject": "Easily plan and staff pop-up shops and other events",
        "rating": 5,
        "tool": "Flow"
      },
      {
        "area": "Retail + Marketing",
        "subject": "Easily plan and staff pop-up shops and other events",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Retail + Marketing",
        "subject": "Easily plan and staff pop-up shops and other events",
        "rating": 5,
        "tool": "PowerApps"
      },
      {
        "area": "Retail + Marketing",
        "subject": "Easily plan and staff pop-up shops and other events",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Retail + Marketing",
        "subject": "Easily plan and staff pop-up shops and other events",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Retail + Marketing",
        "subject": "Easily plan and staff pop-up shops and other events",
        "rating": 5,
        "tool": "StaffHub"
      },
      {
        "area": "Retail + Marketing",
        "subject": "Safeguard company data and systems from malicious threats",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Retail + Marketing",
        "subject": "Make confident purchase decisions from almost anywhere",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Retail + Marketing",
        "subject": "Make confident purchase decisions from almost anywhere",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Retail + Marketing",
        "subject": "Make confident purchase decisions from almost anywhere",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Retail + Marketing",
        "subject": "Make confident purchase decisions from almost anywhere",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Retail + Sales",
        "subject": "Share tips and best practices with your sales colleagues",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Retail + Sales",
        "subject": "Share tips and best practices with your sales colleagues",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Retail + Sales",
        "subject": "Share tips and best practices with your sales colleagues",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Retail + Sales",
        "subject": "Share tips and best practices with your sales colleagues",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Retail + Sales",
        "subject": "Securely qualify sales leads from wherever you are",
        "rating": 5,
        "tool": "Enterprise Mobility + Security"
      },
      {
        "area": "Retail + Sales",
        "subject": "Securely qualify sales leads from wherever you are",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Retail + Sales",
        "subject": "Securely qualify sales leads from wherever you are",
        "rating": 5,
        "tool": "Windows 10"
      },
      {
        "area": "Retail + Sales",
        "subject": "Increase sales team productivity by leveraging digital tools",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Retail + Sales",
        "subject": "Increase sales team productivity by leveraging digital tools",
        "rating": 5,
        "tool": "MyAnalytics"
      },
      {
        "area": "Retail + Sales",
        "subject": "Increase sales team productivity by leveraging digital tools",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Retail + Sales",
        "subject": "Gain insight into your work habits to manage your time better",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Retail + Sales",
        "subject": "Gain insight into your work habits to manage your time better",
        "rating": 5,
        "tool": "MyAnalytics"
      },
      {
        "area": "Retail + Sales",
        "subject": "Gain insight into your work habits to manage your time better",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Retail + Sales",
        "subject": "Improve retail customer service with secure access to customer data",
        "rating": 5,
        "tool": "Enterprise Mobility + Security"
      },
      {
        "area": "Retail + Sales",
        "subject": "Improve retail customer service with secure access to customer data",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Retail + Sales",
        "subject": "Improve retail customer service with secure access to customer data",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Retail + Sales",
        "subject": "Improve retail customer service with secure access to customer data",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Retail + Human Resources",
        "subject": "Increase employee engagement of firstline workers",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Retail + Human Resources",
        "subject": "Increase employee engagement of firstline workers",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Retail + Human Resources",
        "subject": "Increase employee engagement of firstline workers",
        "rating": 5,
        "tool": "PowerPoint"
      },
      {
        "area": "Retail + Human Resources",
        "subject": "Increase employee engagement of firstline workers",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Retail + Human Resources",
        "subject": "Increase employee engagement of firstline workers",
        "rating": 5,
        "tool": "Sway"
      },
      {
        "area": "Retail + Human Resources",
        "subject": "Increase employee engagement of firstline workers",
        "rating": 5,
        "tool": "Word"
      },
      {
        "area": "Retail + Human Resources",
        "subject": "Increase employee engagement of firstline workers",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Retail + Sales",
        "subject": "Gain insight into customer opinions",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Retail + Sales",
        "subject": "Gain insight into customer opinions",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Retail + Sales",
        "subject": "Gain insight into customer opinions",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Sales",
        "subject": "Close deals by engaging experts and executives in important customer discussions",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Sales",
        "subject": "Close deals by engaging experts and executives in important customer discussions",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Sales",
        "subject": "Close deals by engaging experts and executives in important customer discussions",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Sales",
        "subject": "Plan and coordinate account management activities",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Sales",
        "subject": "Plan and coordinate account management activities",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Sales",
        "subject": "Plan and coordinate account management activities",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Sales",
        "subject": "Prepare and manage an RFP or proposal",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Sales",
        "subject": "Prepare and manage an RFP or proposal",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Sales",
        "subject": "Prepare and manage an RFP or proposal",
        "rating": 5,
        "tool": "Planner"
      },
      {
        "area": "Sales",
        "subject": "Tap into sales best practices across the company",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Sales",
        "subject": "Tap into sales best practices across the company",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Sales",
        "subject": "Tap into sales best practices across the company",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Sales",
        "subject": "Tap into sales best practices across the company",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Sales",
        "subject": "Be productive on the road",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Sales",
        "subject": "Be productive on the road",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Sales",
        "subject": "Be productive on the road",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Sales",
        "subject": "Be productive on the road",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Sales",
        "subject": "Be productive on the road",
        "rating": 5,
        "tool": "PowerPoint"
      },
      {
        "area": "Sales",
        "subject": "Be productive on the road",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Sales",
        "subject": "Be productive on the road",
        "rating": 5,
        "tool": "Word"
      },
      {
        "area": "Sales",
        "subject": "Manage accounts to close deals faster",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Sales",
        "subject": "Manage accounts to close deals faster",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Sales",
        "subject": "Manage accounts to close deals faster",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Sales",
        "subject": "Manage accounts to close deals faster",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Sales",
        "subject": "Manage accounts to close deals faster",
        "rating": 5,
        "tool": "Planner"
      },
      {
        "area": "Sales",
        "subject": "Manage accounts to close deals faster",
        "rating": 5,
        "tool": "PowerPoint"
      },
      {
        "area": "Sales",
        "subject": "Manage accounts to close deals faster",
        "rating": 5,
        "tool": "Word"
      },
      {
        "area": "Sales",
        "subject": "Provide data-driven recommendations for client success",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Sales",
        "subject": "Provide data-driven recommendations for client success",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Sales",
        "subject": "Provide data-driven recommendations for client success",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Sales",
        "subject": "Provide data-driven recommendations for client success",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Sales",
        "subject": "Provide data-driven recommendations for client success",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Sales",
        "subject": "Uncover opportunities to better meet sales forecasts",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Sales",
        "subject": "Uncover opportunities to better meet sales forecasts",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Sales",
        "subject": "Uncover opportunities to better meet sales forecasts",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Sales",
        "subject": "Uncover opportunities to better meet sales forecasts",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Sales",
        "subject": "Educate distributed sales representatives from anywhere ",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Sales",
        "subject": "Educate distributed sales representatives from anywhere ",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Sales",
        "subject": "Educate distributed sales representatives from anywhere ",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Sales",
        "subject": "Educate distributed sales representatives from anywhere ",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Sales",
        "subject": "Educate distributed sales representatives from anywhere ",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Sales",
        "subject": "Drive sales efficiency through an enterprise social network",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Sales",
        "subject": "Drive sales efficiency through an enterprise social network",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Sales",
        "subject": "Drive sales efficiency through an enterprise social network",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Sales",
        "subject": "Collaborate in real time to build consensus on a new CRM solution",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Sales",
        "subject": "Collaborate in real time to build consensus on a new CRM solution",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Sales",
        "subject": "Collaborate in real time to build consensus on a new CRM solution",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Sales",
        "subject": "Collaborate in real time to build consensus on a new CRM solution",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Sales",
        "subject": "Collaborate in real time to build consensus on a new CRM solution",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Sales",
        "subject": "Focus on selling by automating routine administrative tasks",
        "rating": 5,
        "tool": "Flow"
      },
      {
        "area": "Sales",
        "subject": "Focus on selling by automating routine administrative tasks",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Sales",
        "subject": "Focus on selling by automating routine administrative tasks",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Sales",
        "subject": "Focus on selling by automating routine administrative tasks",
        "rating": 5,
        "tool": "PowerApps"
      },
      {
        "area": "Sales",
        "subject": "Customize sales presentations to meet customer needs",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Sales",
        "subject": "Customize sales presentations to meet customer needs",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Sales",
        "subject": "Customize sales presentations to meet customer needs",
        "rating": 5,
        "tool": "PowerPoint"
      },
      {
        "area": "Sales",
        "subject": "Customize sales presentations to meet customer needs",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Sales",
        "subject": "Customize sales presentations to meet customer needs",
        "rating": 5,
        "tool": "Sway"
      },
      {
        "area": "Sales",
        "subject": "Customize sales presentations to meet customer needs",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Sales",
        "subject": "Engage customers more effectively",
        "rating": 5,
        "tool": "Flow"
      },
      {
        "area": "Sales",
        "subject": "Engage customers more effectively",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Sales",
        "subject": "Engage customers more effectively",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Sales",
        "subject": "Engage customers more effectively",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Sales",
        "subject": "Build a cohesive sales team to meet and beat revenue targets",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Sales",
        "subject": "Build a cohesive sales team to meet and beat revenue targets",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Sales",
        "subject": "Build a cohesive sales team to meet and beat revenue targets",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Sales",
        "subject": "Build a cohesive sales team to meet and beat revenue targets",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Sales",
        "subject": "Build a cohesive sales team to meet and beat revenue targets",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Sales",
        "subject": "Use integrated tools to improve your sales teams productivity",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Sales",
        "subject": "Use integrated tools to improve your sales teams productivity",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Sales",
        "subject": "Use integrated tools to improve your sales teams productivity",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Sales",
        "subject": "Use integrated tools to improve your sales teams productivity",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Sales",
        "subject": "Use integrated tools to improve your sales teams productivity",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Sales",
        "subject": "Engage with internal experts to optimize your sales content",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Sales",
        "subject": "Engage with internal experts to optimize your sales content",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Sales",
        "subject": "Engage with internal experts to optimize your sales content",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Sales",
        "subject": "Manage resources and scheduling to coordinate a team sale",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Sales",
        "subject": "Manage resources and scheduling to coordinate a team sale",
        "rating": 5,
        "tool": "Planner"
      },
      {
        "area": "Sales",
        "subject": "Manage resources and scheduling to coordinate a team sale",
        "rating": 5,
        "tool": "Project"
      },
      {
        "area": "Sales",
        "subject": "Create high-quality sales reports",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Sales",
        "subject": "Create high-quality sales reports",
        "rating": 5,
        "tool": "PowerPoint"
      },
      {
        "area": "Sales",
        "subject": "Create high-quality sales reports",
        "rating": 5,
        "tool": "Word"
      },
      {
        "area": "Sales",
        "subject": "Use industry-leading security to stay productive in the field",
        "rating": 5,
        "tool": "Enterprise Mobility + Security"
      },
      {
        "area": "Sales",
        "subject": "Use industry-leading security to stay productive in the field",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Sales",
        "subject": "Use industry-leading security to stay productive in the field",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Sales",
        "subject": "Use industry-leading security to stay productive in the field",
        "rating": 5,
        "tool": "Windows 10"
      },
      {
        "area": "Sales",
        "subject": "Bridge the gap between sales and marketing",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Sales",
        "subject": "Bridge the gap between sales and marketing",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Sales",
        "subject": "Bridge the gap between sales and marketing",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Sales",
        "subject": "Bridge the gap between sales and marketing",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Sales",
        "subject": "Quickly gain consensus on sales team budgets",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Sales",
        "subject": "Quickly gain consensus on sales team budgets",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Sales",
        "subject": "Analyze and streamline your workday",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Sales",
        "subject": "Analyze and streamline your workday",
        "rating": 5,
        "tool": "MyAnalytics"
      },
      {
        "area": "Sales",
        "subject": "Analyze and streamline your workday",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Sales",
        "subject": "Analyze and streamline your workday",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Sales",
        "subject": "Quickly visualize your sales data",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Sales",
        "subject": "Quickly visualize your sales data",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Sales",
        "subject": "Quickly visualize your sales data",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Sales",
        "subject": "Quickly visualize your sales data",
        "rating": 5,
        "tool": "Visio"
      },
      {
        "area": "Sales",
        "subject": "Prepare and manage sales planning activities",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Sales",
        "subject": "Prepare and manage sales planning activities",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Sales",
        "subject": "Prepare and manage sales planning activities",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Sales",
        "subject": "Prepare and manage sales planning activities",
        "rating": 5,
        "tool": "Planner"
      },
      {
        "area": "Sales",
        "subject": "Prepare and manage sales planning activities",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Sales",
        "subject": "Prepare and manage sales planning activities",
        "rating": 5,
        "tool": "PowerPoint"
      },
      {
        "area": "Sales",
        "subject": "Prepare and manage sales planning activities",
        "rating": 5,
        "tool": "Word"
      },
      {
        "area": "Sales",
        "subject": "Understand trends and visualize potential impact to sales forecasts",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Sales",
        "subject": "Understand trends and visualize potential impact to sales forecasts",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Sales",
        "subject": "Understand trends and visualize potential impact to sales forecasts",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Generic",
        "subject": "Interact in real time with IM, persistent chat, and presence",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Generic",
        "subject": "Interact in real time with IM, persistent chat, and presence",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Generic",
        "subject": "Interact in real time with IM, persistent chat, and presence",
        "rating": 5,
        "tool": "StaffHub"
      },
      {
        "area": "Generic",
        "subject": "Protect, detect, investigate, and respond to advanced threats",
        "rating": 5,
        "tool": "WINDOWS 10"
      },
      {
        "area": "Generic",
        "subject": "Unlock more productivity on powerful, modern devices",
        "rating": 5,
        "tool": "WINDOWS 10"
      },
      {
        "area": "Generic",
        "subject": "Manage firstline worker teams",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Generic",
        "subject": "Manage firstline worker teams",
        "rating": 5,
        "tool": "StaffHub"
      },
      {
        "area": "Generic",
        "subject": "Keep firstline workers up to date with the latest company policies and procedures",
        "rating": 5,
        "tool": "StaffHub"
      },
      {
        "area": "Generic",
        "subject": "Deliver onboarding materials and schedule training",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Generic",
        "subject": "Deliver onboarding materials and schedule training",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Generic",
        "subject": "Deliver onboarding materials and schedule training",
        "rating": 5,
        "tool": "StaffHub"
      },
      {
        "area": "Generic",
        "subject": "Deliver onboarding materials and schedule training",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Generic",
        "subject": "Transform teamwork in your organization",
        "rating": 5,
        "tool": "MICROSOFT TEAMS"
      },
      {
        "area": "Generic",
        "subject": "Transform teamwork in your organization",
        "rating": 5,
        "tool": " OFFICE 365"
      },
      {
        "area": "Generic",
        "subject": "Transform teamwork in your organization",
        "rating": 5,
        "tool": "OUTLOOK"
      },
      {
        "area": "Generic",
        "subject": "Transform teamwork in your organization",
        "rating": 5,
        "tool": "SHAREPOINT"
      },
      {
        "area": "Generic",
        "subject": "Transform teamwork in your organization",
        "rating": 5,
        "tool": "YAMMER"
      },
      {
        "area": "Generic",
        "subject": "Share sites and content",
        "rating": 5,
        "tool": "OFFICE 365 BASICS"
      },
      {
        "area": "Generic",
        "subject": "Share sites and content",
        "rating": 5,
        "tool": " SHAREPOINT"
      },
      {
        "area": "Generic",
        "subject": "Provide fast, informed answers to legal questions",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Generic",
        "subject": "Provide fast, informed answers to legal questions",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Generic",
        "subject": "Provide fast, informed answers to legal questions",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Generic",
        "subject": "Provide fast, informed answers to legal questions",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Generic",
        "subject": "Provide a chat-based workspace",
        "rating": 5,
        "tool": "MICROSOFT TEAMS"
      },
      {
        "area": "Generic",
        "subject": "Provide a chat-based workspace",
        "rating": 5,
        "tool": " OFFICE 365 BASICS"
      },
      {
        "area": "Generic",
        "subject": "Continue ongoing client work from anywhere",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Generic",
        "subject": "Continue ongoing client work from anywhere",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Generic",
        "subject": "Continue ongoing client work from anywhere",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Generic",
        "subject": "Continue ongoing client work from anywhere",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Generic",
        "subject": "Organize teamwork visually",
        "rating": 5,
        "tool": "OFFICE 365 BASICS"
      },
      {
        "area": "Generic",
        "subject": "Organize teamwork visually",
        "rating": 5,
        "tool": " PLANNER"
      },
      {
        "area": "Generic",
        "subject": "Create and impress loyal customers by understanding their preferences",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Generic",
        "subject": "Create and impress loyal customers by understanding their preferences",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Generic",
        "subject": "Create and impress loyal customers by understanding their preferences",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Generic",
        "subject": "Create and impress loyal customers by understanding their preferences",
        "rating": 5,
        "tool": "Sway"
      },
      {
        "area": "Generic",
        "subject": "Create and impress loyal customers by understanding their preferences",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Generic",
        "subject": "Develop impactful project deliverables as a team",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Generic",
        "subject": "Develop impactful project deliverables as a team",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Generic",
        "subject": "Develop impactful project deliverables as a team",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Generic",
        "subject": "Develop impactful project deliverables as a team",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Generic",
        "subject": "Develop impactful project deliverables as a team",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Generic",
        "subject": "Develop impactful project deliverables as a team",
        "rating": 5,
        "tool": "PowerPoint"
      },
      {
        "area": "Generic",
        "subject": "Develop impactful project deliverables as a team",
        "rating": 5,
        "tool": "Word"
      },
      {
        "area": "Generic",
        "subject": "Choose the right collaboration tool for your group",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Generic",
        "subject": "Keep a project team in sync and on schedule",
        "rating": 5,
        "tool": "Project"
      },
      {
        "area": "Generic",
        "subject": "Keep a project team in sync and on schedule",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Generic",
        "subject": "Keep a project team in sync and on schedule",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Generic",
        "subject": "Get up to speed on a new client’s business landscape",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Generic",
        "subject": "Get up to speed on a new client’s business landscape",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Generic",
        "subject": "Get up to speed on a new client’s business landscape",
        "rating": 5,
        "tool": "Sway"
      },
      {
        "area": "Generic",
        "subject": "Get up to speed on a new client’s business landscape",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Generic",
        "subject": "Meet and collaborate with ease",
        "rating": 5,
        "tool": "OFFICE 365 BASICS"
      },
      {
        "area": "Generic",
        "subject": "Meet and collaborate with ease",
        "rating": 5,
        "tool": " SKYPE FOR BUSINESS"
      },
      {
        "area": "Generic",
        "subject": "Save and share files",
        "rating": 5,
        "tool": "Office 365 Basics"
      },
      {
        "area": "Generic",
        "subject": "Save and share files",
        "rating": 5,
        "tool": " OneDrive"
      },
      {
        "area": "Generic",
        "subject": "Make data-driven decisions",
        "rating": 5,
        "tool": "OFFICE 365 BASICS"
      },
      {
        "area": "Generic",
        "subject": "Make data-driven decisions",
        "rating": 5,
        "tool": " POWER BI"
      },
      {
        "area": "Generic",
        "subject": "Connect your organization",
        "rating": 5,
        "tool": "OFFICE 365 BASICS"
      },
      {
        "area": "Generic",
        "subject": "Connect your organization",
        "rating": 5,
        "tool": " YAMMER"
      },
      {
        "area": "Generic",
        "subject": "Create better work habits",
        "rating": 5,
        "tool": "MYANALYTICS"
      },
      {
        "area": "Generic",
        "subject": "Create better work habits",
        "rating": 5,
        "tool": " OFFICE 365 BASICS"
      },
      {
        "area": "Generic",
        "subject": "Discover relevant content and people",
        "rating": 5,
        "tool": "DELVE"
      },
      {
        "area": "Generic",
        "subject": "Discover relevant content and people",
        "rating": 5,
        "tool": " OFFICE 365 BASICS"
      },
      {
        "area": "Generic",
        "subject": "Work in email, solo or as a group",
        "rating": 5,
        "tool": "Office 365 Basics"
      },
      {
        "area": "Generic",
        "subject": "Work in email, solo or as a group",
        "rating": 5,
        "tool": " Outlook"
      },
      {
        "area": "Generic",
        "subject": "Create impactful content together",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Generic",
        "subject": "Create impactful content together",
        "rating": 5,
        "tool": " Office 365 Basics"
      },
      {
        "area": "Generic",
        "subject": "Stay up to date with work schedules and request time off",
        "rating": 5,
        "tool": "StaffHub"
      },
      {
        "area": "Generic",
        "subject": "Share best practices across the organization",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Generic",
        "subject": "Share best practices across the organization",
        "rating": 5,
        "tool": "StaffHub"
      },
      {
        "area": "Generic",
        "subject": "Share best practices across the organization",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Generic",
        "subject": "Prepare impactful client engagement proposals ",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Generic",
        "subject": "Prepare impactful client engagement proposals ",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Generic",
        "subject": "Prepare impactful client engagement proposals ",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Generic",
        "subject": "Prepare impactful client engagement proposals ",
        "rating": 5,
        "tool": "Sway"
      },
      {
        "area": "Generic",
        "subject": "Address client questions quickly and professionally",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Generic",
        "subject": "Address client questions quickly and professionally",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Generic",
        "subject": "Address client questions quickly and professionally",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Generic",
        "subject": "Address client questions quickly and professionally",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Generic",
        "subject": "Work seamlessly across organizational boundaries",
        "rating": 5,
        "tool": "Enterprise Mobility + Security"
      },
      {
        "area": "Generic",
        "subject": "Work seamlessly across organizational boundaries",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Generic",
        "subject": "Work seamlessly across organizational boundaries",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Generic",
        "subject": "Work seamlessly across organizational boundaries",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Generic",
        "subject": "Work seamlessly across organizational boundaries",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Generic",
        "subject": "Communicate with your team in real time to gain input and consensus",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Generic",
        "subject": "Communicate with your team in real time to gain input and consensus",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Generic",
        "subject": "Communicate with your team in real time to gain input and consensus",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Generic",
        "subject": "Communicate with your team in real time to gain input and consensus",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Generic",
        "subject": "Communicate with your team in real time to gain input and consensus",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Generic",
        "subject": "Maximize the impact of your firstline workforce",
        "rating": 5,
        "tool": "Flow"
      },
      {
        "area": "Generic",
        "subject": "Maximize the impact of your firstline workforce",
        "rating": 5,
        "tool": "Microsoft Teams"
      },
      {
        "area": "Generic",
        "subject": "Maximize the impact of your firstline workforce",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Generic",
        "subject": "Maximize the impact of your firstline workforce",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Generic",
        "subject": "Maximize the impact of your firstline workforce",
        "rating": 5,
        "tool": "PowerApps"
      },
      {
        "area": "Generic",
        "subject": "Maximize the impact of your firstline workforce",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Generic",
        "subject": "Maximize the impact of your firstline workforce",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Generic",
        "subject": "Maximize the impact of your firstline workforce",
        "rating": 5,
        "tool": "StaffHub"
      },
      {
        "area": "Generic",
        "subject": "Maximize the impact of your firstline workforce",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Generic",
        "subject": "Automate your business processes to increase efficiency",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Generic",
        "subject": "Automate your business processes to increase efficiency",
        "rating": 5,
        "tool": "Flow"
      },
      {
        "area": "Generic",
        "subject": "Automate your business processes to increase efficiency",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Generic",
        "subject": "Automate your business processes to increase efficiency",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Generic",
        "subject": "Automate your business processes to increase efficiency",
        "rating": 5,
        "tool": "PowerApps"
      },
      {
        "area": "Generic",
        "subject": "Automate your business processes to increase efficiency",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Generic",
        "subject": "Meet with coworkers and customers around the world",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Generic",
        "subject": "Meet with coworkers and customers around the world",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Generic",
        "subject": "Meet with coworkers and customers around the world",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Generic",
        "subject": "Work more securely from anywhere, on almost any device",
        "rating": 5,
        "tool": "Enterprise Mobility + Security"
      },
      {
        "area": "Generic",
        "subject": "Work more securely from anywhere, on almost any device",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Generic",
        "subject": "Work more securely from anywhere, on almost any device",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Generic",
        "subject": "Work more securely from anywhere, on almost any device",
        "rating": 5,
        "tool": "Windows 10"
      },
      {
        "area": "Generic",
        "subject": "Meet global compliance standards with controls and visibility",
        "rating": 5,
        "tool": "Enterprise Mobility + Security"
      },
      {
        "area": "Generic",
        "subject": "Meet global compliance standards with controls and visibility",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Generic",
        "subject": "Meet global compliance standards with controls and visibility",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Generic",
        "subject": "Meet global compliance standards with controls and visibility",
        "rating": 5,
        "tool": "Windows 10"
      },
      {
        "area": "Generic",
        "subject": "Detect, analyze, and protect against external security threats",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Generic",
        "subject": "Detect, analyze, and protect against external security threats",
        "rating": 5,
        "tool": "Windows 10"
      },
      {
        "area": "Generic",
        "subject": "Securely maintain mobile productivity",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Generic",
        "subject": "Securely maintain mobile productivity",
        "rating": 5,
        "tool": "Windows 10"
      },
      {
        "area": "Generic",
        "subject": "Tap the power of intelligent assistance to make your work shine",
        "rating": 5,
        "tool": "Flow"
      },
      {
        "area": "Generic",
        "subject": "Tap the power of intelligent assistance to make your work shine",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Generic",
        "subject": "Tap the power of intelligent assistance to make your work shine",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Generic",
        "subject": "Tap the power of intelligent assistance to make your work shine",
        "rating": 5,
        "tool": "PowerPoint"
      },
      {
        "area": "Generic",
        "subject": "Tap the power of intelligent assistance to make your work shine",
        "rating": 5,
        "tool": "Word"
      },
      {
        "area": "Generic",
        "subject": "Discover, analyze, and share data to support informed decisions",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Generic",
        "subject": "Discover, analyze, and share data to support informed decisions",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Generic",
        "subject": "Discover, analyze, and share data to support informed decisions",
        "rating": 5,
        "tool": "Power BI"
      },
      {
        "area": "Generic",
        "subject": "Protect your information and reduce risk of data loss",
        "rating": 5,
        "tool": "Enterprise Mobility + Security"
      },
      {
        "area": "Generic",
        "subject": "Protect your information and reduce risk of data loss",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Generic",
        "subject": "Protect your information and reduce risk of data loss",
        "rating": 5,
        "tool": "Windows 10"
      },
      {
        "area": "Generic",
        "subject": "Discover, share, and manage information across your organization",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Generic",
        "subject": "Discover, share, and manage information across your organization",
        "rating": 5,
        "tool": "Flow"
      },
      {
        "area": "Generic",
        "subject": "Discover, share, and manage information across your organization",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Generic",
        "subject": "Discover, share, and manage information across your organization",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Generic",
        "subject": "Discover, share, and manage information across your organization",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Generic",
        "subject": "Discover, share, and manage information across your organization",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Generic",
        "subject": "Engage and connect employees to shape company culture",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Generic",
        "subject": "Engage and connect employees to shape company culture",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Generic",
        "subject": "Engage and connect employees to shape company culture",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Generic",
        "subject": "Engage and connect employees to shape company culture",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Generic",
        "subject": "Engage and connect employees to shape company culture",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Generic",
        "subject": "Understand your work habits to improve your influence and impact",
        "rating": 5,
        "tool": "Delve"
      },
      {
        "area": "Generic",
        "subject": "Understand your work habits to improve your influence and impact",
        "rating": 5,
        "tool": "MyAnalytics"
      },
      {
        "area": "Generic",
        "subject": "Understand your work habits to improve your influence and impact",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Generic",
        "subject": "Collaborate on documents at the same time or on your own time",
        "rating": 5,
        "tool": "Enterprise Mobility + Security"
      },
      {
        "area": "Generic",
        "subject": "Collaborate on documents at the same time or on your own time",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Generic",
        "subject": "Collaborate on documents at the same time or on your own time",
        "rating": 5,
        "tool": "OneDrive"
      },
      {
        "area": "Generic",
        "subject": "Collaborate on documents at the same time or on your own time",
        "rating": 5,
        "tool": "OneNote"
      },
      {
        "area": "Generic",
        "subject": "Collaborate on documents at the same time or on your own time",
        "rating": 5,
        "tool": "Outlook"
      },
      {
        "area": "Generic",
        "subject": "Collaborate on documents at the same time or on your own time",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Generic",
        "subject": "Collaborate on documents at the same time or on your own time",
        "rating": 5,
        "tool": "Word"
      },
      {
        "area": "Generic",
        "subject": "Manage projects, tasks, and deadlines to meet your business goals",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Generic",
        "subject": "Manage projects, tasks, and deadlines to meet your business goals",
        "rating": 5,
        "tool": "Planner"
      },
      {
        "area": "Generic",
        "subject": "Manage projects, tasks, and deadlines to meet your business goals",
        "rating": 5,
        "tool": "Project"
      },
      {
        "area": "Generic",
        "subject": "Manage projects, tasks, and deadlines to meet your business goals",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Generic",
        "subject": "Create high-quality financial presentations",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Generic",
        "subject": "Create high-quality financial presentations",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Generic",
        "subject": "Create high-quality financial presentations",
        "rating": 5,
        "tool": "PowerPoint"
      },
      {
        "area": "Generic",
        "subject": "Create high-quality financial presentations",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Generic",
        "subject": "Create high-quality financial presentations",
        "rating": 5,
        "tool": "Sway"
      },
      {
        "area": "Generic",
        "subject": "Spend less time gathering and manipulating data",
        "rating": 5,
        "tool": "Excel"
      },
      {
        "area": "Generic",
        "subject": "Spend less time gathering and manipulating data",
        "rating": 5,
        "tool": "PowerApps"
      },
      {
        "area": "Generic",
        "subject": "Spend less time gathering and manipulating data",
        "rating": 5,
        "tool": "SharePoint"
      },
      {
        "area": "Generic",
        "subject": "Connect with transportation crew coworkers in real time",
        "rating": 5,
        "tool": "Office 365"
      },
      {
        "area": "Generic",
        "subject": "Connect with transportation crew coworkers in real time",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Generic",
        "subject": "Connect with transportation crew coworkers in real time",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Generic",
        "subject": "Broadcast company town halls to engage employees remotely",
        "rating": 5,
        "tool": "Skype for Business"
      },
      {
        "area": "Generic",
        "subject": "Broadcast company town halls to engage employees remotely",
        "rating": 5,
        "tool": "StaffHub"
      },
      {
        "area": "Generic",
        "subject": "Broadcast company town halls to engage employees remotely",
        "rating": 5,
        "tool": "Yammer"
      },
      {
        "area": "Generic",
        "subject": "Stay organized, productive, and safe while on the internet",
        "rating": 5,
        "tool": "Windows 10"
      },
      {
        "area": "Generic",
        "subject": "Stay ahead of the game with a personal digital assistant",
        "rating": 5,
        "tool": "Windows 10"
      },
      {
        "area": "Generic",
        "subject": "Keep devices always up to date",
        "rating": 5,
        "tool": "Windows 10"
      },
      {
        "area": "Generic",
        "subject": "Get actionable insights about upgrade readiness",
        "rating": 5,
        "tool": "Windows 10"
      },
      {
        "area": "Generic",
        "subject": "Quickly and easily transform new devices",
        "rating": 5,
        "tool": "Windows 10"
      },
      {
        "area": "Generic",
        "subject": "Easily and securely manage devices",
        "rating": 5,
        "tool": "Windows 10"
      },
      {
        "area": "Generic",
        "subject": "Fuel your creativity with powerful devices and apps",
        "rating": 5,
        "tool": "Windows 10"
      },
      {
        "area": "Generic",
        "subject": "Use your device like a PC to stay productive and secure",
        "rating": 5,
        "tool": "Windows 10"
      }
    ]
      
      
      
    
}