const User = require("../schemas/User");
const inputService = require("../services/inputServices");
const jwtService = require("../services/jwtService");
const mailService = require("../services/mailService");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const sanitize = require("mongo-sanitize");

const mailPattern = /^([a-zA-Z0-9]+(?:[\.\-\_]?[a-zA-Z0-9]+)*)@([a-zA-Z0-9]+(?:[\.\-\_]?[a-zA-Z0-9]+)*)\.([a-zA-Z]{2,})+$/;

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
          var token = jwtService.tokenGenerator();
          User.findOneAndUpdate({ _id: user._id }, { token: token }, err => {
            if (err)
              return res.json({
                status: "error",
                msg: "Error while logging in."
              });
          });

          const payload = {
            _id: user._id,
            username: user.username,
            language: user.language
          };
          req.session.user = payload;

          req.session.save(err => {
            if (err) throw err;
            return res.json({ status: "success", user: payload, token: token });
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
      username: sanitize(req.body.username),
      firstname: sanitize(req.body.firstname),
      lastname: sanitize(req.body.lastname),
      email: sanitize(req.body.email),
      activationKey: uniqid
    });

    User.register(user, req.body.pwd1, (err, result) => {
      if (err) return res.status(400).json({ error: err.message });
      mailService.sendActivation(user);
      return res.status(200).json({ status: "success" });
    });
  },

  logout: async (req, res, next) => {
    var token = jwtService.parseAuthorization(req.headers.authorization);
    if (jwtService.verifyToken(token)) {
      User.findOneAndUpdate({ token: token }, { token: null }, err => {
        if (err) console.log(err);
      });
      req.logout();
      req.session = null;
      return res.status(200).json({ message: "Loggued out!" });
    }
  },

  getProfile: async (req, res, next) => {
    console.log(req.headers.authorization);
    if (!req.session.user)
      return res.status(401).json({ error: "You are not logged in!" });
    return res.status(200).json({ message: "blabla" });
  },

  getSession: async (req, res, next) => {
    var token = req.headers.authorization;
    token = jwtService.parseAuthorization(token);
    var stillValid = false;
    await User.findOne({ token: token }, (err, user) => {
      if (user) {
        stillValid = true;
      }
    });

    if (jwtService.verifyToken(token) && stillValid) {
      if (typeof req.session.user !== "undefined") {
        User.findOne({ _id: req.session.user._id }, (err, user) => {
          if (user) req.session.user.language = user.language;
          return res.status(200).json(req.session.user);
        });
      } else return res.status(401).json({ error: "No session for user" });
    } else return res.status(401).json({ error: "Invalid token" });
  },

  activateAccount: async (req, res, next) => {
    await User.findOne(
      { username: sanitize(req.body.username) },
      (err, response) => {
        if (response && response.active)
          return res
            .status(200)
            .json({ message: "Account already activated!" });
        if (err) return res.json({ status: "error" });
        if (response === null || response.activationKey !== req.body.key)
          return res.status(400).json({ status: false });
        User.findOneAndUpdate(
          {
            username: sanitize(req.body.username),
            activationKey: sanitize(req.body.key)
          },
          { active: true, activationKey: null },
          err => {
            if (err) {
              console.log(err);
              return res.status(400).json({ status: false });
            }
          }
        );
        return res.status(200).json({ status: true });
      }
    );
  },

  forgotPassword: async (req, res, next) => {
    var data = req.body.login;
    var mailPattern = /^([a-zA-Z0-9]+(?:[\.\-\_]?[a-zA-Z0-9]+)*)@([a-zA-Z0-9]+(?:[\.\-\_]?[a-zA-Z0-9]+)*)\.([a-zA-Z]{2,})+$/;

    if (!mailPattern.test(data)) {
      var result = await User.find({ username: sanitize(data) });
      if (result.length < 1)
        return res.status(400).json({ error: "Invalid username" });
      else {
        var uniqid =
          new Date().getTime() +
          Math.floor(Math.random() * 10000 + 1).toString(16);
        await User.findOneAndUpdate(
          { username: sanitize(data) },
          {
            activationKey: uniqid
          },
          (err, user) => {
            if (err) console.log(err);
            //mailService.sendNewPassword(user);
          }
        );
        mailService.sendNewPassword(result[0], uniqid);
        return res.status(200).json({ message: "You will receive an email!" });
      }
    } else {
      var result = await User.find({ email: sanitize(data) });
      if (result.length < 1)
        return res.status(400).json({ error: "Invalid email" });
      else {
        var uniqid =
          new Date().getTime() +
          Math.floor(Math.random() * 10000 + 1).toString(16);
        await User.findOneAndUpdate(
          { email: sanitize(data) },
          {
            activationKey: uniqid
          },
          (err, user) => {
            if (err) console.log(err);
          }
        );
        mailService.sendNewPassword(result[0], uniqid);
        return res.status(200).json({ message: "You will receive an email!" });
      }
    }
  },

  resetPassword: async (req, res, next) => {
    if ((err = inputService.password(req.body.pwd1).error))
      return res.status(400).json({ error: "password " + err });
    if ((err = inputService.password(req.body.pwd2).error))
      return res.status(400).json({ error: "password " + err });
    if (req.body.pwd1 !== req.body.pwd2)
      return res.status(400).json({ error: "password has to be identical" });

    var result = await User.find({
      username: sanitize(req.body.username),
      activationKey: sanitize(req.body.key)
    });
    if (result.length < 1)
      return res.status(400).json({ error: "Impossible to reset password..." });
    else {
      User.findOneAndUpdate(
        { username: sanitize(req.body.username) },
        {
          activationKey: null
        },
        (err, user) => {
          if (err) console.log(err);
          user.setPassword(req.body.pwd1, () => {
            user.save().catch(err => {
              console.error(err);
            });
            return res.status(200).json({ status: "success" });
          });
        }
      );
    }
  }
};
