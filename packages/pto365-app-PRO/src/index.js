// http://jamesknelson.com/push-state-vs-hash-based-routing-with-react-js/
// https://www.javascriptstuff.com/component-communication/
import 'react-app-polyfill/ie11'; // For IE 9-11 support
 import 'core-js/fn/array/find';
 import 'core-js/fn/array/includes';
 import 'core-js/fn/number/is-nan';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import AppV2  from './.v2'
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import counter from './reducer'
import { addArticle } from "./redux/actions/index";
import uuidv1 from "uuid";
import PTO365STORE,{setService} from "./util/PTO365STORE"
import 'semantic-ui-css/semantic.min.css';
//require('es6-shim');
var callback = null


// Split location into `/` separated parts, then render `Application` with it
function handleNewHash() {
    var location = window.location.hash.replace(/^#\/?|\/$/g, '').split('/');
    //console.log("Hash Changed")
    //console.log(location)
    
    console.log("changed hash to",window.location.hash)
    
    window.gtag('config', window.GTAGID, {'page_path': window.location.hash});
    window.gtag('event','view_item')

    switch (location[0]) {
      case "service":
        setService(location[1],location[2])
        break;
    
      default:
        break;
    }


    ReactDOM.render(
    
     <AppV2 location={location}  ref={(input) => { 
       callback = input
      }}></AppV2>
    , document.getElementById('root'));
    
    if (callback && callback.newLocation){
      
      callback.newLocation(window.location.hash)
    }
    //registerServiceWorker();
    
}
  
  // Handle the initial route and browser navigation events
  // window.addEventListener('hashchange', handleNewHash, false)

  // handleNewHash()
  
  
  ReactDOM.render(  <AppV2 />, document.getElementById('root'));


   /* Render application after Office initializes */

//   if (window.Office){
// window.Office.initialize = () => {
//   ReactDOM.render(  <AppV2 isOffice/>, document.getElementById('root'));
// }
// }