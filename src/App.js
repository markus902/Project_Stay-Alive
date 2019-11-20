import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import './App.css';
import MenuAppBar from "./Components/MenuAppBar"
import Login from "./Components/Login"
import CharacterDashboard from "./Components/CharacterDashboard"
import SignUp from "./Components/Signup"
import NoMatch from "./Components/NoMatch"
import PrivateRoute from "./Components/PrivateRoute"
import auth0Client from './Auth';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
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
            <PrivateRoute path="/character" checkingSession={this.state.checkingSession}  component={CharacterDashboard} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>

    );
  }
}

export default withRouter(App);
