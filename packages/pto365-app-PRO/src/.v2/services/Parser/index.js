import React, { Component,Fragment } from 'react';
import MattNiels from '../../../components/MattNiels'
import Translators from '../../components/Translators'
import Embed from '../../components/Embed'  
import Languages from '../../../components/Sidebar/Languages';
import PeriodicTable from '../../components/PeriodicTable';
import Flow from '../../components/Flow'

import ReactJson from 'react-json-view'
import OfficeGraph from '../../components/OfficeGraph'

export default class Parser{ 
static parseComponents = (html) => {


var results = []
var ix = 0  

var segments = html.split("/***")
if (segments.length === 1) // no inline component references found
{
    ix+=1
    results.push( <span key={ix} dangerouslySetInnerHTML={{ __html: segments[0] }}></span>)
    return results
}

for (let index = 0; index < segments.length; index++) {
    const segment = segments[index];
    var components = segment.split("***/")
    if (components.length === 1){ // pure html
        ix+=1
        results.push( <span key={ix} dangerouslySetInnerHTML={{ __html: components[0] }}></span>)
    }
    else
    {
        var componentName = components[0] ? components[0].substring(components[0].lastIndexOf("/")+1) : ""
        var url = components[0] ? components[0].substring(0,components[0].lastIndexOf("/")) : ""
        ix+=1
        
        function unescape(text,expression,key){
                    
                        var regex = new RegExp(expression);
                     
                        return text.replace(regex, function () {
                        
                            return key
                        })
                }
        switch (componentName) {
            case "MattNiels":
                results.push(<MattNiels key={ix}/>)
                break;
            case "Translators":
                results.push(<Translators key={ix}/>)
                break;
            case "Embed":
                results.push(<Embed key={ix}/>)
                break;
            case "Languages":
                results.push(<Languages key={ix}/>)
                break;        
            case "PeriodicTable" :    
                results.push(<PeriodicTable key={ix}/>)
                break;        
            case "Flow" :    
                results.push(<Flow url={url} key={ix}/>)
                break;   
            case "Graph" : 
                var splitUrl = url.split("#")
                var hash = url.length > 1 ? decodeURI( splitUrl[1]) : null
                var url = url.length > 1 ? splitUrl[0] : url
                var s = hash.split("+")
                var consent = s.length>1 ? s[1] : null
                var template = s[0]
                
              // debugger
                results.push(<OfficeGraph url={url} template={template} consent={consent} key={ix}/>)
                break;            
            case "Control" :    
                //results.push(<Flow url={url} key={ix}/>)
                
                var json = decodeURI(url)


                json = unescape(json,/(\\\[)/gi,"[")
                json = unescape(json,/(\\\])/gi,"]")
                json = unescape(json,/(\\\{)/gi,"{")
                json = unescape(json,/(\\\})/gi,"}")
                json = unescape(json, /(\\)/gi, "")
                var data = null
                try {
                    data = JSON.parse(json)    
                } catch (error) {
                    data = error.message
                }
               //var x = `<h1>${json}</h1>`
               // results.push( <span key={ix} dangerouslySetInnerHTML={{ __html: x }}></span>)
               //results.push(  <ReactJson src={{data}} collapsed={1}/>  )
              //  console.log(x)
                break;                

            default:
                results.push(<div key={ix}  ><img src={components[0].replace("&amp;","&").replace("&amp;","&").replace("&amp;","&")}></img></div>)
                break;
        }
        ix+=1
        if (components[1]){
            //debugger
        results.push( <span key={ix} dangerouslySetInnerHTML={{ __html: components[1] }}></span>)
    }
    }
}
return results
   
}


}