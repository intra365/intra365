var _ = require("lodash")

var maps = require("../data/fasttrack.json")
var fasttrackmap = require("../data/fasttrackmap.json")
var appData = require("../components/PeriodicSystem/office365periodictable.json")

module.exports.useCases = (app) =>
{
  if (!app ) return null
  var toolIndex = _.findIndex(maps.tools,{"key":app})
  if (toolIndex < 0){ return null}

  var tool = maps.tools[toolIndex]
  var cases = []
  

  tool.links.forEach(linkIndex => {
    cases.push(maps.list[linkIndex])
  });
 return cases

}

//key from  C:\code\private\pto365\src\components\PeriodicSystem\office365periodictable.json 

module.exports.appToTool = (key) =>
{
  if (!key) return null
  var app = null
  appData[0].data.forEach(row => {
      row.columns.forEach(col => {
          if (col.key === key){
            app = col
          }
      })
  });
  
  
  if (!app) return null

  var toolIndex = _.findIndex(fasttrackmap.data,{"id":app.cellId})
  if (toolIndex < 0){ return null}

  var tool = fasttrackmap.data[toolIndex]
  return tool

}





