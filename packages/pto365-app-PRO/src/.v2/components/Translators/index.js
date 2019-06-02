import React, { Component } from 'react';
import TranslatorData  from "../../../data/translators.json"
import Translate      from "../../../components/Sidebar/translation"

import 'office-ui-fabric-react/dist/css/fabric.css'

export default class Translators extends Component {
    render() {
  
    var translators = [];
    for (let index = 0; index < TranslatorData.length; index++) {
        const translator = TranslatorData[index];
        if (index > 0){
        if (index=== (TranslatorData.length-1)){
            translators.push(' and ')
        }else
        {
            translators.push(', ')
            
        }
    }
        translators.push(<a href={translator.link} target="_blank">{translator.author} ({Translate('en',translator.promptId)})</a>)

    }      

    return (
      <div >
    { translators}
     
     </div>
       );
  }
}

