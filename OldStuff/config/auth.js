module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash("error_msg", "Please log in to view this resource");
      res.redirect("/users/login");
    }
  };
  

  // Auth0 testing
  var auth0 = new auth0.WebAuth({
    domain: '{YOUR_AUTH0_DOMAIN}',
    clientID: '{YOUR_AUTH0_CLIENT_ID}',
    // Response type for all authentication requests. 
    // It can be any space separated list of the values code, token, id_token. 
    // If you don't provide a global responseType, you will have to provide a responseType for each method that you use.
    responseType: '{OPTIONAL, string}'
  });