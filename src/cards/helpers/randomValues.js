"use strict";

const randomWords = ["alfa", "bravo", "charlie", "delta", "echo", "foxtrot"];

const getRandomWord = () => {
  return randomWords[Math.floor(Math.random() * randomWords.length)];
};

const getRandomNumber = () => Math.floor(Math.random() * 100);

module.exports = { getRandomNumber, getRandomWord };
