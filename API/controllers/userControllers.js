const User = require("../schemas/User");
const inputService = require("../services/inputServices");
const mailService = require("../services/mailService");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);

module.exports = {
  login: async (req, res, next) => {
    var user = req.body;

    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return res.json({ status: "error", msg: "Error while logging in." });
      }
      if (!user) {
        return res.json({ status: "error", msg: "Invalid username/password." });
      }
      req.logIn(user, err => {
        if (err) {
          console.error(err);
          return res.json({ status: "error", msg: "Error while logging in." });
        }

        if (user.active === true) {
          const payload = {
            _id: user._id,
            username: user.username,
            language: user.language
          };
          req.session.user = payload;

          req.session.save(err => {
            if (err) throw err;
            return res.json({ status: "success", user: payload });
          });
        } else {
          return res.json({
            status: "error",
            msg: "This account is not activated."
          });
        }
      });
    })(req, res, next);
  },

  register: async (req, res, next) => {
    //console.log(req.body);
    //Check inputs
    var err;
    if ((err = inputService.lastname(req.body.lastname).error))
      return res.status(400).json({ error: "lastname " + err });
    if ((err = inputService.firstname(req.body.firstname).error))
      return res.status(400).json({ error: "firstname " + err });
    if ((err = inputService.password(req.body.pwd1).error))
      return res.status(400).json({ error: "password " + err });
    if ((err = inputService.password(req.body.pwd2).error))
      return res.status(400).json({ error: "password " + err });
    if (req.body.pwd1 !== req.body.pwd2)
      return res.status(400).json({ error: "password has to be identical" });

    err = await inputService.username(req.body.username);
    if (err.error)
      return res.status(400).json({ error: "username " + err.error });
    err = await inputService.mail(req.body.email);
    if (err.error) return res.status(400).json({ error: "mail " + err.error });

    var uniqid =
      new Date().getTime() + Math.floor(Math.random() * 10000 + 1).toString(16);

    var user = new User({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      activationKey: uniqid
    });

    User.register(user, req.body.pwd1, (err, result) => {
      if (err) return res.status(400).json({ error: err.message });
      mailService.sendActivation(user);
      return res.status(200).json({ status: "success" });
    });
  },

  logout: async (req, res, next) => {
    req.logout();
    req.session = null;
    res.status(200).json({ message: "Loggued out!" });
  },

  getProfile: async (req, res, next) => {
    if (!req.session.user)
      return res.status(401).json({ error: "You are not logged in!" });
    return res.status(200).json({ message: "blabla" });
  },

  getSession: async (req, res, next) => {
    if (typeof req.session.user !== "undefined") {
      User.findOne({ _id: req.session.user._id }, (err, user) => {
        if (user) req.session.user.language = user.language;
        return res.json(req.session.user);
      });
    } else return res.json({ error: "No session for user" });
  }
};
