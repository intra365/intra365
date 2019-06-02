'use strict';
var htmlencode = require('htmlencode')
htmlencode.EncodeType = 'numerical'
let https = require ('https');
var parseString = require('xml2js').parseString;

var translate = {}
translate.ping = function(input) {
return input
}


translate.translate = function (text,sourceLanguage,targetLanguage,cb) {
    let subscriptionKey = '9c380eb15d8a4feba7bab16136a97344';

    let host = 'api.microsofttranslator.com';
    let path = '/V2/Http.svc/TranslateArray';
    
    let ns = "http://schemas.microsoft.com/2003/10/Serialization/Arrays";
let content =
	'<TranslateArrayRequest>\n' +
	// NOTE: AppId is required, but it can be empty because we are sending the Ocp-Apim-Subscription-Key header.
	'  <AppId />\n' +
	'  <From>' + sourceLanguage + '</From>\n' +

    '  <Texts>\n' 
    
    var lines = text.split("\n")
    lines.forEach(line => {
        //console.log(line)
        try {
            var escaped = htmlencode.htmlEncode(line)
            content += '    <string xmlns=\"' + ns + '\">'+escaped+'</string>\n'     
                
        } catch (error) {
            console.log(error,line)            
        }
    });
    
    
	content +=	'  </Texts>\n' +
	'  <To>' + targetLanguage + '</To>\n' +

    '</TranslateArrayRequest>\n';


    let params = ''

let response_handler = function (response) {
    let body = '';
    response.on ('data', function (d) {
        body += d;
    });
    response.on ('end', function () {
		
        parseString(body, function (err, result) {
            var resultingText = ""


            try {
                if (result.html){
                    return cb(JSON.stringify(result.html))
                }
                result.ArrayOfTranslateArrayResponse.TranslateArrayResponse.forEach(response => {
                    resultingText += htmlencode.htmlDecode (response.TranslatedText[0])
                    resultingText += "\n"
                });
                cb(null,resultingText);
                    
            } catch (error) {
                cb(null,resultingText);
                
            }
            
            
        });

    });
    response.on ('error', function (e) {
        cb( e.message);
    });
};

let Translate = function () {
	let request_params = {
		method : 'POST',
		hostname : host,
		path : path + params,
		headers : {
			'Content-Type' : 'text/xml',
			'Ocp-Apim-Subscription-Key' : subscriptionKey,
		}
	};

	let req = https.request (request_params, response_handler);
	req.write (content);

    req.end ();
}
Translate()
}

module.exports = translate