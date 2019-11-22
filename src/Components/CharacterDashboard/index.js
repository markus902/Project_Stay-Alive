import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Inventory from "../Inventory"
import CharacterUpdate from "../CharacterUpdate"
import ChartsAndAnalytics from "../ChartsAndAnalytics"
import LevelUp from "../LevelUp"
import TaskManager from "../TaskManager"
import PrivateRoute from "../PrivateRoute";


class CharacterDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }

  render() {
    return (
        <h1>CharacterDashboard</h1>
    
    )
  }
}

export default CharacterDashboard;