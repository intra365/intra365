var request = require('request');
var OfficeGraph = require("../../services/OfficeGraph/Storage")
var Word = require(".")

var auth = {};
var config = {
  clientId: '5244b387-faf4-44b4-8f60-082e4fd774bf',
  clientSecret: 'mRAGk+zxFA/DUjZPcTqsYrWqcDlVM0ynI9WIYopjkAk=',
  tokenEndpoint: 'https://login.microsoftonline.com/df96b8c9-51a1-40cf-b8b1-4514be8e9668/oauth2/token',
};

//config.clientSecret = process.env[config.clientId]

auth.getAccessToken = function () {
  return new Promise((resolve, reject) => {

    var requestParams = {
      grant_type: 'client_credentials',
      client_id: config.clientId,
      client_secret: config.clientSecret,
      resource: 'https://graph.microsoft.com'
    };

    request.post({
      url: config.tokenEndpoint,
      form: requestParams
    }, function (err, response, body) {
      var parsedBody = JSON.parse(body);

      if (err) {

        reject(err);
      } else if (parsedBody.error) {
        reject(parsedBody.error_description);
      } else {
        resolve(parsedBody.access_token);
      }
    });
  })
};



auth.getAccessToken()
  .then(token => {
    //     OfficeGraph.Storage(token)
    //    .writeJson("jumpto365/test2/test2.json",{hello:"world"})
    Word.convert(
        "Onboarding",
        "",
        "guides/LEHJ",
        "/Users/niels/Documents/OneDrive - Hexatown/",
        "My tasks/LEHJ.docx",
        OfficeGraph.Storage(token, "users/niels@hexatown.com"))
      .then(() => {
        console.log("Done")
      })
      .catch((error) => {
        console.warn(error)
      })

  })


// Word.convert( "Onboarding","","onboard","/Users/niels/Documents/OneDrive - Hexatown/jumpto365/","process-hr-onboarding.docx",Word.Storage())
// .then(()=>{console.log("Done")})
// .catch((error)=>{console.warn(error)})