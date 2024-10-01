import { createParticle } from "./firework.js";
import * as myEl from "./components.js";

let multiplicatorCheckError = "";
let multiplicatorCheckResult = "";
let multiplicatorValue = "";
let arrayChallenge = [];
let testResults = [];

let score = Number(localStorage.getItem("score"))
  ? Number(localStorage.getItem("score"))
  : 133;
let wrongAnswerCount = 0;
let multiplier;
let hidden = false;
let rect = myEl.answerButton.getBoundingClientRect();
window.PARTICLES_NUMBER = 30;

export function submitMultiplicator(expression) {
  multiplicatorCheckResult = "⛄️ I'm waiting on the number";
  const numberValue = myEl.multiplicatorInput.value;
  if (validateMultiplicatorInput(numberValue, expression)) {
    multiplicatorValue = Number(numberValue);
    myEl.multiplicatorCheckResultLine.textContent = multiplicatorCheckResult;
    myEl.multiplicatorCheckErrorLine.textContent = multiplicatorCheckError;
  } else {
    myEl.multiplicatorInput.focus();
    return (myEl.multiplicatorCheckErrorLine.textContent =
      multiplicatorCheckError);
  }
  myEl.multiplicatorInput.style.display = "none";
  myEl.multiplicatorButton.style.display = "none";
  myEl.newMultiplicatorButton.style.display = "inline";
  myEl.multiplicatorLabel.textContent = `Current challenge is for ${numberValue}`;
  testResults = [];
  resetStats();
  tableConstructor(testResults);
  arrayChallenge = setNewArrayChallenge(multiplicatorValue, expression);
  setNewMultiplier(multiplicatorValue, expression);
  myEl.userAnswerInput.focus();
}

function validateMultiplicatorInput(numberValue, expression) {
  if (
    /\s+/.test(numberValue) ||
    numberValue === "" ||
    numberValue === null ||
    numberValue === "undefined" ||
    /\D+/.test(numberValue)
  ) {
    myEl.multiplicatorInput.value = "";
    multiplicatorCheckError = "⚠️ type some number";
    return false;
  } else if (numberValue >= 0 && numberValue <= 20) {
    myEl.nextProblemButton.style.backgroundColor = "blue";
    myEl.nextProblemButton.style.display = "none";

    myEl.answerButton.style.display = "inline";
    multiplicatorCheckError = "👍";
    multiplicatorCheckResult =
      `Let's check the ${expression} for ` + numberValue;
    return true;
  } else if (numberValue > 12) {
    multiplicatorCheckError = "Make sure your number is less or equal to 12";
    myEl.multiplicatorInput.value = "";
    myEl.multiplicatorInput.focus();
    return false;
  }
}

export function newMultiplicator() {
  myEl.multiplicatorInput.style.display = "inline";
  myEl.multiplicatorButton.style.display = "inline";
  myEl.multiplicatorInput.focus();
  myEl.newMultiplicatorButton.style.display = "none";
  myEl.multiplicatorLabel.textContent = `Enter the number to be checked:`;
}

export function checkUserResult(expression) {
  const answerValue = Number(myEl.userAnswerInput.value);
  const number1 = multiplicatorValue;

  if (answerValue == 0) {
    console.log("empty");
    myEl.answerCheckResultLine.textContent =
      "Did you forget to answer on the current question? 😵‍💫";
    return;
  } else {
    myEl.answerCheckResultLine.textContent = checkTheAnswer(
      answerValue,
      number1,
      expression
    )
      ? "🎉🎉🎉 It is a correct answer"
      : "It is not a correct answer";
  }
  tableConstructor(testResults);
  testScores(expression);
  myEl.scoreElement.textContent = `Current challenge score : ${score}`;
  myEl.wrongAnswerCountElement.textContent = `Wrong_Answers : ${wrongAnswerCount}`;
  action(myEl.answerButton, myEl.nextProblemButton);
}

export function generateNextChallenge(expression) {
  const answerValue = myEl.userAnswerInput.value;
  if (answerValue == "") {
    myEl.answerCheckResultLine.textContent =
      "Did you forget to answer on the current question?";
  } else {
    try {
      setNewMultiplier(multiplicatorValue, expression);
    } catch (e) {
      return;
    }
    myEl.answerCheckResultLine.textContent = "";
  }
  action(myEl.answerButton, myEl.nextProblemButton);
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

function setNewMultiplier(multiplicatorValue, expression) {
  multiplier = arrayChallenge.random();
  switch (expression) {
    case "multiplication":
      console.log("setNewMultiplier - multiplication");
      challenge.textContent = multiplicatorValue + "*" + multiplier + "=";
      myEl.userAnswerInput.value = "";
      break;
    case "division":
      console.log("setNewMultiplier - division");
      challenge.textContent = multiplier + "/" + multiplicatorValue + "=";
      break;
    default:
      console.log(`Sorry, we are out of ${expression}.`);
  }
  myEl.userAnswerInput.value = "";

  return multiplier;
}

function tableConstructor(testResults) {
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

function testScores(expression) {
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

function checkTheAnswer(answerValue, number1, expression) {
  let newTestResult = {
    number1: number1,
    number2: multiplier,
    answer: answerValue,
  };
  let expectedAnswer = 0;

  switch (expression) {
    case "multiplication":
      console.log("expression = multiplication");
      expectedAnswer = number1 * multiplier;
      break;
    case "division":
      console.log("setNewMultiplier - division");
      expectedAnswer = multiplier / number1;
      break;
    default:
      console.log(`Sorry, we are out of ${expression}.`);
  }

  ////////////
  if (answerValue === expectedAnswer) {
    testResults.push(newTestResult);
    score++;
    updateScore(expression);
    const index = arrayChallenge.indexOf(multiplier);
    if (index > -1) {
      arrayChallenge.splice(index, 1);
    }
    rect = myEl.answerButton.getBoundingClientRect();
    for (let i = 0; i < window.PARTICLES_NUMBER; i++) {
      createParticle(rect.left, rect.top, true);
    }
    console.log("It is a correct answer");
    return true;
  } else {
    wrongAnswerCount++;
    score--;
    updateScore(expression);
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

function updateScore(expression) {
  localStorage.setItem(
    `${expression} score: ${multiplicatorValue}`,
    String(score)
  );
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
  // arrayChallenge = setNewArrayChallenge(multiplicatorValue, expression);
  hidden = false;
}

function setNewArrayChallenge(multiplicatorValue, expression) {
  let arrayChallenge = [];
  for (let i = 0; i < 1; i++) {
    for (let i = 1; i < 11; i++) {
      switch (expression) {
        case "multiplication":
          arrayChallenge.push(i);
          break;
        case "division":
          arrayChallenge.push(i * multiplicatorValue);
          break;
        default:
          console.log(`Sorry, we are out of ${expression}.`);
      }
    }
  }
  console.log("ArrayChallenge: " + arrayChallenge);
  return arrayChallenge;
}
