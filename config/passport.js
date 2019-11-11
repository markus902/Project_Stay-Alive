const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../models");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Match user
      db.user
        .findOne({
          where: {
            email: email
          }
        })
        .then(user => {
          if (!user) {
            return done(null, false, {
              message: "That email is not registered"
            });
          }

          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              throw err;
            }
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    db.user.findOne({ where: { id: id } }).then(result => {
      if (result.id) {
        let user = {
          id: result.id,
          name: result.name,
          password: result.password,
          email: result.email
        };
        done(null, user);
      } else {
        done(null, false);
      }
    });

    // db.user.findByID({ where: { id: id } }, function(err, user) {
    //   done(err, user);
    // });
  });
};
