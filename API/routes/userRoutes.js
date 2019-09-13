const express = require("express");
const authController = require("../controllers/authControllers");
const userController = require("../controllers/userControllers");

exports.router = (() => {
  var userRouter = express.Router();

  /*  userRouter.route("/auth/facebook").get(authController.authFacebook);
  userRouter.route("/auth/github").get(authController.github);
  userRouter.route("/auth/twitter").get(authController.twitter);
  userRouter.route("/register").post(authController.register); */
  userRouter.route("/login").post(userController.login);

  return userRouter;
})();