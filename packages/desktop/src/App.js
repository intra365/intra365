import React, { Component } from 'react';
import { Customizer } from 'office-ui-fabric-react';
import { FluentCustomizations } from '@uifabric/fluent-theme';
import { initializeIcons } from '@uifabric/icons';
import Loadable from 'react-loadable';
import links from "./data/links"
import _ from "lodash"
import { Provider, Subscribe } from 'react-contextual'
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import {createStore} from "react-contextual"

const electron = window.require('electron');
//const fs = electron.remote.require('fs');
//const ipcRenderer  = electron.ipcRenderer;

// window.isElectron
debugger

initializeIcons();


var verbose = true
function log(a,b,c,d,e,f)
{
    if (!verbose) return
    console.log(a,b,c,d,e,f)
}


function Loading(props) {
  if (props.error) {
    return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
  } else if (props.pastDelay) {
    return <div>Loading....</div>;
  } else {
    return null;
  }
}
let MegaMenu = Loadable({loader:()=>import( './components/MegaMenu'),loading: Loading,timeout:10000,delay:300})

class App extends Component {

  state = {store:{}}
  render() {
    var store = this.state.store

   
    return (
      <Provider {...store}>
        <Subscribe>
          {globalContext => (
          <Fabric>
            <Customizer {...FluentCustomizations}>
            <div>
              
              <div><MegaMenu links={links} /></div>
            </div>
        </Customizer>
        </Fabric>
                )}</Subscribe>
        </Provider>
  
    );
  }
}

export default App;
