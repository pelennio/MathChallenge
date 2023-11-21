import * as myEl from "./components.js";
import { createParticle } from "./firework.js";

let multiplicatorCheckResult = "";
let multiplicatorValue = "";
let arrayChallenge = [];
let testResults = [];

let score = Number(localStorage.getItem("score"))
  ? Number(localStorage.getItem("score"))
  : 133;

// let re1 = new RegExp("division");

let score1 = JSON.stringify(localStorage);

let wrongAnswerCount = 0;
let multiplier;
let hidden = false;
let rect = myEl.answerButton.getBoundingClientRect();
window.PARTICLES_NUMBER = 30;

export function submitDivider() {
  multiplicatorValue = Number(myEl.multiplicatorInput.value);
  if (validateMultiplicatorInput(multiplicatorValue)) {
    myEl.multiplicatorCheckResultLine.textContent = multiplicatorCheckResult;
  } else {
    return;
  }
  if (validateMultiplicatorInput2(multiplicatorValue)) {
  } else {
    return;
  }
  testResults = [];
  resetStats();
  tableConstructor(testResults);
  arrayChallenge = setNewArrayChallenge(multiplicatorValue);
  setNewMultiplier(multiplicatorValue);
  myEl.userAnswerInput.focus();
}

export function checkUserResult() {
  const answerValue = Number(myEl.userAnswerInput.value);
  const number1 = multiplicatorValue;
  myEl.answerCheckResultLine.textContent = checkTheAnswer(answerValue, number1)
    ? "🎉🎉🎉 It is a correct answer"
    : "It is not a correct answer";
  tableConstructor(testResults);
  testScores();
  myEl.scoreElement.textContent = `Current challenge score : ${score}`;
  myEl.wrongAnswerCountElement.textContent = `Wrong_Answers : ${wrongAnswerCount}`;
  action(myEl.answerButton, myEl.nextProblemButton);
}

export function generateNextChallenge() {
  const answerValue = myEl.userAnswerInput.value;
  if (answerValue == "") {
    myEl.answerCheckResultLine.textContent =
      "Did you forget to answer on the current question?";
  } else {
    try {
      setNewMultiplier(multiplicatorValue);
    } catch (e) {
      return;
    }
    myEl.answerCheckResultLine.textContent = "";
  }
  action(myEl.answerButton, myEl.nextProblemButton);
}

function validateMultiplicatorInput(numberValue) {
  if (numberValue <= 10 && numberValue >= 0) {
    myEl.nextProblemButton.style.backgroundColor = "blue";
    myEl.nextProblemButton.style.display = "none";
    myEl.answerButton.style.display = "inline";
    multiplicatorCheckResult = "Let's check the division for " + numberValue;
    return true;
  } else if (
    numberValue === "" ||
    numberValue === null ||
    numberValue === "undefined"
  ) {
    myEl.multiplicatorInput.value = "";
    myEl.multiplicatorInput.focus;
    multiplicatorCheckResult = "⚠️ type some number";
    return false;
  } else if (numberValue > 11) {
    return (multiplicatorCheckResult = "Make sure your number is less than 11");
  } else {
    myEl.multiplicatorInput.value = "";
    myEl.multiplicatorInput.focus;
    multiplicatorCheckResult = "⚠️ type some number";
    return false;
  }
}
function validateMultiplicatorInput2(numberValue) {
  if (
    numberValue === "" ||
    numberValue === null ||
    numberValue === "undefined"
  ) {
    return false;
  } else if (numberValue > 11) {
    return false;
  } else {
    return true;
  }
}

Array.prototype.random = function () {
  const el = this[Math.floor(Math.random() * this.length)];
  console.log("Current multiplicator " + el);
  if (el === undefined) {
    window.alert("Well done - you did it ❤️ \nStart your new challenge");
    myEl.answerCheckResultLine.textContent = "👍👍👍";
    myEl.multiplicatorCheckResultLine.textContent = "";
    resetStats();
    throw new TypeError("No more elements in array.");
  } else {
    return el;
  }
};

function setNewMultiplier(multiplicatorValue) {
  multiplier = arrayChallenge.random();
  challenge.textContent = multiplier + "/" + multiplicatorValue + "=";
  myEl.userAnswerInput.value = "";
  return multiplier;
}

function tableConstructor(testResults) {
  let placeholder = document.querySelector("#data-output");
  let out = "";
  for (let element of testResults) {
    out += `
           <tr>
              <td>${element.number2}</td>
              <td>${element.number1}</td>
              <td>${element.answer}</td>
           </tr>
        `;
  }
  placeholder.innerHTML = out;
}

function testScores() {
  let placeholder = document.querySelector("#data-output1");
  // console.log("localStorage.length " + localStorage.length);
  let exp = /division/;
  let out = "";
  for (var a in localStorage) {
    if (exp.test(a)) {
      out += `
           <tr>
              <td>${a}</td>
              <td>${localStorage[a]}</td>
           </tr>
        `;
    }
    placeholder.innerHTML = out;
  }
}

function checkTheAnswer(answerValue, number1) {
  rect = myEl.answerButton.getBoundingClientRect();
  let newTestResult = {
    number1: number1,
    number2: multiplier,
    answer: answerValue,
  };
  if (answerValue === multiplier / number1) {
    testResults.push(newTestResult);
    score++;
    updateScore();
    const index = arrayChallenge.indexOf(multiplier);
    if (index > -1) {
      arrayChallenge.splice(index, 1);
    }
    for (let i = 0; i < window.PARTICLES_NUMBER; i++) {
      createParticle(rect.left, rect.top, true);
    }
    console.log("tadaaaa");
    return true;
  } else if (answerValue === "") {
    console.log("empty");
    return (myEl.answerCheckResultLine.textContent =
      "Did you forget to answer on the current question? oo");
  } else {
    wrongAnswerCount++;
    score--;
    updateScore();
    for (let i = 0; i < window.PARTICLES_NUMBER; i++) {
      createParticle(rect.left, rect.top, false);
    }
    if (wrongAnswerCount == 1) {
      heart1.src = "../src/grey_heart.png";
    } else if (wrongAnswerCount == 2) {
      heart2.src = "../src/grey_heart.png";
    } else if (wrongAnswerCount == 3) {
      heart3.src = "../src/grey_heart.png";
      window.alert("HEHE  - you need to practice more ❤️ \nStart again");
      resetStats();
      myEl.answerCheckResultLine.textContent = "👎👎👎";
      throw new TypeError("Epic fail.");
    }
    return false;
  }
}

function updateScore() {
  localStorage.setItem(`division score: ${multiplicatorValue}`, String(score));
}

function action(button1, button2) {
  hidden = !hidden;
  if (hidden) {
    button1.style.display = "none";
    button2.style.display = "inline";
  } else {
    button1.style.display = "inline";
    button2.style.display = "none";
  }
}

function resetStats() {
  // localStorage.setItem("score", String("0"));
  score = 0;
  myEl.userAnswerInput.value = "";
  myEl.challenge.textContent = "";
  wrongAnswerCount = 0;
  myEl.wrongAnswerCountElement.textContent = `Wrong_Answers : ${wrongAnswerCount}`;
  myEl.multiplicatorInput.value = "";
  myEl.scoreElement.textContent = `Curent score : ${score}`;
  myEl.heart1.src = "../src/red_heart.gif";
  myEl.heart2.src = "../src/red_heart.gif";
  myEl.heart3.src = "../src/red_heart.gif";
  arrayChallenge = setNewArrayChallenge();
  hidden = false;
}

function setNewArrayChallenge(divider = 1) {
  let div = divider;
  let arrayChallenge = [];
  for (let i = 0; i < 1; i++) {
    for (let i = 0; i < 10; i++) {
      arrayChallenge.push(i * div);
    }
  }
  console.log("ArrayChallenge: " + arrayChallenge);
  return arrayChallenge;
}
