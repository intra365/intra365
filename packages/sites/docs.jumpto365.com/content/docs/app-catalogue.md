---
id: app-catalogue
title: Manage the App in SharePoint
audience: SharePoint Admin
permalink: docs/app-catalogue.html
---

This guide walks you through installing an extention in SharePoint Online.

### Prereqs
- SharePoint administrator in the tenant where you like to get the SharePoint App (Add-In) implemented. 
- Have the [app].SPPKG file to be installed

## SharePoint admin center {#adm-center}

Navigate to your SharePoint admin center - either  located in the "Classic SharePoint admin center" 

```text
https://[yourtenant]-admin.sharepoint.com/_layouts/15/online/tenantadminapps.aspx
```

![image-20190608105904480](assets/image-20190608105904480.png)

Or in "Classic features"

![image-20190612130234344](assets/image-20190612130234344.png)

### App Catalog {#app-catalog}

If you haven't configured an App Catalog yet, check out this video to see how https://www.youtube.com/watch?v=xEc8X7VVtc8

Click on (1)

![image-20190608110818312](assets/image-20190608110818312.png)

Click Upload

![image-20190608111234145](assets/image-20190608111234145.png)

Upload the  [app].SPPKG file

![image-20190608122527986](assets/image-20190608122527986.png)

If the option dialog do not appear, then select "Deploy" in the Ribbon

![image-20190608122737809](assets/image-20190608122737809.png)

![image-20190608122859756](assets/image-20190608122859756.png)

When the file has been uploaded, SharePoint will give you the option to "Make this solution available to all sites in the organization" or not. 

Disregard the following statement as the Toolbar is an extension. not a web part. 

> If you clear this setting, users won't be able to add the web part to pages. The web part will continue to work if it was already added to pages.

Instead, read more about   [Tenant-scoped solution deployment for SharePoint Framework solutions](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/tenant-scoped-deployment)

![image-20190608123033464](assets/image-20190608123033464.png)

### Check deployment status {#deployment-status}

If you did select "Make this solution available to all sites in the organization" the extention will be available to all site collections in your tenant and the value in column "Tenant Deployed" will be Yes

![image-20190608124041927](assets/image-20190608124041927.png)

If you have just created the app catalog, you might see that the deployment failed. Check this to learn what to do https://support.shortpoint.com/support/solutions/articles/1000269130-known-issue-shortpoint-spfx-app-deployment-error-deployment-failed-correlation-id-guid-

## Install app in a specific site collection {#site-install}

If you did not select "Make this solution available to all sites in the organization" when you deployed the extention, you need to install the "App" individually on each site collection

Click the Cog then "Add an app" 

![image-20190608124620606](assets/image-20190608124620606.png)

Select "From Your Organisation"

![image-20190608124732839](assets/image-20190608124732839.png)

Wait a few seconds

![image-20190608124848403](assets/image-20190608124848403.png)

Refresh the page and verify the "GlobalToolbar" is no longer greyed out

## Remove app in a specific site collection {#app-remove}
Navigate to site content and local the "GlobalToolbar"

![image-20190608124942900](assets/image-20190608124942900.png)

Click on the menu 

![image-20190608125143183](assets/image-20190608125143183.png)

Select "Remove"

![image-20190608125213880](assets/image-20190608125213880.png)

Accept that Microsoft might not have integrated this function in Modern, so click "Return to classic SharePoint". Note that this doesn't convert the current site to Classic.

![image-20190608125612152](assets/image-20190608125612152.png)

Select "Remove"

![image-20190608125701890](assets/image-20190608125701890.png)

And finally OK

![image-20190608125735031](assets/image-20190608125735031.png)