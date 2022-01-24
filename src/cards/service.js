"use strict";

const { ErrorHandled, FaultHandled } = require("../util/error");
const { default: axios } = require("axios");

async function sendRequest(requestParams = {}) {
  let response = {};
  try {
    response = await axios(requestParams);
  } catch (error) {
    if (error.response.status < 500) {
      throw new ErrorHandled(error.response.data, {
        status: 409,
        code: error.response.statusText,
        layer: "TRELLO_SERVICE",
      });
    }
    // Check if Trello's 500 error really looks like this
    throw new FaultHandled("External Trello error", {
      code: error.response.statusText,
      layer: "TRELLO_SERVICE",
    });
  }

  // Structured log to track requests
  // maybe add a logger class
  console.log({
    source: "EXTERNAL_REQUEST",
    method: requestParams.method,
    url: requestParams.baseURL + requestParams.url,
    timestamp: Date.now(),
    response: JSON.stringify({ status: response.status, data: response.data }),
  });

  return { status: response.status, message: response.data };
}

async function createCard(payload) {
  const requestParams = {
    method: "post",
    baseURL: process.env.TRELLO_BASEURL,
    url: process.env.TRELLO_CARDS,
    params: {
      key: process.env.TRELLO_API_KEY,
      token: process.env.TRELLO_API_CLIENT_TOKEN,
      ...payload,
    },
    headers: {
      Accept: "application/json",
    },
  };
  return await sendRequest(requestParams);
}

async function getBoard(id, resource) {
  const requestParams = {
    method: "get",
    baseURL: process.env.TRELLO_BASEURL,
    url: `${process.env.TRELLO_BOARDS}/${id}${resource}`,
    params: {
      key: process.env.TRELLO_API_KEY,
      token: process.env.TRELLO_API_CLIENT_TOKEN,
    },
    headers: {
      Accept: "application/json",
    },
  };
  return await sendRequest(requestParams);
}

const getBoardMembers = async (id) => await getBoard(id, "/members");
const getBoardLists = async (id) => await getBoard(id, "/lists");
const getBoardLabels = async (id) => await getBoard(id, "/labels");

module.exports = {
  createCard,
  getBoard,
  getBoardMembers,
  getBoardLists,
  getBoardLabels,
};
