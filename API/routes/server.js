const app = require("express")();
const http = require("http").Server(app);
const userRoutes = require("./userRoutes");
const passport = require("passport");
let bodyParser = require("body-parser");

/* Listenning port */
const PORT = 5000;

http.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});

/* Middleware */
//app.use(passport.initialize());
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use("/users/", userRoutes.router);
