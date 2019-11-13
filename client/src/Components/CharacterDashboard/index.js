import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "../NoMatch"
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
      <div>
        <h1>CharacterDashboard</h1>

            <Inventory />
            <CharacterUpdate />
            <ChartsAndAnalytics />
            <LevelUp />
            <TaskManager />
      </div>
    )
  }
}

export default CharacterDashboard;