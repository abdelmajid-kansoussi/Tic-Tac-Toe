const squares = document.querySelectorAll(".square");
const layerEl = document.querySelector(".layer");
const playAgainBtn = document.querySelector(".play-again-btn");
const resultEl = document.querySelector(".result");

let turn = "x";
let currentClass = "x";
const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const handleClick = function (event) {
  const square = event.target;
  if (square.classList.contains(X_CLASS)) return;
  if (square.classList.contains(O_CLASS)) return;
  placemark(square);
  if (isWin()) {
    setTimeout(() => {
      layerEl.classList.remove("hidden");
      resultEl.textContent = `${turn} wins`;
    }, 500);
  } else if (isDraw()) {
    setTimeout(() => {
      layerEl.classList.remove("hidden");
      resultEl.textContent = `draw`;
    }, 500);
  } else {
    swapTurns();
  }
};

const placemark = function (square) {
  square.classList.add(currentClass);
};

const swapTurns = function () {
  if (turn == "x") {
    turn = "o";
    currentClass = O_CLASS;
  } else {
    turn = "x";
    currentClass = X_CLASS;
  }
};

const isWin = function () {
  return WINNING_COMBINATIONS.some((combination) =>
    combination.every((i) => squares[i].classList.contains(currentClass))
  );
};

const isDraw = function () {
  return [...squares].every(
    (square) =>
      square.classList.contains(X_CLASS) || square.classList.contains(O_CLASS)
  );
};

const init = function () {
  layerEl.classList.add("hidden");
  turn = "x";
  currentClass = X_CLASS;
  squares.forEach((square) => {
    square.classList.remove(X_CLASS);
    square.classList.remove(O_CLASS);
    square.addEventListener("click", handleClick);
  });
};

init();
playAgainBtn.addEventListener("click", init);
