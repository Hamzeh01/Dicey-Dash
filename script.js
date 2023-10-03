"use strict";

const playerElements = document.querySelectorAll(".player");
const totalScoreElements = document.querySelectorAll(".score");
const currentScoreElements = document.querySelectorAll(".current-score");
const diceElement = document.querySelector(".dice");

const MAX_SCORE = 100;

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let totalScores, currentScore, activePlayer, isPlaying;

const init = () => {
  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  totalScoreElements.forEach((score) => {
    score.textContent = 0;
  });

  currentScoreElements.forEach((score) => {
    score.textContent = 0;
  });

  diceElement.classList.add("hidden");
  playerElements.forEach((player) => {
    player.classList.remove("player--winner");
  });

  playerElements[0].classList.add("player--active");
  playerElements[1].classList.remove("player--active");
};

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  playerElements.forEach((player) => {
    player.classList.toggle("player--active");
  });
};

const rollDice = () => {
  if (isPlaying) {
    const randomDiceNumber = Math.trunc(Math.random() * 6) + 1;
    diceElement.classList.remove("hidden");
    diceElement.src = `img/dice-${randomDiceNumber}.png`;

    if (randomDiceNumber !== 1) {
      currentScore += randomDiceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
};

const holdScore = () => {
  if (isPlaying) {
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    if (totalScores[activePlayer] >= MAX_SCORE) {
      isPlaying = false;
      diceElement.classList.add("hidden");
      playerElements[activePlayer].classList.remove("player--active");
      playerElements[activePlayer].classList.add("player--winner");
    } else {
      switchPlayer();
    }
  }
};

btnRoll.addEventListener("click", rollDice);
btnHold.addEventListener("click", holdScore);
btnNew.addEventListener("click", init);

init();
