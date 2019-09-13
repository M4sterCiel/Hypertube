const cookieParser = require("cookie-parser");

module.exports = {
  login: async (req, res, next) => {
    console.log(req.body.login);
    /* var user = await UserService.getUser({
      login: req.body.login,
      pwd: req.body.pwd
    });

    if (user.error) return res.status(401).json({ message: user.error });
    else {
      var id = user.userData[0]["id"];
      var username = user.userData[0]["username"];
      return res.status(200).json({
        message: "Success",
        username: username,
        token: jwtUtils.tokenGenerator([id, username])
      });
    } */
    return res.status(200).json({ message: req.body });
  }
};
