module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Please log in to view this resource");
    res.redirect("/users/login");
  }
};


// Auth0 testing
let auth0 = new auth0.WebAuth({
  domain: '{YOUR_AUTH0_DOMAIN}',
  clientID: '{YOUR_AUTH0_CLIENT_ID}',
  // Response type for all authentication requests. 
  // It can be any space separated list of the values code, token, id_token. 
  // If you don't provide a global responseType, you will have to provide a responseType for each method that you use.
  responseType: '{OPTIONAL, string}'
});



  // Fitbit uses OAuth 2.0 for user authorization and API authentication.
  // GET https://api.fitbit.com/1/user/[user-id]/activities/date/[date].json

//////
//   GET https://api.fitbit.com/1/user/-/profile.json
// Authorization: Bearer 'TOKEN'
// let config = {
//   headers: {'Authorization': "bearer " + process.env.JeremyTOKEN}
// };
// Axios.get( 
// `https://api.fitbit.com/1/user/${process.env.JeremyUSER_ID}/profile.json`,
// config
// ).then((response) => {
// console.log(response)
// }).catch((error) => {
// console.log(error)
// });
////////

// {nickname: "Jeremy M.", name: "Jeremy M.", picture: "https://static0.fitbit.com/images/profile/defaultProfile_100.png", gender: "MALE", locale: "en-US", …}
// at_hash: "JvtJ08oLPPfjYYp1HEnrkA"
// aud: "CKPWuH9gI2Du4yDMw3LF1QRWtCIeOQXI"
// exp: 1574742601
// gender: "MALE"
// iat: 1574706601
// iss: "https://dev-rh9lpgdj.auth0.com/"
// locale: "en-US"
// name: "Jeremy M."
// nickname: "Jeremy M."
// nonce: "8LB6Xt7dE90rChb0s4YOLICai2s2GvnY"
// picture: "https://static0.fitbit.com/images/profile/defaultProfile_100.png"
// sub: "fitbit|7WTJLB"
// updated_at: "2019-11-25T18:30:00.627Z"
