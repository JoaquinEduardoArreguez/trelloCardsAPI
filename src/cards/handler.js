"use strict";

const { createCardDomain } = require("./domain");
const { FaultHandled, ErrorHandled } = require("../util/error");

async function createCardHandler(event) {
  try {
    const payload = JSON.parse(event.body);
    const response = await createCardDomain(payload);
    return {
      statusCode: response.status,
      body: JSON.stringify(response.message),
    };
  } catch (error) {
    if (error instanceof ErrorHandled) {
      return error;
    }
    error = FaultHandled.captureUnhanlded(error, {
      code: "UNHANDLED_FAULT",
      layer: "HANDLER",
    });
    error.publish();
    return error;
  }
}

module.exports = { createCardHandler };
