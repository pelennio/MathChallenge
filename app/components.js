const multiplicatorButton = document.getElementById("multiplicator");
const newMultiplicatorButton = document.getElementById("newMultiplicator");
const multiplicatorInput = document.getElementById("userinput");
const multiplicatorLabel = document.getElementById("nameLable");
const tryInput = document.getElementById("try");
const userAnswerInput = document.getElementById("userAnswer");
const multiplicatorCheckResultLine = document.getElementById(
  "multiplicatorCheckResult"
);
const multiplicatorCheckErrorLine = document.getElementById(
  "multiplicatorCheckError"
);
const challenge = document.getElementById("challenge");
const answerButton = document.getElementById("checkAnswer");
const nextProblemButton = document.getElementById("nextProblem");
const answerCheckResultLine = document.getElementById("answerCheckResult");
const scoreElement = document.getElementById("score");
const heart1 = document.getElementById("heart1");
const heart2 = document.getElementById("heart2");
const heart3 = document.getElementById("heart3");
const wrongAnswerCountElement = document.getElementById("wrongAnswerCount");
const curentChellengeResultTable = document.getElementById("header1");
const allChallengeResultTable = document.getElementById("header2");

var modal = document.getElementById("modal1");
var allScoresModal = document.getElementById("modal2");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close");

export {
  multiplicatorButton,
  newMultiplicatorButton,
  multiplicatorInput,
  multiplicatorLabel,
  tryInput,
  userAnswerInput,
  multiplicatorCheckResultLine,
  multiplicatorCheckErrorLine,
  challenge,
  answerButton,
  nextProblemButton,
  answerCheckResultLine,
  scoreElement,
  heart1,
  heart2,
  heart3,
  wrongAnswerCountElement,
  curentChellengeResultTable,
  allChallengeResultTable,
  allScoresModal,
  modal,
  span,
};
