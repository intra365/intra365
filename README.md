# intra365

```s
npx intra365 myservices
```

```
@intra365/
  client/
  server/
  office-graph
```


```javascript
var intra365 = require("@intra365/server")
var graph = require("@intra365/office-graph")

// Get all sites matching search term for the current signed in user
intra365.api.get("/mysites/{search}",async context=>{
    return graph.me.get(`/sites?search=${context.params.search}`)
})

// Get all sites matching search term in the tenant
intra365.api.get("/allsites/{search}",async context=>{
    return graph.app.get(`/sites?search=${context.params.search}`)
})

intra365.run()

```
This is what you store 
```json
{   
"intra365":{
    "endpoint":"{HOST}/allsites",
    "parameters" : {
        "search":"contoso"
    }
},    
"result":{
    "definitions": {},
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "http://example.com/root.json",
    "type": "object",
    "title": "The Root Schema",
    "required": [
        "@odata.context",
        "value"
    ],
    "properties": {
        "@odata.context": {
        "$id": "#/properties/@odata.context",
        "type": "string",
        "title": "The @odata.context Schema",
        "default": "",
        "examples": [
            "https://graph.microsoft.com/v1.0/$metadata#sites"
        ],
        "pattern": "^(.*)$"
        },
        "value": {
        "$id": "#/properties/value",
        "type": "array",
        "title": "The Value Schema",
        "items": {
            "$id": "#/properties/value/items",
            "type": "object",
            "title": "The Items Schema",
            "required": [
            "createdDateTime",
            "id",
            "lastModifiedDateTime",
            "name",
            "webUrl",
            "displayName",
            "root",
            "siteCollection"
            ],
            "properties": {
            "createdDateTime": {
                "$id": "#/properties/value/items/properties/createdDateTime",
                "type": "string",
                "title": "The Createddatetime Schema",
                "default": "",
                "examples": [
                "2017-07-29T03:41:50Z"
                ],
                "pattern": "^(.*)$"
            },
            "id": {
                "$id": "#/properties/value/items/properties/id",
                "type": "string",
                "title": "The Id Schema",
                "default": "",
                "examples": [
                "m365x214355.sharepoint.com,0c63df44-cb49-4566-9d0b-a3faf69ff6bc,21651a88-e8f5-43c2-b535-019f767354e9"
                ],
                "pattern": "^(.*)$"
            },
            "lastModifiedDateTime": {
                "$id": "#/properties/value/items/properties/lastModifiedDateTime",
                "type": "string",
                "title": "The Lastmodifieddatetime Schema",
                "default": "",
                "examples": [
                "0001-01-01T08:00:00Z"
                ],
                "pattern": "^(.*)$"
            },
            "name": {
                "$id": "#/properties/value/items/properties/name",
                "type": "string",
                "title": "The Name Schema",
                "default": "",
                "examples": [
                "Contoso-Clothing-Marketing"
                ],
                "pattern": "^(.*)$"
            },
            "webUrl": {
                "$id": "#/properties/value/items/properties/webUrl",
                "type": "string",
                "title": "The Weburl Schema",
                "default": "",
                "examples": [
                "https://m365x214355.sharepoint.com/portals/Contoso-Clothing-Marketing"
                ],
                "pattern": "^(.*)$"
            },
            "displayName": {
                "$id": "#/properties/value/items/properties/displayName",
                "type": "string",
                "title": "The Displayname Schema",
                "default": "",
                "examples": [
                "Contoso Clothing Marketing"
                ],
                "pattern": "^(.*)$"
            },
            "root": {
                "$id": "#/properties/value/items/properties/root",
                "type": "object",
                "title": "The Root Schema"
            },
            "siteCollection": {
                "$id": "#/properties/value/items/properties/siteCollection",
                "type": "object",
                "title": "The Sitecollection Schema",
                "required": [
                "hostname"
                ],
                "properties": {
                "hostname": {
                    "$id": "#/properties/value/items/properties/siteCollection/properties/hostname",
                    "type": "string",
                    "title": "The Hostname Schema",
                    "default": "",
                    "examples": [
                    "m365x214355.sharepoint.com"
                    ],
                    "pattern": "^(.*)$"
                }
                }
            }
            }
        }
        }
    }
    }
}

```

