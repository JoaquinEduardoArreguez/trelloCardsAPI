"use strict";

const { ErrorHandled } = require("../../util/error");
const { getBoardLists } = require("../service");

async function getBoardListByName(id, name) {
  const { message: lists } = await getBoardLists(id);
  const todoList = lists.find((list) => list.name === name);
  if (todoList) {
    return todoList.id;
  }
  throw new ErrorHandled(`No list named '${name}' in board id '${id}'`, {
    status: 409,
    code: "LIST_NOT_FOUND",
    layer: "DOMAIN",
  });
}

module.exports = { getBoardListByName };
