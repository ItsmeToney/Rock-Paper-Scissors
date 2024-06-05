const rulesBtn = document.querySelector(".btn__rules");
const closeBtn = document.querySelector(".btn__close");
const rules = document.querySelector(".rules");
const gameContainer = document.querySelector(".container");
const choices = document.querySelectorAll(".choice");
const playAgainBtn = document.querySelector(".new__game");

const player = document.querySelector(".player");
const computer = document.querySelector(".computer");

const choosingSection = document.querySelector(".section__choosing");
const playingSection = document.querySelector(".section__playing");

const score = document.querySelector(".score");
const resultMsg = document.querySelector(".result__label");

const result = document.querySelector(".result");

const overlay = document.querySelector(".overlay");

let playerName;
let computerName;
let currentScore = 0;

const playerChoice = function (className) {
  const html = `<div class="player__choice ${className}">
    <button class="btn__${className}">
      <img class="${className}__img" src="./images/icon-${className}.svg" alt="" />
    </button>
  </div>`;

  player.insertAdjacentHTML("afterbegin", html);
};

const computerChoice = function () {
  const choice = Math.floor(Math.random() * 3) + 1;
  if (choice === 1) computerName = "paper";
  else if (choice === 2) computerName = "scissors";
  else computerName = "rock";

  const html = `<div class="computer__choice ${computerName}">
  <button class="btn__${computerName}">
    <img class="${computerName}__img" src="./images/icon-${computerName}.svg" alt="" />
  </button>
</div>`;
  document.querySelector(".back__card").insertAdjacentHTML("afterbegin", html);
  document
    .querySelector(".computer__card")
    .classList.add("computer__card__flipping");

  setTimeout(checkResult, 2000);
};

const checkResult = function () {
  if (playerName === computerName) resultMsg.textContent = "draw";
  else if (
    (playerName === "rock" && computerName === "scissors") ||
    (playerName === "scissors" && computerName === "paper") ||
    (playerName === "paper" && computerName === "rock")
  ) {
    resultMsg.textContent = "you win";
    currentScore += 2;
    score.textContent = currentScore;
    player.classList.add("player__effect");
  } else {
    resultMsg.textContent = "you lose";
    if (currentScore <= 1) score.textContent = 0;
    else score.textContent = --currentScore;
    computer.classList.add("computer__effect");
    computer.style.opacity = "1";
  }
  result.classList.remove("hidden");
};

rulesBtn.addEventListener("click", function () {
  rules.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

closeBtn.addEventListener("click", function () {
  rules.classList.add("hidden");
  overlay.classList.add("hidden");
});

choosingSection.addEventListener("click", function (e) {
  if (!e.target.closest(".choice")) return;

  choosingSection.classList.add("hidden");
  playingSection.classList.remove("hidden");
  playerName = e.target
    .closest(".choice")
    .getAttribute("class")
    .split(" ")
    .at(1);
  playerChoice(playerName);
  setTimeout(computerChoice, 1000);
});

playAgainBtn.addEventListener("click", function () {
  choosingSection.classList.remove("hidden");
  playingSection.classList.add("hidden");
  result.classList.add("hidden");

  const playerElement = document.querySelector(".player__choice");
  const computerElement = document.querySelector(".computer__choice");
  playerElement.remove();
  computerElement.remove();

  document
    .querySelector(".computer__card")
    .classList.remove("computer__card__flipping");

  player.classList.remove("player__effect");
  computer.classList.remove("computer__effect");
});
