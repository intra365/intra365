import React from "react";
import logo from "./logo.svg";

// import { BrowserRouter as Router, Route, Link } from "react-router";
import "./App.css";
import Root from "./pages/Root";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {/* <Router>
        <Route path="/" exact component={Root} />
      </Router> */}
    </div>
  );
}

export default App;
