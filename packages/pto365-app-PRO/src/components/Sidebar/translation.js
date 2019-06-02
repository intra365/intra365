import sidebarTexts from "./office365periodictable-sidebar.json";

function translation(lang,key){
    var language = lang ? lang : "en"
    var text = sidebarTexts[key][language]
    return text
}

export default translation;
