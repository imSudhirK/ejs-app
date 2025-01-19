const amadeusService = require("../services/amadeus");
const validation = require("../validations/index");

async function flightSearch(req, res) {
  try {
    res.locals = Object.assign({ title: "Flight Search" }, res.locals);
    return res.render("flight-search");
  } catch (err) {
    console.log("elrek");
  }
}

async function getAirports(req, res) {
  try {
    const keyword = req.query.keyword;
    const resp = await amadeusService.getAirports(keyword);
    if (resp instanceof Error) return res.status(422).send(resp.message);
    return res.status(200).send(resp);
  } catch (err) {
    return res.status(500).send({ error: err });
  }
}

async function getFlights(req, res) {
  try {
    const validateQuery = validation.validateFlightSearchPayload(req.body);
    if (validateQuery.error) {
      return res.status(400).send({ error: validateQuery.error.message });
    }

    const resp = await amadeusService.getFlights(req.body);
    if (resp instanceof Error) return res.status(422).send(resp.message);
    return res.status(200).send(resp);
  } catch (err) {
    return res.status(500).send({ error: err });
  }
}

module.exports = { getAirports, getFlights, flightSearch };
