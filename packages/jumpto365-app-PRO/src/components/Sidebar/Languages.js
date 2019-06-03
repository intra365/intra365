import React from "react";
import Translate from "./translation"
import { Link } from 'react-router-dom'
import Config from "../../config"
import Util from "../../util"
import {
  IPersonaProps,
  Persona,
  PersonaSize,
  PersonaPresence
} from 'office-ui-fabric-react/lib/Persona';
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import $ from "jquery"

class Language extends React.Component {
  constructor() {
    super();
    this.clicked = this.clicked.bind(this);
  }

  clicked(){
    if (this.props.languageSelected){
      this.props.languageSelected(this.props.language)
    }

  }


  render() {
    var image = require('./media/flags/'+this.props.image)
    var link = Config.periodictablePath + this.props.language;
    var active = (this.props.language === this.props.current);
    var classname = active ? "flagactive" : "flaginactive";
    var linkObj = {pathname:'/periodictable/',state:{language:this.props.language}}
    return (
    
        <a href={link} >
        <div className={classname} onClick={this.clicked}>
          <img src={image} className="flag" alt='' align="left" style={{margin:"10px",height:"84px",width:"auto"}}>
          </img>
        </div>
          </a>
          );
     }
   }
class Languages extends React.Component {

  constructor(props) {
    super(props); 
    this.state = {
      language: this.props.language,
      height:"500px",
    };
  }
  updateDimensions = () => {
    this.setState({ height: $(window).innerHeight()-40});
    
}
  componentWillMount= () =>  {
    this.updateDimensions();
}
  render() {
    
    var languageMarkup = [];
    var languages = [
      {image:"Czech-Republic.png",key:"cs"},
      {image:"Denmark.png",key:"da"},
      {image:"Germany.png",key:"de"},
      {image:"US-UK-English.png",key:"en"},
      {image:"Spain.png",key:"es"},
      {image:"Finland.png",key:"fi"},
      {image:"France.png",key:"fr"},
      {image:"Israel.png",key:"he"},
      {image:"Hungary.png",key:"hu"},
      {image:"Iceland.png",key:"is"},
      {image:"Japan.png",key:"ja"},
      {image:"Netherlands.png",key:"nl"},
      {image:"Norway.png",key:"no"},
      {image:"Portugal.png",key:"pt"},
      {image:"Sweden.png",key:"sv"},
    ]
    languages.forEach(function(language) {
      languageMarkup.push(<div><Language key={language.key}  language={language.key} current={this.props.language} image={language.image} alt="Flag" languageSelected = {this.props.languageSelected}/></div>)
    }, this);
    const { ...other } = this.props;
    return (
   
 
              <LanguagesV2 {...other} version={2}/>
 


    );
  }
}

export class LanguagesV2 extends React.Component {

  constructor(props) {
    super(props); 
    this.state = {
      language: this.props.language
    };
  }
  onRenderSecondaryText = (props) =>{
    console.log(props)
    return (<a target="_blank" href={props.secondaryText}>{props.secondaryText}</a>)
  }

  render() {
    
    var languageMarkup = [];
    var languages = [
      {image:"Czech-Republic.png",key:"cs"},
      {image:"Denmark.png",key:"da"},
      {image:"Germany.png",key:"de"},
      {image:"US-UK-English.png",key:"en"},
      {image:"Spain.png",key:"es"},
      {image:"Finland.png",key:"fi"},
      {image:"France.png",key:"fr"},
      {image:"Israel.png",key:"he"},
      {image:"Hungary.png",key:"hu"},
      {image:"Iceland.png",key:"is"},
      {image:"Japan.png",key:"ja"},
      {image:"Netherlands.png",key:"nl"},
      {image:"Norway.png",key:"no"},
      {image:"Portugal.png",key:"pt"},
      {image:"Sweden.png",key:"sv"},
    ]
    languages.forEach(function(language) {
      var translatorMarkup = null
      var tranlationName = null
      var translator = Util.translator(language.key)
      if (translator){
      var persona = {
        //imageUrl: require('./MW.png'),
        //imageInitials: 'MW',
        primaryText: translator.author, //  'Matt Wade',
        //secondaryText: 'Microsoft MVP, Office 365 Consultant',
        secondaryText: translator.link, // 'H3 Solutions, Inc',
        // tertiaryText: 'In a meeting',
        // optionalText: 'Available at 4:00pm'
      };
      
      if (translator.image){
        persona.imageUrl = translator.image
      }

      tranlationName = <h2 className="ms-font-xxl"> {Translate(language.key,translator.promptId)}</h2>
      translatorMarkup = <div style={{marginTop:"-12px"}} ><Persona  
          { ...persona }
          size={ PersonaSize.size48 }
          xpresence={ PersonaPresence.away }
          onRenderSecondaryText={this.onRenderSecondaryText}
        /></div>

    }

      languageMarkup.push(<div key={language.key}  style={{ minWidth:"400px" ,maxWidth:"600px", width:"30%",float:"left"}}>
      <div style={{clear:"both",margin:"10px",width:"100%",xfloat:"left"}}>
      <Language key={language.key}  language={language.key} current={this.props.language} image={language.image} alt="Flag" languageSelected = {this.props.languageSelected}/>
      {tranlationName}
      {translatorMarkup}
      </div>
      </div>)
    }, this);
    
    return (
   
<div >

 
               {languageMarkup}
  
</div>


    );
  }
}

export default Languages;

