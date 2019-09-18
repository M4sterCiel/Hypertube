const User = require("../schemas/User");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const request = require("request");
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const OAuth2Strategy = require("passport-oauth2").Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

const saveToSession = (req, res, error) => {
  const payload = {
    _id: req.user._id,
    username: req.user.username,
    language: req.user.language ? req.user.language : "en"
  };
  req.session.user = payload;

  req.session.save(err => {
    if (err) throw err;
    res.redirect("http://localhost:3000");
  });
};

// GOOGLE
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "784800871977-tfb75n389g6f7hpvug0hmfrdh1ku8ojn.apps.googleusercontent.com",
      clientSecret: "6rBvGJbcjXGOZku2VTkI8Bxv",
      callbackURL: "http://localhost:5000/auth/google/callback"
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
              username: profile.displayName ? profile.displayName : "",
              email: profile.emails[0] ? profile.emails[0].value : "",
              language: profile._json.locale,
              firstname: profile.name.givenName ? profile.name.givenName : "",
              lastname: profile.name.familyName ? profile.name.familyName : "",
              img: profile.photos[0] ? profile.photos[0].value : "",
              activationKey: uniqid,
              active: true,
              oauthID: profile.id,
              google: profile._json ? profile._json : {}
            });
            user.save(function(err) {
              if (err) return done(null, false, { error: err.message });
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
    scope: ["profile", "email"]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login"
  }),
  function(req, res) {
    saveToSession(req, res);
  }
);

/* Github */
passport.use(
  new GitHubStrategy(
    {
      clientID: "Iv1.f91bdcfcdaa00d0c",
      clientSecret: "a34a7b9b40f5783c93967bf37b75f7c8e6535a2e",
      callbackURL: "http://localhost:5000/auth/github/callback",
      scope: ["user:email"]
    },
    function(accessToken, refreshToken, profile, done) {
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
              username: profile._json.login ? profile._json.login : "",
              email: profile.emails[0] ? profile.emails[0].value : "",
              firstname: "",
              lastname: "",
              img: profile._json.avatar_url ? profile._json.avatar_url : "",
              activationKey: uniqid,
              active: true,
              oauthID: profile.id,
              github: profile._json ? profile._json : ""
            });
            user.save(function(err) {
              if (err) return done(null, false, { error: err.message });
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

router.get("/github", passport.authenticate("github", { scope: ["user"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:3000/login"
  }),
  function(req, res) {
    saveToSession(req, res);
  }
);

/* 42 */
passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: "https://api.intra.42.fr/oauth/authorize",
      tokenURL: "https://api.intra.42.fr/oauth/token",
      clientID:
        "15e07f11520784e1d3f6e9397efef6afbd830e5ad62158d6ebefdc49d00de9d9",
      clientSecret:
        "aee3c426ee11d8ba5b45355615aafaa5c0f112131eccfa134c68a3d16c0e7cc6",
      callbackURL: "http://localhost:5000/auth/42/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      var options = {
        url: "https://api.intra.42.fr/v2/me",
        headers: {
          Authorization: "Bearer " + accessToken
        }
      };

      request(options, function(error, response, profile) {
        if (!error && response.statusCode == 200) {
          profile = JSON.parse(profile);

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
                  username: profile.login ? profile.login : "",
                  email: profile.email ? profile.email : "",
                  firstname: profile.first_name ? profile.first_name : "",
                  lastname: profile.last_name ? profile.last_name : "",
                  img: profile.image_url ? profile.image_url : "",
                  activationKey: uniqid,
                  active: true,
                  oauthID: profile.id,
                  42: profile ? profile : {}
                });
                user.save(function(err) {
                  if (err) return done(null, false, { error: err.message });
                  return done(err, user);
                });
              } else {
                return done(err, user);
              }
            }
          );
        }
      });
    }
  )
);

router.get("/42", passport.authenticate("oauth2"));

router.get(
  "/42/callback",
  passport.authenticate("oauth2", {
    failureRedirect: "http://localhost:3000/login?error=already"
  }),
  function(req, res, error) {
    saveToSession(req, res);
  }
);
module.exports = router;
