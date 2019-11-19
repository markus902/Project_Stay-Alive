import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Inventory from "../Inventory"
import CharacterUpdate from "../CharacterUpdate"
import ChartsAndAnalytics from "../ChartsAndAnalytics"
import LevelUp from "../LevelUp"
import TaskManager from "../TaskManager"
import PrivateRoute from "../PrivateRoute";


class CharacterDashboard extends Component {
  state = {

  }

  render() {
    return (
      <Router>
        <h1>CharacterDashboard</h1>
        <Switch>
          <PrivateRoute path="/character/inventory" component={Inventory} />
          <PrivateRoute path="/character/taskmanager" component={TaskManager}/>
          <PrivateRoute path="/character/chartsandanalytics" component={ChartsAndAnalytics} />
          <PrivateRoute path="/character/characterupdate" component={CharacterUpdate}/>
          <PrivateRoute path="/character/levelup" component={LevelUp}/>
        </Switch>
      </Router>
    )
  }
}

export default CharacterDashboard;