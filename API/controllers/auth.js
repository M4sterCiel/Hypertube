const User = require("../schemas/User");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const request = require("request");
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GitHubStrategy = require("passport-github2").Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

const saveToSession = (req, res) => {
  const payload = {
    _id: req.user._id,
    username: req.user.username
  };
  req.session.user = payload;

  req.session.save(err => {
    if (err) throw err;
    res.redirect("/");
  });
};

console.log("ca passe dans auth.js");

/* Facebook Authentication */
passport.use(
  new FacebookStrategy(
    {
      clientID: "424805585055711",
      clientSecret: "fd27b36dfb72e0fa905d427f299228b8",
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: [
        "id",
        "emails",
        "name",
        "picture.type(large)",
        "displayName"
      ]
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne(
        {
          oauthID: profile.id
        },
        (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            var uniqid =
              new Date().getTime() +
              Math.floor(Math.random() * 10000 + 1).toString(16);

            user = new User({
              username: profile._json.name ? profile._json.name : "",
              email: profile._json.email ? profile._json.email : "",
              firstname: profile._json.first_name
                ? profile._json.first_name
                : "",
              lastname: profile._json.last_name ? profile._json.last_name : "",
              img: profile.photos[0] ? profile.photos[0].value : "",
              activationKey: uniqid,
              active: true,
              oauthID: profile.id,
              facebook: profile._json ? profile._json : {}
            });
            user.save(function(err) {
              if (err) console.error(err);
              return done(err, user);
            });
          } else {
            return done(err, user);
          }
        }
      );
    }
  )
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    saveToSession(req, res);
  }
);

// GOOGLE
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "145149806397-ldpgusv17htfi73hooms2louohnfo2j1.apps.googleusercontent.com",
      clientSecret: "U0zfQdwS0S8rpNNCHdpLIJsd",
      callbackURL: "http://localhost:3000/"
    },
    function(token, tokenSecret, profile, done) {
      User.findOne(
        {
          oauthID: profile.id
        },
        function(err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            var uniqid =
              new Date().getTime() +
              Math.floor(Math.random() * 10000 + 1).toString(16);

            user = new User({
              username: profile._json.displayName
                ? profile._json.displayName
                : "",
              email: profile._json.emails[0]
                ? profile._json.emails[0].value
                : "",
              firstname: profile._json.name.givenName
                ? profile._json.name.givenName
                : "",
              lastname: profile._json.name.familyName
                ? profile._json.name.familyName
                : "",
              img: profile.photos[0] ? profile.photos[0].value : "",
              activationKey: randomKey,
              active: true,
              oauthID: profile.id,
              google: profile._json ? profile._json : {}
            });
            user.save(function(err) {
              if (err) console.error(err);
              return done(err, user);
            });
          } else {
            return done(err, user);
          }
        }
      );
    }
  )
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/plus.login",
      "https://www.googleapis.com/auth/plus.profile.emails.read"
    ]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    saveToSession(req, res);
  }
);

module.exports = router;
