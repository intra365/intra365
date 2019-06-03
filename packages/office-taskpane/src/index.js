import 'react-app-polyfill/ie11'; // For IE 9-11 support
import "office-ui-fabric-react/dist/css/fabric.min.css";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

initializeIcons();

const render = officeLoaded => {
  ReactDOM.render(
    <App officeLoaded={officeLoaded} />,
    document.getElementById("root")
  );
};
if (window && window.Office) {
  window.Office.onReady()
  .then(function() {
    var Office =  window.Office ? window.Office : {}
    var ctx = Office.context
  //   if (ctx.auth){
  //     ctx.auth.getAccessTokenAsync(function(result) {
      
  //     if (result.status === "succeeded") {
  //         var token = result.value;
  //         // ...
  //     } else {
  //         console.log("Error obtaining token", result.error);
  //     }
  // })}
    if (ctx.diagnostics){ 
      
       console.log("Office ready")
   // debugger
    render(true);

  }
  });
}
render(false);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
