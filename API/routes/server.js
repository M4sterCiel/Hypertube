const app = require("express")();
const http = require("http").Server(app);
var session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);
const userRoutes = require("./userRoutes");
const passport = require("passport");
const bodyParser = require("body-parser");
const User = require("../schemas/User");

const mongoose = require("mongoose");

/* Listenning port */
const PORT = 5000;

http.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});

/* Connexion to Database */
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/hypertube_db", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected!");
});

/*  creating store */
var store = new MongoDBStore({
  uri: "mongodb://localhost/hypertube_db",
  collection: "mySessions"
});

/* Middleware */
//app.use(passport.initialize());
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "hyperflix",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true,
    unset: "destroy"
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* Routes for API */
app.use("/users", userRoutes.router);
