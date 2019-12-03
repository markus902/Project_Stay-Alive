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
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      scope: 'openid profile email password activity'
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
    return new Date().getTime() < this.expires_in;
  }

  signIn() {
    this.auth0.authorize();
  }

  getRefreshToken() {
    let refreshToken = this.refreshToken;
    console.log("refreshToken: ", refreshToken);
    return refreshToken;
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
    console.log("LOGGING STUFF");
    console.log("idToken: ", authResult.idToken);
    console.log("accessToken: ", authResult.accessToken);
    console.log("auth Result: ", authResult);
    console.log("idTokenPayload: ", authResult.idTokenPayload);



    ///// TEST the fitbit call
    // console.log(process.env.REACT_APP_JeremyTOKEN); // not working
    // console.log(process.env.REACT_APP_JeremyUSERID); // not working
    // console.log(process.env.REACT_APP_JeremyUSERID);
    // let accesstoken = authResult.accessToken;
    // console.log('YOUR ACCESS TOKEN IS: ' + accesstoken)

    // let config = {
    //   headers: {
    //     Authorization: `Bearer ${authResult.idToken}`
    //   }
    // };
    // let url = 'https://api.fitbit.com/1/user/7WTJLB/activities/date/2019-11-26.json';
    // 'https://api.fitbit.com/1/user/7WX3P3/profile.json',
    // 'https://api.fitbit.com/1/user/7WTJLB/activities/date/2019-11-26.json', Isabela's user id with activities
    // 'https://api.fitbit.com/1/user/7WX3P3/activities/date/2019-11-26.json', // Jeremy's user id with activities
    // config 
    // let request = url, { headers: { Authorization: `Bearer ${authResult.idToken}` } };

    // console.log('REQUEST: ' + request)


    // axios.get(url, config)
    // .then((response) => {
    //   console.log(response)
    //   console.log(response.data);
    //   console.log(response.status);
    //   console.log(response.statusText);
    //   console.log(response.headers);
    //   console.log(response.config);
    //   console.log("AUTH ATTEMPT!");
    // }).catch((error) => {
    //   console.log(error)
    //   console.log("IT BROKE");
    //   if (error.response) {
        // The request was made and the server responded with a status code
      //   // that falls out of the range of 2xx
      //   console.log(error.response.data);
      //   console.log(error.response.status);
      //   console.log(error.response.headers);
      // } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      //   // http.ClientRequest in node.js
      //   console.log(error.request);
      // } else {
    //     // Something happened in setting up the request that triggered an Error
    //     console.log('Error', error.message);
    //   }
    //   console.log(error.config);
    // });


    /////
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    this.accessToken = authResult.accessToken;
    // set the time that the id token will expire at
    this.expires_in = authResult.idTokenPayload.exp * 1000 * 60 * 10;
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