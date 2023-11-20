import {
  submitMultiplicator,
  checkUserResult,
  generateNextChallenge,
} from "./multiplicatorChecker.js";
import * as myEl from "./components.js";

window.arrayChallenge = [];

myEl.multiplicatorInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    submitMultiplicator();
  }
});
myEl.multiplicatorButton.addEventListener("click", function () {
  submitMultiplicator();
});

//check the answer after clicking the button or clicking the ENter key
myEl.userAnswerInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    checkUserResult();
  }
});
myEl.answerButton.addEventListener("click", function () {
  checkUserResult();
});
myEl.nextProblemButton.addEventListener("click", function () {
  generateNextChallenge();
});
myEl.challenge.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    myEl.userAnswerInput.focus();
  }
});
