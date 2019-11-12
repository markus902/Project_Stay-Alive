import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import NavBar from "./Components/NavBar"
import Login from "./Components/Login"
import CharacterDashboard from "./Components/CharacterDashboard"
import SignUp from "./Components/Signup"
import NoMatch from "./Components/NoMatch"

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/character" component={CharacterDashboard} />
          <Route exact path="/signup" component={SignUp} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
