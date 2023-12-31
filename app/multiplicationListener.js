import {
  submitMultiplicator,
  checkUserResult,
  generateNextChallenge,
} from "./multiplicatorChecker.js";
import * as myEl from "./components.js";

myEl.multiplicatorInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    submitMultiplicator();
  }
});
myEl.multiplicatorButton.addEventListener("click", function () {
  submitMultiplicator();
});

myEl.userAnswerInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    checkUserResult();
    myEl.nextProblemButton.focus();
  }
});
myEl.answerButton.addEventListener("click", function () {
  checkUserResult();
  myEl.userAnswerInput.focus();
});
myEl.nextProblemButton.addEventListener("click", function () {
  generateNextChallenge();
  sleep(300).then(() => {
    console.log("World!");
    myEl.userAnswerInput.focus();
  });
});

var coll = document.getElementsByClassName("collapsible");
let i;

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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
