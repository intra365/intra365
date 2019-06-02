let Testdata = require("../TestData").default
let Utility = require("../../utilities").default
let Data = require("../index").default
let excelFileData = require("./Jumpto365 Excel Tool v1.json")


module.exports.tasks = function(){
    var tasks1 = Utility.GroupTasksBySubject(Testdata.tasks)
    var tasks2 =  Utility.EnsureNameAndApplyKeyValue(tasks1,"subject")

    return tasks2

}
module.exports.scenario = function(){
    var tasks1 = Utility.GroupTasksBySubject(Testdata.tasks)
    var tasks2 =  Utility.EnsureNameAndApplyKeyValue(tasks1,"subject")
    var data = new Data()
    
    var scenario = tasks2[0];
    scenario.tools = Utility.ResolveTools(scenario.tools,data.getApp);
    
    
    return scenario

}

module.exports.scenariosPanel = function(){
    var data = new Data()
    return data.getUseCase("Increase employee engagement of firstline workers")
}

module.exports.toolData = function(){
    var data = new Data()

    return data.getApp("word")
}

module.exports.markdown = function(){
    return Testdata.markdown
}

module.exports.url = function(){
    return Testdata.url
}

module.exports.tenant = function(){
    return {
        name: "Jumpto365",
        stage: "new",
        properties : {
        logo: "https://placeimg.com/100/20/any"
    }
    }
}

module.exports.excelData = function (){

    var buf = Buffer.from(excelFileData, 'base64')
    
    return buf
}

module.exports.context = function () {
    return  {
        
    }
}


module.exports.user = function () {
    return  {
        
    }
}
