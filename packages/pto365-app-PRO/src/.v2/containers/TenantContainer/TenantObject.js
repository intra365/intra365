import json from "format-json"
export default class Tenant {
    _tenant = {}
    
   
    get page(){
      return this._tenant
    }
  
    export(){
        var file = {
           version : 1,
           title: "",
           references : [],
          
           page: this._tenant
        }

      return file
    }

    import(data){
        
        if (!data) return false
        if (!data.file) return false
        
        var file = data.file
        try {
            this._tenant = file.page
           
            
        } catch (error) {
            return false
        }
        return true
    }
   

  }