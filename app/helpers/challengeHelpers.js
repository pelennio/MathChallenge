import { PageElements } from "../component.js";
import { toggleVisibility } from "./utility.js";
import {
  testScores,
  updateScore,
  tableConstructor,
  resetStats,
} from "./scoreHelpers.js";
const pageElements = new PageElements();
let testResults = [];
let newFactor;

// Clear user feedback if they forget to provide an answer or if there's an issue with the setup.
// Graceful handling of errors during multiplier generation.
// The game progresses smoothly to the next challenge.
export function generateNextChallenge(expression) {
  const answerValue = pageElements.userAnswerInput.value.trim();
  try {
    // Generate the next multiplier
    console.log(
      "Attempting to set a new multiplier:",
      multiplicatorValue,
      expression
    );
    newFactor = setNewMultiplier(multiplicatorValue, expression);
    console.log("New factor:", newFactor);
  } catch (e) {
    console.log(e);
    return;
  }
  pageElements.answerCheckResultLine.textContent = "";
  toggleVisibility(pageElements.answerButton, true);
  toggleVisibility(pageElements.nextProblemButton, false);
}

export function checkUserResult(expression) {
  const answerValue = Number(pageElements.userAnswerInput.value);
  const number1 = window.multiplicatorValue;

  if (answerValue == 0) {
    console.log("empty");
    pageElements.answerCheckResultLine.textContent =
      "Did you forget to answer on the current question? 😵‍💫";
    return;
  } else {
    console.log("Call for checkTheAnswer", answerValue, number1, expression);
    pageElements.answerCheckResultLine.textContent = checkUserAnswer(
      answerValue,
      number1,
      expression
    )
      ? "🎉🎉🎉 It is a correct answer"
      : "It is not a correct answer";
  }
  tableConstructor(testResults);
  testScores(expression);
  pageElements.scoreElement.textContent = `Score : ${score}`;
  pageElements.wrongAnswerCountElement.textContent = `Wrong_Answers : ${wrongAnswerCount}`;
  toggleVisibility(pageElements.answerButton, false);
  toggleVisibility(pageElements.nextProblemButton, true);
}

// choose new multiplicand from arrayChallenge
export function setNewMultiplier(
  multiplicatorValue,
  expression,
  arrayChallenge
) {
  const multiplicand = window.arrayChallenge.random();
  console.log(
    "SET:",
    multiplicatorValue,
    expression,
    arrayChallenge,
    "new multiplicand:",
    multiplicand
  );
  switch (expression) {
    case "multiplication":
      console.log("setNewMultiplier - multiplication");
      pageElements.challengeText.textContent = `${multiplicatorValue} * ${multiplicand} =`;
      pageElements.userAnswerInput.value = "";
      break;
    case "division":
      console.log("setNewMultiplier - division");
      pageElements.challengeText.textContent = `${multiplicand} / ${multiplicatorValue} =`;
      break;
    default:
      console.log(`Sorry, we are out of ${expression}.`);
  }
  pageElements.userAnswerInput.value = "";
  window.multiplier = multiplicand;
  return multiplicand;
}

// check the user given answer is correct or not
function checkUserAnswer(answerValue, number1, expression) {
  console.log(window.multiplier, "newFactor");
  let newTestResult = {
    number1: number1,
    number2: window.multiplier,
    answer: answerValue,
  };
  let expectedAnswer = 0;

  switch (expression) {
    case "multiplication":
      console.log("expression = multiplication");
      expectedAnswer = number1 * window.multiplier;
      break;
    case "division":
      console.log("setNewMultiplier - division");
      expectedAnswer = window.multiplier / number1;
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
    console.log("It is a correct answer");
    return true;
  } else {
    wrongAnswerCount++;
    score--;
    updateScore(expression);

    if (wrongAnswerCount == 1) {
      heart1.src = "../src/grey_heart.png";
    } else if (wrongAnswerCount == 2) {
      heart2.src = "../src/grey_heart.png";
    } else if (wrongAnswerCount == 3) {
      heart3.src = "../src/grey_heart.png";
      toggleVisibility(pageElements.resultSector, false);
      toggleVisibility(pageElements.sadMessage, true);
      pageElements.sadMessageOkButton.focus();
      // window.alert("HEHE  - you need to practice more ❤️ \nStart again");
      resetStats();

      pageElements.answerCheckResultLine.textContent = "👎👎👎";
      console.log("😵‍💫 Epic fail.");
    }
    return false;
  }
}
