---
id: configuration
title: Configuration "Intra365"
---

### Global Configuration

A reference to your configuration file is bundled into the integration component our your choice.  No requirements to jumpto365 server side components / API is used in day to day operations of the integrations, as everything is served through our CDN - currently delivered through CloudFlare's global network of edge server and backed by Microsoft Azure storages. 

```json
{
    // Default navigation is no match is made to the current subpath 
  "navigation": "https://blob.jumpto365.com/toolbars/j/u/m/jumpto365.com/jumpto365 free version.json",

  // User for controlling individual navigation based on site paths
  "rules": [
    
    {
        // https://tenant.sharepoint.com/sites/templates/info  will match this on the path. But as the rules are sorted inreverse order based ont the length of the path, the 3rd rule will win,
      "path": "/sites",
      "navigation": "https://blob.jumpto365.com/toolbars/j/u/m/jumpto365.com/Root.json"
    },
    {
      "path": "/teams",
      "navigation": "https://blob.jumpto365.com/toolbars/j/u/m/jumpto365.com/Root.json"
    },
    {
    // https://tenant.sharepoint.com/sites/templates/info will match this and be the winner
      "path":"/sites/templates",
      "navigation": "https://blob.jumpto365.com/toolbars/j/u/m/jumpto365.com/jumpto365 free version.json"
    }

   
  ]
}

```
