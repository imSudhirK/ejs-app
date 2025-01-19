async function googleCallback(req, res) {
  try {
    res.redirect("/dashboard");
  } catch (err) {
    return res.redirect("/login");
  }
}

async function authenticateLogin(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      res.locals = Object.assign(
        { userName: req?.user?.profile?.displayName || "Guest" },
        res.locals,
      );
      return next();
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    return res.redirect("/login");
  }
}

module.exports = { googleCallback, authenticateLogin };
