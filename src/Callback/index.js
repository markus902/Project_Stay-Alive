import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from './Auth';
import axios from "axios";
import Loading from "../Components/Loading"


class Callback extends Component {
  async componentDidMount() {
    await auth0Client.handleAuthentication();
    const profile = auth0Client.getProfile()
    let user={
      name: profile.name,
      email: profile.email || "",
      password:profile.password || "",
      idToken:profile.idToken || ""
    }
    axios.post("/user",user).then(()=>{
    }).catch(err=>console.log(err)).finally(()=>{
      // eslint-disable-next-line react/prop-types
      this.props.history.replace('/');
    })
  }

  render() {
    return (
      <Loading />
    );
  }
}

export default withRouter(Callback);