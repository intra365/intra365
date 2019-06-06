---
id: configuration
title: Configuratoin "Intra365"
---

Configuration assets is shared on blob store in Microsoft azure.

## Discovery

### SharePoint Online Configurations

Your SharePoint Online hostname is used for looking up configuration assets.

The file is structured according to the following sample



```json
{
    // Default navigation is no match is made to the current subpath 
  "navigation": "https://blob.jumpto365.com/toolbars/j/u/m/jumpto365.com/jumpto365 free version.json",

  // User for controlling individual navigation based on site paths
  "rules": [
    
    {
        // https://tetant.sharepoint.com/sites/templates/info  will match this on the path. But as the rules are sorted inreverse order based ont the length of the path, the 3rd rule will win,
      "path": "/sites",
      "navigation": "https://blob.jumpto365.com/toolbars/j/u/m/jumpto365.com/Root.json"
    },
    {
      "path": "/teams",
      "navigation": "https://blob.jumpto365.com/toolbars/j/u/m/jumpto365.com/Root.json"
    },
    {
    // https://tetant.sharepoint.com/sites/templates/info will match this and be the winner
      "path":"/sites/templates",
      "navigation": "https://blob.jumpto365.com/toolbars/j/u/m/jumpto365.com/jumpto365 free version.json"
    }

   
  ]
}

```
