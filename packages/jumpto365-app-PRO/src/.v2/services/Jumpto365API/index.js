var axios = require("axios");
var AzureBlob = require("@azure/storage-blob");
var moment = require("moment");
var axios = require("axios");
var json = require("format-json");
var _ = require("lodash")
var HOST = "https://api.jumpto365.com";
if (localStorage.getItem("APIHOST")) {
  HOST = localStorage.getItem("APIHOST");
}

export function apiHostSet(url) {
  localStorage.setItem("APIHOST", url);
  HOST = url;
}

export function apiHostGet() {
  return HOST;
}
export function apiHostGetLessProtocol() {
  return HOST.split("//")[1];
}

export function apiVersion() {
  return new Promise((resolve, reject) => {
    authGet(`${HOST}/`)
      .then(r => resolve(r.data))
      .catch(e => reject(e));
  });
}

export function getUserDraftContext(upn, area) {
  return Get(`${HOST}/v1.0/user/${upn}/items/tables/mytables/TableKey/${area}`); // get a token for creating stuff
}

export function getDomainPublicContext(domain, area, language) {
  return Get(`${HOST}/table/${domain}/${area}/${language}`); // get a token for creating stuff
}

/**
 * Directory Save
 * @param {*} path - Sample :
 * @param {*} filename
 */
export function directorySave(
  provider,
  store,
  path,
  domain,
  blob,
  payload,
  title
) {
  return new Promise((resolve, reject) => {
    authGet(`${HOST}/v1.0/blob/sas/${provider}/${store}/${path}/c`) // get a token for creating stuff
      .then(async r => {
        var sasURL = r.data;
        uploadBatch(sasURL, domain, blob, payload)
          .then(blobReference => {
            // debugger
            authPost(`${HOST}/v1.0/import`, {
              type: "article",
              id: blobReference.requestId,
              sasURL,
              domain,
              blob,
              title
            })
              .then(batch => {
                resolve(r);
              })
              .catch(e => reject(e.message));
          })
          .catch(e => {
            reject(e.message);
          });
      })
      .catch(e => {
        
        reject(e.message);
      });
  });
}
/**
 * Directory Save
 * @param {*} path - Sample :
 * @param {*} filename
 */
export function blobSave(
  provider,
  store,
  path,
  domain,

  name,
  payload,
  flag
  
) {
  return new Promise((resolve, reject) => {
    authGet(`${HOST}/v1.0/blob/sas/${provider}/${store}/${path}/${flag?flag:"c"}`) // get a token for creating stuff
      .then(async r => {
        
        var sasURL = r.data;
        
        uploadBlob(sasURL, domain, name, payload)
              
              .then(blobReference => {
                
                 var url = unescape(blobReference.url).split("?")[0]
                 url = url.replace("jumpto36500001.blob.core.windows.net","blob.jumpto365.com")
                resolve(url);
              })
              
          .catch(e => {
            reject(e.message);
          });
      })
      .catch(e => {
        
        reject(e.message);
      });
  });
}
export function blobSaveFile(
  provider,
  store,
  path,
  domain,

  name,
  file
  
) {
  return new Promise((resolve, reject) => {
    authGet(`${HOST}/v1.0/blob/sas/${provider}/${store}/${path}/c`) // get a token for creating stuff
      .then(async r => {
        
        var sasURL = r.data;
        
        uploadBrowserFile(sasURL, domain, name, file)
              
              .then(blobReference => {
                
                 var url = unescape(blobReference.url).split("?")[0]
                 url = url.replace("jumpto36500001.blob.core.windows.net","blob.jumpto365.com")
                resolve(url);
              })
              
          .catch(e => {
            reject(e.message);
          });
      })
      .catch(e => {
        
        reject(e.message);
      });
  });
}
export function uploadBlob(sasURL, path, blobName, payload) {
  return new Promise(async (resolve, reject) => {
    const anonymousCredential = new AzureBlob.AnonymousCredential();
    const pipeline = AzureBlob.StorageURL.newPipeline(anonymousCredential);
    const serviceURL = new AzureBlob.ServiceURL(sasURL, pipeline);
    const containerURL = AzureBlob.ContainerURL.fromServiceURL(
      serviceURL,
      path
    );
   
    var content = payload

   

    const blobURL = AzureBlob.BlobURL.fromContainerURL(containerURL, blobName);
    const blockBlobURL = AzureBlob.BlockBlobURL.fromBlobURL(blobURL);
    blockBlobURL
      .upload(AzureBlob.Aborter.none, content, content.length)
      .then(r =>
        resolve({
          url: blobURL.url,
          eTag: r.eTag,
          contentMD5: r.contentMD5,
          data: r.date,
          requestId: r.requestId
        })
      )
      .catch(e => reject(e));
  });
}

export function uploadBrowserFile(sasURL, path, blobName, file) {
  return new Promise(async (resolve, reject) => {
    const anonymousCredential = new AzureBlob.AnonymousCredential();
    const pipeline = AzureBlob.StorageURL.newPipeline(anonymousCredential);
    const serviceURL = new AzureBlob.ServiceURL(sasURL, pipeline);
    const containerURL = AzureBlob.ContainerURL.fromServiceURL(
      serviceURL,
      path
    );
   


    var customBlockSize = file.size > 1024 * 1024 * 32 ? 1024 * 1024 * 4 : 1024 * 512;
 

    const blobURL = AzureBlob.BlobURL.fromContainerURL(containerURL, blobName);
    const blockBlobURL = AzureBlob.BlockBlobURL.fromBlobURL(blobURL);
    
    blockBlobURL.upload(AzureBlob.Aborter.none, file, file.size,{ blockSize: customBlockSize })
      .then(r =>{
        
        resolve({
          url: blobURL.url,
          eTag: r.eTag,
          contentMD5: r.contentMD5,
          data: r.date,
          requestId: r.requestId
        })
}      )
      .catch(e => {
        
        reject(e)
      });
  });
}
export function uploadBatch(sasURL, path, blobName, payload) {
  return new Promise(async (resolve, reject) => {
    const anonymousCredential = new AzureBlob.AnonymousCredential();
    const pipeline = AzureBlob.StorageURL.newPipeline(anonymousCredential);
    const serviceURL = new AzureBlob.ServiceURL(sasURL, pipeline);
    const containerURL = AzureBlob.ContainerURL.fromServiceURL(
      serviceURL,
      path
    );
    try {
      var text = encodeURIComponent(JSON.stringify(payload));
      var content = window.btoa(text);
    } catch (error) {
      return reject("Error encoding content");
    }

    const blobURL = AzureBlob.BlobURL.fromContainerURL(containerURL, blobName);
    const blockBlobURL = AzureBlob.BlockBlobURL.fromBlobURL(blobURL);
    blockBlobURL
      .upload(AzureBlob.Aborter.none, content, content.length)
      .then(r =>
        resolve({
          url: blobURL.url,
          eTag: r.eTag,
          contentMD5: r.contentMD5,
          data: r.date,
          requestId: r.requestId
        })
      )
      .catch(e => reject(e));
  });
}
//uploadBatch("","")

/**
 * File Save
 * @param {*} path - Sample :
 * @param {*} filename
 */
export function fileSave(provider, store, path, filename, payload) {
  return new Promise((resolve, reject) => {
    authPost(
      `${HOST}/v1.0/files/${provider}/${store}/${path}/${filename}`,
      payload
    )
      .then(r => resolve(r.data))
      .catch(e => reject(e.message));
  });
}
export function RestPost(url, payload) {
  return new Promise((resolve, reject) => {
    authPost(url, payload)
      .then(r => resolve(r.data))
      .catch(e => reject(e.message));
  });
}
export function RestGet(url) {
  return new Promise((resolve, reject) => {
    authGet(url)
      .then(r => resolve(r.data))
      .catch(e => reject(e));
  });
}

export function fileGet(provider, store, path, filename) {
  return RestGet(`${HOST}/v1.0/files/${provider}/${store}/${path}/${filename}`);
}
export function articlesAreas(area) {
  return RestGet(`${HOST}/v1.0/articles/areas${area ? "/" + area : ""}`);
}
export function itemTables(tableName, recordId) {
  return RestGet(
    `${HOST}/v1.0/items/tables${tableName ? "/" + tableName : ""}${
      recordId ? "/" + recordId : ""
    }`
  );
}
export function itemTablesForUpn(upn,tableName, recordId) {
  return RestGet(
    `${HOST}/v1.0/user/${upn}/items/tables${tableName ? "/" + tableName : ""}${
      recordId ? "/" + recordId : ""
    }`
  );
}
export function itemVersions(tableName, tableKey) {
  return RestGet(
    `${HOST}/v1.0/versions/tables${tableName ? "/" + tableName : ""}${
      tableKey ? "/" + tableKey : ""
    }`
  );
}

export function publishedVersions(domain) {
  return RestGet(
    `${HOST}/v1.0/publish/${domain}`
  );
}
export function publishedAreaVersions(domain,area) {
  return RestGet(
    `${HOST}/v1.0/publish/${domain}/${area}`
  );
}


export function restoreItem(upn, tableName, key,versionId){
  var restoreRequest = {upn, tableName, key,versionId}
  return RestPost(`${HOST}/v1.0/restore/item`, restoreRequest);
}

export function findItemByKeyGlobally(upn,tableName, key) {
  // var version = null
  // if (key && key.indexOf("@")>-1){
  //   var s = key.split("@")
    
  //   key = s[0]
  //   version = s[1]
  // }
  // if (version){
  //   return RestGet(`${HOST}/v1.0/versions/tables/${tableName}/${key}/${version}`);
  // }else{
  return RestGet(`${HOST}/v1.0/user/${upn}/items/tables/${tableName}/TableKey/${key}`);
//}
}
export function findItemByKey(tableName, key) {
  var version = null
  if (key && key.indexOf("@")>-1){
    var s = key.split("@")
    
    key = s[0]
    version = s[1]
  }
  if (version){
    return RestGet(`${HOST}/v1.0/versions/tables/${tableName}/${key}/${version}`);
  }else{
  return RestGet(`${HOST}/v1.0/items/tables/${tableName}/TableKey/${key}`);
}
}
export function systemFindItemByKey(tableName, key) {
  var version = null
  if (key && key.indexOf("@")>-1){
    var s = key.split("@")
    
    key = s[0]
    version = s[1]
  }
  if (version){
    return RestGet(`${HOST}/v1.0/system/versions/tables/${tableName}/${key}/${version}`);
  }else{
  return RestGet(`${HOST}/v1.0/system/items/tables/${tableName}/TableKey/${key}`);
}
}
export function itemPatch(tableName, item) {
  return RestPost(`${HOST}/v1.0/items/tables/${tableName}`, item);
}

export function systemItemPatch(tableName, item) {
  return RestPost(`${HOST}/v1.0/system/items/tables/${tableName}`, item);
}



export function publishTableOf(area) {
  return RestPost(`${HOST}/v1.0/publish/tableof/${area}`, {});
}
export function publishTableOfV2(sourceDomain, targetDomain, tag) {
  return RestPost(
    `${HOST}/v2.0/publish/tableof/${sourceDomain}/${targetDomain}/${tag}`,
    {}
  );
}
export function publishToolbar(sourceDomain, targetDomain, tag) {
return RestPost(
    `${HOST}/v1.0/publish/toolbar/${sourceDomain}/${targetDomain}/${tag}`,
    {}
  );
}


export function saveDomainBlob (blob, domain,fileName, payload,flag)  {
  
  return new Promise((resolve, reject) => {
    
   

    function getChar(s, p) {
      if (!s) return "-";
      if (p > s.length) return "-";
      var c = s.substring(p, p + 1);

      return c;
    }

    

    var blobName =
      getChar(domain, 0) +
      "/" +
      getChar(domain, 1) +
      "/" +
      getChar(domain, 2) +
      "/" +
      domain 
   

    

    blobSave(
      "-",
      "default",
      blob,
      blobName,
      fileName,
      payload,
      flag
    )
      .then(url => {
        
        resolve({result:url});
      })

      .catch(error => {
        resolve({result:error,hasError:true});
      });
  });
};
export function getSupportArticles() {
  return RestGet(`${HOST}/v1.0/support/articles`);
}
export function getBlogArticles() {
  return RestGet(`${HOST}/v1.0/blog/articles`);
}
export function getGlobalTenant(tenant, area) {
  return RestGet(`${HOST}/table/${tenant}/${area}`);
}

export function getTenantUsers(domainName) {
  return RestGet(`${HOST}/v1.0/tenant/users/${domainName}`);
}
export function saveTenantSettings(domainName,tenantSettings) {

  return RestPost(`${HOST}/v1.0/tenant/${domainName}`, tenantSettings);
}
export function getTenantSettings(domainName) {
  return RestGet(`${HOST}/v1.0/tenant/${domainName}`);
}
//TODO : Remove stubs
export function activateSubscription(subscriptionId) {

  return RestPost(`${HOST}/v1.0/subscription/add`, {subscriptionId});
}

export function getSubscription(subscriptionId) {

  return RestGet(`${HOST}/v1.0/subscription/${subscriptionId}` );
}
export function trackAnomyous(path,payload) {
  return
  return axios.post(`${HOST}/v1.0/track`, {...payload,path}, {
    headers: {
      
      "content-type": "text/plain",
      accept: "application/json"
    }
  });

}
export function trackMe(path,payload) {
return
  return RestPost(`${HOST}/v1.0/me/track`, {...payload,path});
}
export function authenticate(token) {
  return new Promise((resolve, reject) => {
    axios
      .post(HOST + "/v1.0/authenticate", {
        token: token
      })
      .then(response => {
        //debugger
        localStorage.setItem("pto365auth", response.data.token);
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function track(upn, me, cb) {
  return cb(null, "stub");

  axios
    .post(HOST + "/tracks", {
      upn: upn,
      date: moment()
        .utc()
        .toISOString(),
      me: me
    })
    .then(response => {
      return cb(null, response.data.body);
    })
    .catch(error => {
      return cb(error);
    });
}

function authGet(url) {
  var auth = localStorage.getItem("pto365auth");
  const authStr = `Bearer ${auth}`;

  return axios.get(url, {
    headers: {
      Authorization: authStr
    }
  });
}

function authPost(url, body) {
  var auth = localStorage.getItem("pto365auth");
  const authStr = `Bearer ${auth}`;

  return axios.post(url, body, {
    headers: {
      Authorization: authStr,
      "content-type": "text/plain",
      accept: "application/json"
    }
  });
}

function authPostMultipart(path, body) {
  var auth = localStorage.getItem("pto365auth");
  const authStr = `Bearer ${auth}`;
  var url = HOST + path;

  return axios.post(url, body, {
    headers: {
      Authorization: authStr,
      "content-type": "multipart/form-data",
      accept: "application/json"
    }
  });
}

/**
 * Default tenant of the current signedin user
 *
 * @returns Tenant
 */
export function getTenant() {
  return new Promise(function(resolve, reject) {
    authGet(HOST + "/v1.0/me")
      .then(response => {
        getTenantSettings(response.data.domain)
        .then(tenantSettings=>{
          
          resolve({...response.data,tenantSettings});
        })
        .catch(error=>{
          reject(error)
        })
        //debugger
        
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function uploadFile(file, tags) {
  return new Promise(function(resolve, reject) {
    const formData = new FormData();
    formData.append("upfile", file);
    formData.append("tags", tags);

    authPostMultipart("/api/file", formData)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function getFile(id) {
  return new Promise(function(resolve, reject) {
    var query = {
      type: "WTW",
      id
    };
    authPost("/api/query", query)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function Get(path) {
  return new Promise(function(resolve, reject) {
    authGet(path)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}


export function  uploadFileToBlob(file,name,upn) {
  return new Promise((resolve, reject) => {
    

    var extentionIndex = _.lastIndexOf(name,".")
    var extention = name.substr(extentionIndex)
    
    function getChar(s, p) {
      if (!s) return "-";
      if (p > s.length) return "-";
      var c = s.substring(p, p + 1);

      return c;
    }

    var s = upn.split("@");

    var domain = s[1];
    var user = s[0];
   

    var blobName =
      getChar(domain, 0) +
      "/" +
      getChar(domain, 1) +
      "/" +
      getChar(domain, 2) +
      "/" +
      s[1] +
      "/";
    blobName += getChar(user, 0) + "/" + upn + "/";
    blobName += moment().format("YYYY/MM");

    var fileName =
      name + "-" + moment().format("YYYYMMDD-HHmmss") + extention;

      
      
    blobSaveFile(
      "-",
      "default",
      "images",
      blobName,
      fileName,
      file
    )
      .then(url => {
        
        resolve(url);
      })

      .catch(error => {
      
        reject(error);
      });
  });
};
