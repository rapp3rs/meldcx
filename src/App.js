import { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./Routes";
import Login from './components/Login';
import Homepage from './components/Homepage';
import "./index.css";

class App extends Component {
  render() {
    return (
      <Router>
        <PublicRoute path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Homepage} />
      </Router>
    );
  }  
}

export default App;
