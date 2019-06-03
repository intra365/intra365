require("../connect")
var mongoose = require('mongoose');
var Message = require("../models/message").model

var msg = new Message({
    title:"Title",
    to: "niels@hexatown.com",
    from: "niels@hexatown.com",
    date: Date.now(),
    tags: ["info", "high"],
    content: ` Hello there 2 ....

`
})

//msg.save().then(() => console.log('send'));

//return
  var callback = (a,results,c,d) => {
    if (results && results.length)
    {
        results.forEach(element => {
            console.log(element)
        });
    }
    
  }
  Message.
  find({ }).
  where('to').equals('niels@hexatown.com').
  limit(10).
  sort('date').
  exec(callback);