const Joi = require("joi");

function validateFlightSearchPayload(data) {
  const schema = Joi.object({
    departureLocation: Joi.string().required(),
    arrivalLocation: Joi.string().required(),
    departureDate: Joi.string().required(),
    adults: Joi.number().integer().min(1).required(),
    children: Joi.number().integer().min(0).default(0),
    infants: Joi.number().integer().min(0).default(0),
    travelClass: Joi.string()
      .valid("ECONOMY", "PREMIUM_ECONOMY", "BUSINESS", "FIRST")
      .required(),
  });
  return schema.validate(data);
}

module.exports = { validateFlightSearchPayload };
