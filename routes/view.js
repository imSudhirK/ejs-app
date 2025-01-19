const express = require("express");
const { authenticateLogin } = require("../controllers/auth");
const { getNews, getUsers } = require("../controllers/open-source");
const { flightSearch } = require("../controllers/amadeus");

const router = express.Router();

router.get("/", (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/dashboard");
  else return res.redirect("/login");
});

router.get("/dashboard", authenticateLogin, (req, res) => {
  res.locals = Object.assign({ title: "Dashboard" }, res.locals);
  res.render("index");
});
router.get("/news", authenticateLogin, getNews);
router.get("/users", authenticateLogin, getUsers);
router.get("/flights", authenticateLogin, flightSearch);

router.get("/login", (req, res) => {
  res.locals = Object.assign({ title: "Login" }, res.locals);
  res.render("login");
});
router.get("/logout", authenticateLogin, (req, res) => {
  req.logOut((err) => {
    if (err) return next(err);
    else return res.redirect("/login");
  });
});
router.get("/500", (req, res) => {
  res.locals = Object.assign({ title: "Page Not Found" }, res.locals);
  return res.status(500).render("pages/page-500");
});

module.exports = router;
