import React, { Component } from "react";


// import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
// import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import TheTable from "./TheTable";

class App extends Component {
  constructor(props) {
    
        super(props);
        this.languageClicked = this.languageClicked.bind(this);
        this.state = {language : props.language};
      }
    
      languageClicked(lang){
        if (this.props.languageSelected){
          this.props.languageSelected(lang)
        }
      }
    
  
  render() {
    const { ...other } = this.props;
    return (  
      <div className="App">
        <div className="Top">
         </div>
        <div className="ui text container">
          <div>
            <TheTable language={this.state.language} languageSelected = {this.languageClicked} {...other} />
          </div>
        </div>
      </div>
      
    );
  }
}

export default App;
