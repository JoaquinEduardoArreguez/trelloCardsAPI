"use strict";

const { ErrorHandled } = require("../../util/error");
const Ajv = require("ajv");

const ajv = new Ajv();

const inputSchema = {
  type: "object",
  oneOf: [
    {
      type: "object",
      properties: {
        type: { const: "issue" },
        title: { type: "string" },
        description: { type: "string" },
      },
      required: ["type", "title", "description"],
      additionalProperties: false,
    },
    {
      type: "object",
      properties: {
        type: { const: "bug" },
        description: { type: "string" },
      },
      required: ["type", "description"],
      additionalProperties: false,
    },
    {
      type: "object",
      properties: {
        type: { const: "task" },
        title: { type: "string" },
        category: {
          enum: [
            "yellow",
            "purple",
            "blue",
            "red",
            "green",
            "orange",
            "black",
            "sky",
            "pink",
            "lime",
          ],
        },
      },
      required: ["type", "title", "category"],
      additionalProperties: false,
    },
  ],
};
const inputValidator = ajv.compile(inputSchema);

function validateInput(payload) {
  if (inputValidator(payload)) {
    return true;
  } else {
    throw new ErrorHandled(inputValidator.errors, {
      code: "INPUT_VALIDATION_ERROR",
      layer: "DOMAIN",
    });
  }
}

module.exports = { validateInput };
