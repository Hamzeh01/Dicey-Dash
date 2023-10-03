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

const init = function () {
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

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  playerElements.forEach((player) => {
    player.classList.toggle("player--active");
  });
};

btnRoll.addEventListener("click", () => {
  if (isPlaying) {
    // 1. Generating a random number between 1 and 6 (inclusive)
    const randomDiceNumber = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceElement.classList.remove("hidden");
    diceElement.src = `img/dice-${randomDiceNumber}.png`;
    // 3. Checking for rolled 1
    if (randomDiceNumber !== 1) {
      // Adding dice number to current score
      currentScore += randomDiceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (isPlaying) {
    totalScores[activePlayer] += currentScore;
    console.log(totalScores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];
    if (totalScores[activePlayer] > MAX_SCORE) {
      isPlaying = false;
      diceElement.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
