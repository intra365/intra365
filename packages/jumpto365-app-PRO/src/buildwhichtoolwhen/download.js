/*

https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-v2-protocols-oauth-client-creds

https://graph.microsoft.com/v1.0/me/drive/root

{
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users('58d02ee5-af80-4f81-b144-1734b77c02c9')/drive/root/$entity",
    "createdDateTime": "2016-12-15T22:53:13Z",
    "id": "01QDKNWQ56Y2GOVW7725BZO354PWSELRRZ",
    "lastModifiedDateTime": "2018-04-23T07:55:29Z",
    "name": "root",
    "webUrl": "https://365adm-my.sharepoint.com/personal/niels_hexatown_com/Documents",
    "size": 5419674,
    "parentReference": {
        "driveId": "b!ldyjoeqTcE6DRyJbRBeRxw1ja56gK4VHpyiU93l7bsOd0kATIX32T6wjhiBXsjW9",
        "driveType": "business"
    },
    "fileSystemInfo": {
        "createdDateTime": "2016-12-15T22:53:13Z",
        "lastModifiedDateTime": "2018-04-23T07:55:29Z"
    },
    "folder": {
        "childCount": 10
    },
    "root": {}
}

parentReference.driveId


 https://graph.microsoft.com/v1.0/drives/b!ldyjoeqTcE6DRyJbRBeRxw1ja56gK4VHpyiU93l7bsOd0kATIX32T6wjhiBXsjW9/root:/jumpto365:/children

{
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#drives('b%21ldyjoeqTcE6DRyJbRBeRxw1ja56gK4VHpyiU93l7bsOd0kATIX32T6wjhiBXsjW9')/root/children",
    "value": [
        {
            "@microsoft.graph.downloadUrl": "https://365adm-my.sharepoint.com/personal/niels_hexatown_com/_layouts/15/download.aspx?UniqueId=98100762-97fd-43cf-8f17-3f986ddc98b6&Translate=false&tempauth=eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvMzY1YWRtLW15LnNoYXJlcG9pbnQuY29tQGRmOTZiOGM5LTUxYTEtNDBjZi1iOGIxLTQ1MTRiZThlOTY2OCIsImlzcyI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMCIsIm5iZiI6IjE1MjQ0ODEzMTYiLCJleHAiOiIxNTI0NDg0OTE2IiwiZW5kcG9pbnR1cmwiOiI1cWJjSHJ5QUNLUmRla2M3a1pZWjNwdDhOLzFzdFpvUmZCWFFrd2s0V3dvPSIsImVuZHBvaW50dXJsTGVuZ3RoIjoiMTQ4IiwiaXNsb29wYmFjayI6IlRydWUiLCJjaWQiOiJPRGt5WkdOa05qY3RNR1F5TlMwME0yWmtMVGsxTURVdFptWXpPREkwWWpjM01HWmkiLCJ2ZXIiOiJoYXNoZWRwcm9vZnRva2VuIiwic2l0ZWlkIjoiWVRGaE0yUmpPVFV0T1RObFlTMDBaVGN3TFRnek5EY3RNakkxWWpRME1UYzVNV00zIiwiYXBwX2Rpc3BsYXluYW1lIjoiR3JhcGggZXhwbG9yZXIiLCJzaWduaW5fc3RhdGUiOiJbXCJrbXNpXCJdIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJ0aWQiOiJkZjk2YjhjOS01MWExLTQwY2YtYjhiMS00NTE0YmU4ZTk2NjgiLCJ1cG4iOiJuaWVsc0BoZXhhdG93bi5jb20iLCJwdWlkIjoiMTAwM0JGRkQ5Q0VCNzY2NSIsInNjcCI6Im15ZmlsZXMud3JpdGUgYWxsZmlsZXMud3JpdGUgYWxsc2l0ZXMud3JpdGUgYWxscHJvZmlsZXMucmVhZCIsInR0IjoiMiIsInVzZVBlcnNpc3RlbnRDb29raWUiOm51bGx9.bytkZHFlS2JhMERyR0NxdjBSejJVd0srUWdJTWU2YXFIU3Q3b0MzU1Mxbz0&ApiVersion=2.0",
            "createdDateTime": "2018-04-23T07:53:53Z",
            "eTag": "\"{98100762-97FD-43CF-8F17-3F986DDC98B6},2\"",
            "id": "01QDKNWQ3CA4IJR7MXZ5BY6FZ7TBW5ZGFW",
            "lastModifiedDateTime": "2018-04-21T12:36:21Z",
            "name": "samaqua.xlsx",
            "webUrl": "https://365adm-my.sharepoint.com/personal/niels_hexatown_com/_layouts/WopiFrame.aspx?sourcedoc=%7B98100762-97FD-43CF-8F17-3F986DDC98B6%7D&file=samaqua.xlsx&action=default",
            "cTag": "\"c:{98100762-97FD-43CF-8F17-3F986DDC98B6},2\"",
            "size": 374658,
            "createdBy": {
                "user": {
                    "email": "niels@hexatown.com",
                    "id": "58d02ee5-af80-4f81-b144-1734b77c02c9",
                    "displayName": "Niels Gregers Johansen"
                }
            },
            "lastModifiedBy": {
                "user": {
                    "email": "niels@hexatown.com",
                    "id": "58d02ee5-af80-4f81-b144-1734b77c02c9",
                    "displayName": "Niels Gregers Johansen"
                }
            },
            "parentReference": {
                "driveId": "b!ldyjoeqTcE6DRyJbRBeRxw1ja56gK4VHpyiU93l7bsOd0kATIX32T6wjhiBXsjW9",
                "driveType": "business",
                "id": "01QDKNWQ5LMF5ILSGNSZF3OXFIOQGS6XDZ",
                "path": "/drives/b!ldyjoeqTcE6DRyJbRBeRxw1ja56gK4VHpyiU93l7bsOd0kATIX32T6wjhiBXsjW9/root:/jumpto365"
            },
            "file": {
                "mimeType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "hashes": {
                    "quickXorHash": "3TD6Ww1nDw7J7MlmH+7ElR0bpfQ="
                }
            },
            "fileSystemInfo": {
                "createdDateTime": "2018-04-23T07:53:53Z",
                "lastModifiedDateTime": "2018-04-21T12:36:21Z"
            },
            "shared": {
                "scope": "users"
            }
        }
    ]
}
 */