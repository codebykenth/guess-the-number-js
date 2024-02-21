"use strict";
let again = document.querySelector(".again");
let answer = document.querySelector(".answer");
let resetBtn = document.querySelector(".reset");
let question = document.querySelector(".question");
let hint = document.querySelector(".hint");
let checkBtn = document.querySelector(".check-answer");
let againBtn = document.querySelector(".again");
let highScoreText = document.querySelector(".high-score");
let currentScoreText = document.querySelector(".current-score");
let userAnswer;

let randomNum = Math.trunc(Math.random() * 20) + 1;
let currentScore = 10;
let highScore = 0;
// again.classList.remove("hidden"); // Will only be displayed when the game ends

const init = function () {
  currentScore = 10;
  randomNum = Math.trunc(Math.random() * 20) + 1;
  question.textContent = "?";

  document.querySelector(".check-answer").style.display = "block";
  document.querySelector(".reset").style.display = "block";
  document.querySelector(".answer").style.background = "white";

  answer.classList.remove("correct-answer");
  document.querySelector(".answer").disabled = false;
  document.querySelector(".again").style.display = "none";
  displayHint("Start guessing...🤔");
  document.querySelector(".hint").style.color = "orangered";
  displayCurrentScore(currentScore);
  answer.value = "";
};

const displayHint = function (message) {
  hint.textContent = message;
};

const winStyle = function () {
  answer.classList.add("correct-answer");
  // If using (.style), you should complete the document.querySelector(''). It not works if you called a variable for it(?)
  document.querySelector(".check-answer").style.display = "none";
  document.querySelector(".hint").style.color = "greenyellow";

  document.querySelector(".reset").style.display = "none";
  document.querySelector(".again").style.display = "block";
  document.querySelector(".answer").disabled = true;
};

const loseStyle = function () {
  answer.classList.add("wrong-answer");
  // If using (.style), you should complete the document.querySelector(''). It not works if you called a variable for it(?)
  document.querySelector(".check-answer").style.display = "none";
  document.querySelector(".hint").style.color = "red";

  document.querySelector(".reset").style.display = "none";
  document.querySelector(".again").style.display = "block";
  document.querySelector(".answer").disabled = true;
};

function displayCurrentScore(score) {
  currentScoreText.textContent = `💯 Current Score: ${score}`;
}

function displayHighScore(score) {
  highScoreText.textContent = `🎉 High Score: ${score}`;
}

const checkAnswer = function () {
  userAnswer = Number(document.querySelector(".answer").value);
  if (currentScore > 1) {
    if (!userAnswer) {
      displayHint("❌ Please input a number only.");
    } else if (userAnswer < 0 || userAnswer > 20) {
      displayHint("🚫 Please Input a number between 1 and 20.");
    } else if (userAnswer != randomNum) {
      currentScore--;
      displayCurrentScore(currentScore);
      displayHint(userAnswer > randomNum ? "👆 Too high!" : "👇 Too low!");
    } else {
      winStyle();
      question.textContent = randomNum;
      displayHint("✅You are correct!");
      displayHighScore(
        currentScore > highScore
          ? (highScore = currentScore)
          : (highScore = highScore)
      );
    }
  } else {
    displayHint("💔 Out of lives!");
    displayCurrentScore(0);
    loseStyle();
  }
};

// This function checks whether the user input a correct guess
checkBtn.addEventListener("click", checkAnswer);

// This function remove text  in input field when it is clicked
answer.addEventListener("click", function () {
  answer.value = "";
});

againBtn.addEventListener("click", function () {
  init();
});

resetBtn.addEventListener("click", function () {
  randomNum = Math.trunc(Math.random() * 20) + 1;
  displayHint("Start guessing...🤔");
  answer.value = "";
  currentScore = 10;
  displayCurrentScore(currentScore);
});
