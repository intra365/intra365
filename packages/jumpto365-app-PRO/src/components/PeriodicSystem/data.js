export default {
    rows: [
        {   key : 1,
            left: {},
            right: {
                title: "Presentations",
                color: "#BBBBE6"
            },
            connectors: [
                { class: "connect-presentation" },
                { class: "connect-presentation-down" }
            ],

            columns: [
                // row 1

                {
                    type: "service",
                    title: "Dynamics 365",
                    about: "CRM&ERP",
                    icon: "DynamicsCRMLogo",
                    color: "#15224E"
                },
                { type: "service hidde" },
                { type: "service  hidde" },
                { type: "lefter  hidde" },
                { type: "service  hidde" },
                { type: "service  hidde" },
                { type: "service  hidde" },
                {
                    type: "service",
                    title: "Sway",
                    about: "Next-gen presentation",
                    icon: "SwayLogo",
                    color: "#008272"
                }
            ]
        },
        {key : 2,
            left: { title: "Enterprise video", color: "#A6E1F4" },
            right: {
                title: "Office Online",
                color: "#B8E7F6"
            },
            connectors: [
                {
                    class: "connect-enterprise-video"
                },
                { class: "connect-office-online" },
                { class: "connect-employee-profile-down" }
            ],
            columns: [
                // row 2

                {
                    type: "service",
                    title: "Stream",
                    about: "Video portal [YouTub]e",
                    icon: "VideoSolid",
                    color: "#C30052",
                    id: "stream"
                },
                {
                    type: "service",
                    title: "Video",
                    about: "Video portal [YouTub]e",
                    icon: "OfficeVideoLogo",
                    color: "#0078D7 "
                },
                {
                    type: "buttom ",
                    subtitle: "Employee profile",
                    subtitleclass: "subbottom ms-font-mi  ms-fontWeight-light",
                    color: "#BBBBE6"
                },
                { type: "lefter  hidde" },
                {
                    type: "service",
                    title: "Word Online",
                    about: "Word processing in the browser",
                    icon: "WordLogo",
                    color: "#2B579A "
                },
                {
                    type: "service",
                    title: "Excel Online",
                    about: "Spreadsheets in the browser",
                    icon: "ExcelLogo",
                    color: "#02723B "
                },
                {
                    type: "service",
                    title: "OneNote Online",
                    about: "Note taking in the browser [Evernote]",
                    icon: "OneNoteLogo",
                    color: "#80397B "
                },
                {
                    type: "service",
                    title: "PowerPoint Online",
                    about: "Presentations in the browser",
                    icon: "PowerPointLogo",
                    color: "#D24726 "
                }
            ]
        },
        {key : 3,
            left: { title: "File Storage & Collaboration", color: "#B3E6A9" },
            right: {
                title: "Business application platform",
                color: "#B3E6A9"
            },
            connectors: [
                {
                    class: "connect-filestorage"
                },
                { class: "connect-forms" },
                { class: "connect-business-apps" },
                { class: "connect-employee-profile-down" }
            ],

            columns: [
                // row 3

                {
                    type: "service",
                    title: "SharePoint Online",
                    about: "Team file sharing & storage",
                    icon: "SharepointLogo",
                    color: "#0078D7",
                    info: [
                        {title:"icansharepoint wiki",url:"http://icansharepoint.com/wiki/SharePoint_Online"}
                    ],
                    serviceurl:"http://icansharepoint.com/wiki/SharePoint_Online"
                },
                {
                    type: "service",
                    title: "OneDrive for Business ",
                    about: "Personal file storage [Dropbox]",
                    icon: "OneDrive",
                    color: "#0078D7 "
                },
                {
                    type: "service",
                    title: "Delve",
                    about: "Employee profile & content discovery",
                    icon: "DelveLogo",
                    color: "#0078D7 "
                },
                {
                    type: "lefter  ",
                    subtitle: "Forms",
                    subtitleclass: "sub270 ms-font-xs",
                    color: "#BBBBE6"
                },
                {
                    type: "service",
                    title: "Forms",
                    subtitle: "Preview",
                    subtitleclass: "ms-font-mi  subtitle ms-fontWeight-light",
                    about: "Code-free forms",
                    icon: "OfficeFormLogo",
                    color: "#008271 "
                },
                {
                    type: "service",
                    title: "PowerApps",
                    about: "Code-free mobile apps (& forms)",
                    icon: "PowerApps",
                    color: "#742774 "
                },
                {
                    type: "service",
                    title: "Flow",
                    about: "Code-free workflows [IFTTT]",
                    icon: "Flow",
                    color: "#0077FF "
                },
                {
                    type: "service",
                    title: "Power BI",
                    about: "Business analytics & dashboard",
                    icon: "PowerBILogo",
                    color: "#F2C811 "
                }
            ]
        },
        {key : 4,
            left: { type: "lefter ", title: "Outlook", color: "#A6E1F4" },
            right: {
                type: "righter",
                title: "Project Management",
                color: "#BBBBE6"
            },
            connectors: [
                {
                    class: "connect-outlook"
                },
                { class: "connect-task-management" },
                { class: "connect-project-management" },
                { class: "connect-direct-communication-1" }
            ],


            columns: [
                // row 4

                {
                    type: "service",
                    title: "Mail",
                    about: "Outlook email",
                    icon: "OutlookLogo",
                    color: "#0078D7"
                },
                {
                    type: "service",
                    title: "Calendar ",
                    about: "Outlook calendar",
                    icon: "Calendar",
                    color: "#0078D7 "
                },
                {
                    type: "service",
                    title: "People",
                    about: "Outlook contact list",
                    icon: "People",
                    color: "#0078D7 "
                },
                {
                    type: "service",
                    title: "Tasks",
                    about: "Outlook tasks",
                    icon: "CheckMark",
                    color: "#0078D7  "
                },
                {
                    type: "lefter ",
                    subtitle: "Task Management",
                    subtitleclass: "sub90 ms-font-mi ms-fontWeight-light",

                    color: "#B3E6A9"
                },
                {
                    type: "service",
                    title: "To-Do",
                    subtitle: "Preview",
                    subtitleclass: "ms-font-mi  subtitle ms-fontWeight-light",
                    about: "To-do list for life & work [Wunderlist]",
                    icon: "CheckMark",
                    color: "#3896F9 "
                },
                {
                    type: "service",
                    title: "Planner",
                    about: "Everyday project management [Trello]",
                    icon: "Planner",
                    color: "#3C853C"
                },
                {
                    type: "service",
                    title: "Project Online",
                    about: "Premium project management",
                    icon: "ProjectLogo",
                    color: "#3C853C  "
                }
            ]
        },
        {key : 5,
            left: { type: "lefter ", title: "Chat & conferences", color: "#BBBBE6" },
            right: {
                type: "righter",
                title: "Small Business Applications",
                color: "#B3E6A9"
            },
            connectors: [
                {
                    class: "connect-chat"
                },
                { class: "connect-social-network" },
                { class: "connect-small-business" },
                { class: "connect-direct-communication-2" }
            ],
            columns: [
                // row 5

                {
                    type: "service",
                    title: "Skype for Business",
                    about: "Instant messaging & video chat ",
                    icon: "SkypeLogo",
                    color: "#00AFF0"
                },
                {
                    type: "service",
                    title: "Teams ",
                    about: "Group chat & video chat [Slack]",
                    icon: "TeamsLogo",
                    color: "#3F418E "
                },
                {
                    type: "service",
                    title: "Newsfeed",
                    about: "SharePoint's (lite) social network",
                    icon: "News",
                    color: "#0078D7 "
                },
                {
                    type: "service",
                    title: "Yammer",
                    about: "Social network",
                    icon: "YammerLogo",
                    color: "#0078D7  "
                },
                {
                    type: "lefter ",
                    subtitle: "Social networking",
                    ubtitle: "Employee profile",
                    subtitleclass: "sub90 ms-font-mi ms-fontWeight-light",

                    color: "#A6E1F4"
                },
                {
                    type: "service",
                    title: "Visio Online",
                    about: "Diagramming in the browswer",
                    icon: "VisioLogo",
                    color: "#4568C4 "
                },
                {
                    type: "service",
                    title: "Bookings",
                    about: "Customer self-reservations",
                    icon: "BookingsLogo",
                    color: "#25ABB2"
                },
                {
                    type: "service",
                    title: "StaffHub",
                    about: "Frontline employee hub & scheduler",
                    icon: "MicrosoftStaffhubLogo",
                    color: "#25ABB2 "
                }
            ]
        }
    ]
}