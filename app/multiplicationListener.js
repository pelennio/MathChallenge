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

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
