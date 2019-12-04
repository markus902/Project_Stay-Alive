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