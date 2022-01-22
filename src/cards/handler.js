"use strict";

const { createCardDomain } = require("./domain");
const { FaultHandled, ErrorHandled } = require("../util/error");

async function createCardHandler(event) {
  try {
    const payload = JSON.parse(event.body);
    const response = createCardDomain(payload);
    return {
      statusCode: 200,
      body: typeof response === "string" ? response : JSON.stringify(response),
    };
  } catch (error) {
    if (error instanceof ErrorHandled) {
      error.publish();
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
