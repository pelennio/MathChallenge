import * as myEl from "./components.js";
import * as helpers from "./helpers.js";

myEl.multiplicatorInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    helpers.submitMultiplicator(expression);
  }
});
myEl.multiplicatorButton.addEventListener("click", function () {
  helpers.submitMultiplicator(expression);
});
myEl.newMultiplicatorButton.addEventListener("click", function () {
  helpers.newMultiplicator();
});

const expression = "multiplication";
myEl.userAnswerInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    helpers.checkUserResult(expression);
    myEl.nextProblemButton.focus();
  }
});
myEl.answerButton.addEventListener("click", function () {
  helpers.checkUserResult(expression);
  myEl.userAnswerInput.focus();
});
myEl.nextProblemButton.addEventListener("click", function () {
  helpers.generateNextChallenge(expression);
  sleep(300).then(() => {
    console.log("nextProblemButton was clicked");
    myEl.userAnswerInput.focus();
  });
});

myEl.curentChellengeResultTable.onclick = function () {
  myEl.modal.style.display = "block";
};
myEl.allChallengeResultTable.onclick = function () {
  myEl.modal.style.display = "block";
};
myEl.allChallengeResultTable.onclick = function () {
  myEl.allScoresModal.style.display = "block";
};

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

// Close modal when 'x' is clicked
document.querySelectorAll(".close").forEach((span) => {
  span.addEventListener("click", function () {
    const modalId = this.getAttribute("data-modal");

    // Close the modal associated with the clicked 'x'
    document.getElementById(modalId).style.display = "none";
  });
});

// Close modal when clicking outside the modal content
window.onclick = function (event) {
  // Check if the clicked element has the 'modal' class (i.e., the backdrop)
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
};

function onPageLoad() {
  console.log("Page has fully loaded!");
  helpers.testScores("multiplication");
  // helpers.tableConstructor();
}

// Attach event listener to DOMContentLoaded
document.addEventListener("DOMContentLoaded", onPageLoad);
