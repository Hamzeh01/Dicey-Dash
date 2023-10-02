"use strict";

const playerElements = document.querySelectorAll(".player");
const totalScoreElements = document.querySelectorAll(".score");
const currentScoreElements = document.querySelectorAll(".current-score");

const btnNew = document.querySelector(".btn--new");
const btnDice = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;
