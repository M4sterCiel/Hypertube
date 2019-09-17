const express = require("express");
const authController = require("../controllers/authControllers");
const userController = require("../controllers/userControllers");
const passport = require("passport");

exports.router = (() => {
  var userRouter = express.Router();

  /* userRouter.route("/auth/facebook").get(authController.authFacebook);
  userRouter.route("/auth/github").get(authController.github);
  userRouter.route("/auth/twitter").get(authController.twitter); */
  userRouter.route("/register").post(userController.register);
  userRouter.route("/login").post(userController.login);
  userRouter.route("/logout").get(userController.logout);
  userRouter.route("/profile").get(userController.getProfile);
  userRouter.route("/get_session").get(userController.getSession);
  userRouter
    .route("/auth/facebook/callback")
    .get(
      passport.authenticate("facebook", { failureRedirect: "/login" }),
      (req, res) => {
        saveToSession(req, res);
      }
    );
  userRouter.route(
    "/auth/facebook",
    passport.authenticate("facebook", { scope: ["email"] })
  );

  return userRouter;
})();
