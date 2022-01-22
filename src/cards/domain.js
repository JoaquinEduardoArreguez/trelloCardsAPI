"use strict";

const { validateInput } = require("./helpers/inputValidator");

function createCardDomain(payload) {
  validateInput(payload);

  return { message: "Everything allright" };
}

module.exports = { createCardDomain };
