import { PageElements } from "../component.js";
const pageElements = new PageElements();
import { toggleVisibility } from "./utility.js";

let hidden = false;
window.multiplier;
let multiplicand; // the new value from arrayChallenge
export function updateScore(expression) {
  localStorage.setItem(
    `${expression} score: ${window.multiplicatorValue}`,
    String(score)
  );
}
// build table with results of all challenges
export function testScores(expression) {
  let placeholder = document.querySelector("#data-output1");
  let exp = new RegExp(expression);
  let number = expression.length + 7;
  let out = "";
  for (var a in localStorage) {
    if (exp.test(a)) {
      out += `
             <tr>
                <td>${a.slice(number)}</td>
                <td>${localStorage[a]}</td>
             </tr>
          `;
    }
    placeholder.innerHTML = out;
  }
}

Array.prototype.random = function () {
  const el = this[Math.floor(Math.random() * this.length)];
  console.log("Current multiplicator " + el);
  if (el === undefined) {
    toggleVisibility(pageElements.goodMessage, true);
    pageElements.goodMessageOkButton.focus();
    // window.alert("Well done - you did it ❤️ \nStart your new challenge");
    pageElements.answerCheckResultLine.textContent = "👍👍👍";
    pageElements.multiplicatorCheckResultLine.textContent = "⛄️";
    resetStats();
    // Adjust UI elements
    toggleVisibility(pageElements.multiplicatorSelection, true);
    toggleVisibility(pageElements.scoreSector, false);
    toggleVisibility(pageElements.resultSector, false);
    pageElements.multiplicatorLabel.textContent = `Set your multiplicator`;
    // pageElements.multiplicatorInput.focus();
  }
  return el;
};

export function tableConstructor(testResults) {
  let placeholder = document.querySelector("#data-output");
  let out = "";
  for (let element of testResults) {
    out += `
               <tr>
                  <td>${element.number1}</td>
                  <td>${element.number2}</td>
                  <td>${element.answer}</td>
               </tr>
            `;
  }
  placeholder.innerHTML = out;
}

export function resetStats() {
  score = 0;
  pageElements.userAnswerInput.value = "";
  pageElements.challengeText.textContent = "";
  wrongAnswerCount = 0;
  pageElements.wrongAnswerCountElement.textContent = `Wrong_Answers : ${wrongAnswerCount}`;
  pageElements.multiplicatorInput.value = "";
  pageElements.scoreElement.textContent = `Curent score : ${score}`;
  pageElements.heart1.src = "../src/red_heart.gif";
  pageElements.heart2.src = "../src/red_heart.gif";
  pageElements.heart3.src = "../src/red_heart.gif";
  hidden = false;
}
