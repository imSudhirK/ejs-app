require("dotenv").config();
const Amadeus = require("amadeus");

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRECT,
});

async function getAirportsByCity(cityName) {
  return amadeus.referenceData.locations.get({
    keyword: cityName,
    subType: "AIRPORT",
  });
}

async function getFlightsByDateRoute(payload) {
  return amadeus.shopping.flightOffersSearch.get({
    originLocationCode: payload.departureLocation,
    destinationLocationCode: payload.arrivalLocation,
    departureDate: payload.departureDate,
    adults: payload.adults,
    children: payload.children || 0,
    infants: payload.infants || 0,
    travelClass: payload.travelClass,
    currencyCode: "INR",
  });
}

module.exports = { getAirportsByCity, getFlightsByDateRoute };
