import scenarioView from './scenario'
import keynameView from './keyname'
import iconnameView from './iconname'
import keyView from './key'
import nameView from './name'
import toolsinonecolumnView from './toolsinonecolumn'
import taskareaView from './taskarea'
import licenseInfo from './licenseinfo'
export default class Views {
    scenario = (viewName,renderToolCell,_onColumnClick,customView) => {
      if (customView){
        return customView(renderToolCell,_onColumnClick)
      }
      var view = viewName ? viewName.toLowerCase() : ""
      switch (view) {
        case "keyname":
          return keynameView(renderToolCell,_onColumnClick)        
          break;
        case "iconname":
          return iconnameView(renderToolCell,_onColumnClick)        
          break;
        case "key":
          return keyView(renderToolCell,_onColumnClick)        
          break;
        case "taskarea":
          return taskareaView(renderToolCell,_onColumnClick)        
          break;
        case "name":
          return nameView(renderToolCell,_onColumnClick)        
          break;
        case "toolsinonecolumn":
          return toolsinonecolumnView(renderToolCell,_onColumnClick)        
          break;
        case "licenseinfo":
          return licenseInfo(renderToolCell,_onColumnClick)        
          break;

        default:
          return scenarioView(renderToolCell,_onColumnClick)
          break;
      }



    }

}