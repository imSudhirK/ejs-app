require("dotenv").config();
const express = require("express");
// const path = require("path");
const passport = require("passport");
const expressSession = require("express-session");
const routes = require("./routes/index");
require("./config/passport");
const app = express();

const cookieSecret = process.env.EXPRESS_SESSION_SECRET || "5CCBFA8F7538BBBEE";
app.use(
  expressSession({
    secret: cookieSecret,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.use("/public", express.static("public")); // serve public folder
// app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 12000;
app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
