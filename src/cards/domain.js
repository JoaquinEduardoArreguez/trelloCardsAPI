"use strict";

const { validateInput } = require("./helpers/inputValidator");
const { createCard } = require("./service");

const {
  getRandomNumber,
  getRandomWord,
  getRandomBoardMember,
} = require("./helpers/randomValues");

// Issue mapping strategy
const issueMapper = async (payload) => ({
  name: payload.title,
  desc: payload.description,
  idList: process.env.NAN_TODO_LIST_ID,
});

// Bug mapping strategy
const bugMapper = async (payload) => {
  const idMembers = await getRandomBoardMember(process.env.NAN_BOARD_ID);
  return {
    name: `bug-${getRandomWord()}-${getRandomNumber()}`,
    desc: payload.description,
    idLabels: process.env.NAN_BUG_LABEL_ID,
    idList: process.env.NAN_TODO_LIST_ID,
    idMembers,
  };
};

// Task mapping strategy
const labelsMapper = {
  Maintenance: process.env.NAN_MAINTENANCE_LABEL_ID,
  Test: process.env.NAN_TEST_LABEL_ID,
  Research: process.env.NAN_RESEARCH_LABEL_ID,
};

const taskMapper = async (payload) => ({
  name: payload.title,
  idLabels: labelsMapper[payload.category],
  idList: process.env.NAN_TODO_LIST_ID,
});

// Strategies index
const strategies = {
  issue: issueMapper,
  bug: bugMapper,
  task: taskMapper,
};

async function createCardDomain(payload) {
  validateInput(payload);
  const mappedPayload = await strategies[payload.type](payload);
  const response = await createCard(mappedPayload);
  return { status: response.status, message: response.message };
}

module.exports = { createCardDomain };
