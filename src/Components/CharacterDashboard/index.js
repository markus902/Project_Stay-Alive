import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Inventory from "../Inventory"
import CharacterUpdate from "../CharacterUpdate"
import ChartsAndAnalytics from "../ChartsAndAnalytics"
import LevelUp from "../LevelUp"
import TaskManager from "../TaskManager"


class CharacterDashboard extends Component {
  state = {

  }

  render() {
    return (
      <Router>
        <h1>CharacterDashboard</h1>
        <Switch>
          <Route path="/character/inventory" component={Inventory} />
          <Route path="/character/taskmanager" component={TaskManager} />
          <Route path="/character/chartsandanalytics" component={ChartsAndAnalytics} />
          <Route path="/character/characterupdate" component={CharacterUpdate} />
          <Route path="/character/levelup" component={LevelUp} />
        </Switch>
      </Router>
    )
  }
}

export default CharacterDashboard;