var toolbarActionType = {
    Header: "header",
    Link: "link",
    Table: "table",
    Dropdown: "dropdown",
    Reference: "reference"
  };
  
  Object.seal(toolbarActionType);
  
  var toolbars = [
    { title: "Root", toolbar: toolbar },
    { title: "Office 365", toolbar: toolbarOffice365 }
  ];
  
  var toolbar = {
    version: 1,
    title: "",
    source: "",
    items: [
      {
        title: "Insights",
        icon: "",
        iconOnly: false,
        type: toolbarActionType.Header,
        subActions: [
          {
            title: "Office 365 - Multiple languages ",
            icon: "",
            iconOnly: false,
            properties: { reference: "toolbarOffice365",href="https://blob.jumpto365.com/toolbars/global" },
            type: toolbarActionType.Reference
          },
          {
              title: "Table of Microsoft Security and Compliance",
              icon: "",
              iconOnly: false,
              properties: { reference: "ems",href="https://blob.jumpto365.com/table/global" },
              type: toolbarActionType.Table,
            },
    
        ]
      },
      {
        title: "Communicate",
        icon: "",
        iconOnly: false,
        type: toolbarActionType.Link
      },
      {
          title: "Find Documentation",
          icon: "",
          iconOnly: false,
          type: toolbarActionType.Link
        }
        ,
      {
          title: "Share Documentation",
          icon: "",
          iconOnly: false,
          type: toolbarActionType.Link
        },
        ,
      {
          title: "Plan",
          icon: "",
          iconOnly: false,
          type: toolbarActionType.Link
        }
    ],
  overflowItems : [],
    farItems :[{
      title: "Groups",
      icon: "",
      iconOnly: true,
      properties: { source: "graph",
      href="https://https://graph.microsoft.com/beta/me/joinedTeamsblob.jumpto365.com/table/global",
      iterate="value",
      id="id",text="displayName" },
      type: toolbarActionType.Dropdown
    },{
      title: "Get Access",
      icon: "",
      iconOnly: false,
      type: toolbarActionType.Link
    }]
  
  };
  
  var toolbarOffice365 = {
    version: 1,
    title: "",
    source: "",
    actions: [
      {
        title: "Office 365",
        icon: "",
        iconOnly: false,
        type: toolbarActionType.Header,
        subActions: [
          {
            title: "Office 365 - English",
            icon: "",
            iconOnly: false,
            properties: { tenant: "global", table: "pto365-en" },
            type: toolbarActionType.table
          }
        ]
      }
    ]
  };
  