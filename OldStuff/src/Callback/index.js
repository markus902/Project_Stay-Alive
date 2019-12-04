import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../Auth';
import SignUp from "../Components/Signup";
import Container from '@material-ui/core/Container'
import Axios from 'axios';



class Callback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  async componentDidMount() {
    await auth0Client.handleAuthentication();
    const profile = auth0Client.getProfile()
    if(profile.sub.split("|")[0]==="fitbit"){
        this.setState({ 
          user:{
            username:profile.name,
            password:profile.password || "",
            email:profile.email || "",
            firstName:profile.name.split(" ")[0],
            lastName:profile.name.split(" ")[1]
          }
        })
    }
    else if(profile.sub.split("|")[0]==="google-oauth2"){
      this.setState({ 
        user:{
          username:profile.nickname,
          password:profile.password || "",
          email:profile.email || "",
          firstName:profile.given_name || "",
          lastName:profile.family_name || ""
        }
      })
    }
    else{
      this.setState({ 
        user:{
          username:profile.nickname,
          password:profile.password || "",
          email:profile.email || "",
          firstName:profile.name || "",
          lastName:profile.name|| ""
        }
      })
    }
  }

  render(){
      return (
        <Container maxWidth="md">
          {this.state.user ? <SignUp user={this.state.user}/> : <div>Please Login In</div>}
        </Container>
      )
  }
}

//test
export default withRouter(Callback)