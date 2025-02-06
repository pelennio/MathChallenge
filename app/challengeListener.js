import { PageElements } from "./component.js";
import * as helpers from "./helpers/index.js";
import { toggleVisibility } from "./helpers/utility.js";

const pageElements = new PageElements();
function setupListeners(expression) {
  pageElements.multiplicatorInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      helpers.submitMultiplicator(expression);
    }
  });
  pageElements.startNewChallengeButton.addEventListener("click", function () {
    helpers.submitMultiplicator(expression);
  });
  pageElements.newMultiplicatorButton.addEventListener("click", function () {
    helpers.newMultiplicator();
  });
  pageElements.sadMessage.addEventListener("click", function () {
    helpers.toggleVisibility(pageElements.sadMessage, false);
    helpers.newMultiplicator();
    toggleVisibility(pageElements.scoreSector, false);
  });
  pageElements.goodMessage.addEventListener("click", function () {
    toggleVisibility(pageElements.goodMessage, false);
    helpers.newMultiplicator();
    // toggleVisibility(pageElements.scoreSector, false);
  });

  pageElements.userAnswerInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      helpers.checkUserResult(expression);
      pageElements.nextProblemButton.focus();
    }
  });
  pageElements.answerButton.addEventListener("click", function () {
    helpers.checkUserResult(expression);
    pageElements.userAnswerInput.focus();
  });
  pageElements.nextProblemButton.addEventListener("click", function () {
    helpers.generateNextChallenge(expression);
    sleep(300).then(() => {
      pageElements.userAnswerInput.focus();
      pageElements.userAnswerInput.addEventListener("focus", function () {
        // Ensuring keyboard appears on focus
        setTimeout(() => {
          this.setSelectionRange(this.value.length, this.value.length);
        }, 100);
      });

      console.log("nextProblemButton was clicked");
    });
  });
}
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

function onPageLoad() {
  console.log("Page has fully loaded!");
  const scriptTag = document.querySelector("script[data-type]");
  const type = scriptTag ? scriptTag.getAttribute("data-type") : null;
  if (type) {
    setupListeners(type);
    helpers.testScores(type);
  }
}

// Attach event listener to DOMContentLoaded
document.addEventListener("DOMContentLoaded", onPageLoad);
