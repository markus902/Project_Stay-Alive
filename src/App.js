import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import './App.css';
import MenuAppBar from "./Components/MenuAppBar"
import Login from "./Components/Login"
import CharacterDashboard from "./Components/CharacterDashboard"
import SignUp from "./Components/Signup"
import NoMatch from "./Components/NoMatch"
import PrivateRoute from "./Components/PrivateRoute"
import auth0Client from './Auth';
import Inventory from "./Components/Inventory"
import CharacterUpdate from "./Components/CharacterUpdate"
import ChartsAndAnalytics from "./Components/ChartsAndAnalytics"
import LevelUp from "./Components/LevelUp"
import TaskManager from "./Components/TaskManager"
import CharacterCreation from './Components/CharacterCreation';
import Callback from "./Callback"


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
      task: 
        [
          {name:"Task 1 Max Characters 30",description:"Description goes here",frequency:"Daily",challenge:4,completed:false},
          {name:"task2",description:"Description goes here",frequency:"Weekly",challenge:2,completed:false},
          {name:"task3",description:"Description goes here",frequency:"Daily",challenge:5,completed:true},
          {name:"task4",description:"Description goes here",frequency:"Weekly",challenge:3,completed:false},
          {name:"task5",description:"Description goes here",frequency:"Monthly",challenge:1,completed:false},
        ]
    }
  }


  async componentDidMount() {
    // eslint-disable-next-line react/prop-types
    if (this.props.location.pathname === '/callback') {
      this.setState({ checkingSession: false });
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({ checkingSession: false });
  }


  render() {
    return (
      <Router>
        <div>
          <MenuAppBar />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/callback" component={Callback} />
            <PrivateRoute path="/character/inventory" component={Inventory} />
            <PrivateRoute path="/character/taskmanager" task={this.state.task} component={TaskManager} />
            <PrivateRoute path="/character/chartsandanalytics" component={ChartsAndAnalytics} />
            <PrivateRoute path="/character/characterupdate" component={CharacterUpdate} />
            <PrivateRoute path="/charactercreation" component={CharacterCreation} />
            <PrivateRoute path="/character/levelup" component={LevelUp} />
            <PrivateRoute path="/character" checkingSession={this.state.checkingSession} component={CharacterDashboard} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>

    );
  }
}

export default withRouter(App);
