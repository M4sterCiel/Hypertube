const User = require("../schemas/User");
const inputService = require("../services/inputServices");
const mailService = require("../services/mailService");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook");

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

/* Facebook Authentication */
passport.use(
  new FacebookStrategy(
    {
      clientID: "424805585055711",
      clientSecret: "fd27b36dfb72e0fa905d427f299228b8",
      callbackURL: "http://localhost:3000/users/auth/facebook/callback",
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
