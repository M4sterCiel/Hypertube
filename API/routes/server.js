const app = require("express")();
const http = require("http").Server(app);
var session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);
const userRoutes = require("./userRoutes");
const passport = require("passport");
const bodyParser = require("body-parser");
const User = require("../schemas/User");
const flash = require("connect-flash");

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
mongoose.connect(
  "mongodb+srv://Team:Apkm5VCrxWTRPYxK@cluster0-shqxc.mongodb.net/hypertube_db?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected!");
});

/*  creating store */
var store = new MongoDBStore({
  uri:
    "mongodb+srv://Team:Apkm5VCrxWTRPYxK@cluster0-shqxc.mongodb.net/hypertube_db?retryWrites=true&w=majority",
  collection: "MySessions"
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
    resave: false,
    saveUninitialized: false,
    unset: "destroy"
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* Routes for API */
app.use("/users", userRoutes.router);
app.use("/auth", require("../controllers/auth"));
