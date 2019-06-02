import json from "format-json"
export default class Page {
    _page = {}
    
   
    get page(){
      return this._page
    }
  
    export(){
        var file = {
           version : 1,
           title: "",
           references : [],
          
           page: this._page
        }

      return file
    }

    import(data){
        
        if (!data) return false
        if (!data.file) return false
        
        var file = data.file
        try {
            this._page = file.page
           
            
        } catch (error) {
            return false
        }
        return true
    }
   

  }