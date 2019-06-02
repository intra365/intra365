import React from "react";
import Languages from "./Languages"
import Key from "./Key"
import Credits from "./Credits"
import Embed from "./Embed"
import Features from "./Features"
class TheTable extends React.Component {
  constructor(props) {

    super(props);

    this.languageClicked = this.languageClicked.bind(this);
    this.state = {
      language: this.props.language
    };

  }

  languageClicked(lang){
    if (this.props.languageSelected){
      console.log('TheTable Firing languageClicked',lang)
      
      this.props.languageSelected(lang)
    }
  }

  render() {
    
    return (
        <div  >
          {(this.props.version===2) && <Features feature=""/>}
          
          {(!this.props.version) && <Key  language={this.state.language}/>}
          {(!this.props.version) && <Languages language={this.state.language} languageSelected = {this.languageClicked}/>}
          {(!this.props.version) && <Credits language={this.state.language} onAbout={this.props.onAbout} />}
          {(!this.props.version) && <Embed language={this.state.language}/>}
        </div>
    );
  }
}

export default TheTable;
