import {
  submitDivider,
  checkUserResult,
  generateNextChallenge,
} from "./divisionChecker.js";
import * as myEl from "./components.js";

myEl.multiplicatorInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    submitDivider();
  }
});
myEl.multiplicatorButton.addEventListener("click", function () {
  submitDivider();
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

let exp = "division";
console.log(/division/.test(exp));
