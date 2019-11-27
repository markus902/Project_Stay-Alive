import auth0 from 'auth0-js';
import config from "./auth_config.json"
import axios from 'axios';
require("dotenv").config();

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      // the following three lines MUST be updated
      domain: config.domain,
      audience: config.audience,
      clientID: config.clientId,
      redirectUri: 'http://localhost:3000',
      responseType: 'token id_token',
      scope: 'openid profile email activity'
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  getAccessToken() {
    return this.accessToken;
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  signIn() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    })
  }

  setSession(authResult) {
    console.log(authResult.idToken);
    console.log(authResult.idTokenPayload);

    ///// test the fitbit call
    console.log(process.env.REACT_APP_JeremyTOKEN); // not working
    console.log(process.env.REACT_APP_JeremyUSERID); // not working
    console.log(process.env.REACT_APP_JeremyUSERID); // Need a refresh token that doesnt change.
    let config = {
      headers: {
        'Authorization': "bearer " + authResult.idToken
      }
    };
    axios.get(
      'https://api.fitbit.com/1/user/7WTJLB/profile.json',
      config
    ).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    });


    /////
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    this.accessToken = authResult.accessToken;
    // set the time that the id token will expire at
    this.expiresAt = authResult.idTokenPayload.exp * 1000;
  }


  signOut() {
    this.auth0.logout({
      returnTo: 'http://localhost:3000',
      clientID: config.clientId,
    });
  }
  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err);
        this.setSession(authResult);
        resolve();
      });
    });
  }
}

const auth0Client = new Auth();

export default auth0Client;