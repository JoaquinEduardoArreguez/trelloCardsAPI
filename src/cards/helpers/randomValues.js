"use strict";

const { getBoardMembers } = require("../service");

const getRandomItem = (array) =>
  array[Math.floor(Math.random() * array.length)];

const randomWords = ["alfa", "bravo", "charlie", "delta", "echo", "foxtrot"];
const getRandomWord = () => getRandomItem(randomWords);

const getRandomNumber = () => Math.floor(Math.random() * 100);

const getRandomBoardMember = async (boardId) => {
  const { message: members } = await getBoardMembers(boardId);

  const memberIds = members.map((member) => member.id);

  return getRandomItem(memberIds);
};

module.exports = { getRandomNumber, getRandomWord, getRandomBoardMember };
