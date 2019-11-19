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
    axios.post("/user",user).then(data=>{
    }).catch(err=>console.log(err)).finally(()=>{
      this.props.history.replace('/');
    })
  }

  render() {
    return (
      <p>Loading profile...</p>
    );
  }
}

export default withRouter(Callback);