const express = require("express");
const authController = require("../controllers/auth");
const userController = require("../controllers/userControllers");
const passport = require("passport");

exports.router = (() => {
  var userRouter = express.Router();

  userRouter.route("/register").post(userController.register);
  userRouter.route("/login").post(userController.login);
  userRouter.route("/logout").get(userController.logout);
  userRouter.route("/profile").get(userController.getProfile);
  userRouter.route("/session").get(userController.getSession);

  return userRouter;
})();
