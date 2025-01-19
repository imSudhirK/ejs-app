const express = require("express");
const { authenticateLogin } = require("../controllers/auth");
const { getUsersApi } = require("../controllers/open-source");
const { getAirports, getFlights } = require("../controllers/amadeus");

const router = express.Router();

router.get("/get-users-list", authenticateLogin, getUsersApi);
router.get("/get-airports", authenticateLogin, getAirports);
router.post("/get-flights", authenticateLogin, getFlights);

module.exports = router;
