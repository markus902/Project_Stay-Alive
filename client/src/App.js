import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Task from "./views/Task";
import Stats from './views/Stats'
import Character from "./views/Character";
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import ContextProvider from "./components/ContextProvider"

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">

        <ContextProvider>
          <NavBar />
          <Container className="flex-grow-1 mt-5">
            <Switch>
              <Route path="/" exact component={Home} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/task" component={Task} />
              <PrivateRoute path="/character" component={Character} />
              <PrivateRoute path="/stats" component={Stats} />
            </Switch>
          </Container>
          <Footer />
        </ContextProvider>
      </div>
    </Router>
  );
};

export default App;
