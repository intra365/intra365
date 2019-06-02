
import json from "format-json"
export default class WebPart {
    _webPart = {}
    
   
    get webPart(){
      return this._webPart
    }
  
    export(){
        var file = {
           version : 1,
           title: "",
           references : [],
          
           webPart: this._webPart
        }

      return file
    }

    import(data){
        
        if (!data) return false
        if (!data.file) return false
        
        var file = data.file
        try {
            this._webPart = file.webPart
           
            
        } catch (error) {
            return false
        }
        return true
    }
   

  }