
var request = require('request');
var util = require('util');
var graph = {};


function post(token, url, body, cb) {
  request.post({
    url: url,
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + token
    },
    body: JSON.stringify(body)
  }, function (err, response, body) {
    var parsedBody;

    if (err) {
      return cb(err);
    } else {
      parsedBody = JSON.parse(body);
      if (parsedBody.error) {
        return cb(
          parsedBody.error
        );
      } else {
        cb(null, parsedBody);
      }
    }
  });

}

function get(token, url, cb, appendTo, index,retrycount) {
  console.log("getting", url, appendTo === true)
  request.get({
    url: url,
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + token
    }
  }, function (err, response, body) {
    var parsedBody;

    if (err) {
      var errCounter = retrycount ? retrycount + 1 : 1;
      if (errCounter>3){
         return cb(err, null, index);
      }else
      {
        // retry 
        console.log("retry #",errCounter)
        return get(token,url,cb,appendTo,index,errCounter)
      }
    }

    parsedBody = JSON.parse(body);
    if (parsedBody.error) {
      return cb(
        parsedBody.error, null, index
      );
    }

    if (parsedBody['@odata.nextLink']) {
      var data;
      if (!appendTo) {
        data = parsedBody.value
      }
      else {
        data = appendTo.concat(parsedBody.value)
      }

      return get(token, parsedBody['@odata.nextLink'], cb, data, index)
    }

    if (appendTo) {
      cb(null, appendTo.concat(parsedBody.value), index)
    }
    else {
      if (parsedBody.value) {
        cb(null, parsedBody.value, index);
      } else {
        cb(null, parsedBody, index);
      }
    };
  });
};



graph.readGroupMembers = function (token, groupId, cb) {
  get(token, 'https://graph.microsoft.com/beta/groups/' + groupId + '/members?$select=mail,department,displayName,country,accountEnabled,userPrincipalName,givenName,surname,id', cb)
};

graph.readManager = function (token, userPrincipalName, index, cb) {
    //return cb('skipped',null,index);
    get(token, 'https://graph.microsoft.com/v1.0/users/' + userPrincipalName + '/manager', cb, null, index)
}


module.exports = graph;

