import * as myEl from "./components.js";
import * as helpers from "./helpers.js";

myEl.multiplicatorInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    helpers.submitMultiplicator();
  }
});
myEl.multiplicatorButton.addEventListener("click", function () {
  helpers.submitMultiplicator();
});
myEl.newMultiplicatorButton.addEventListener("click", function () {
  helpers.newMultiplicator();
});

myEl.userAnswerInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    helpers.checkUserResult();
    myEl.nextProblemButton.focus();
  }
});
myEl.answerButton.addEventListener("click", function () {
  helpers.checkUserResult();
  myEl.userAnswerInput.focus();
});
myEl.nextProblemButton.addEventListener("click", function () {
  helpers.generateNextChallenge();
  sleep(300).then(() => {
    console.log("nextProblemButton was clicked");
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
