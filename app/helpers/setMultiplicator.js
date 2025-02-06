import { PageElements } from "../component.js";
import { toggleVisibility } from "./utility.js";
import { tableConstructor } from "./scoreHelpers.js";
import { setNewMultiplier } from "./challengeHelpers.js";
const pageElements = new PageElements();
let testResults = [];
let multiplicatorCheckResult = "";
let scoreSectionTitle = "";
let multiplicatorCheckError = "";

//submit multiplicator value, check it
export function submitMultiplicator(expression) {
  multiplicatorCheckResult = "⛄️ I'm waiting on the number";
  // Get and validate the input value
  const multiplicatorValue = Number(pageElements.multiplicatorInput.value);
  if (validateMultiplicatorInput(multiplicatorValue, expression)) {
    pageElements.multiplicatorCheckResultLine.textContent =
      multiplicatorCheckResult;
    pageElements.multiplicatorCheckErrorLine.textContent =
      multiplicatorCheckError;
    pageElements.scoreSectionTitle.textContent = scoreSectionTitle;
    window.multiplicatorValue = multiplicatorValue;
  } else {
    pageElements.multiplicatorInput.focus();
    pageElements.multiplicatorCheckErrorLine.textContent =
      multiplicatorCheckError;
    return;
  }
  // Adjust UI elements
  toggleVisibility(pageElements.multiplicatorSelection, false);
  toggleVisibility(pageElements.scoreSector, true);
  toggleVisibility(pageElements.resultSector, true);

  // Update label
  pageElements.multiplicatorLabel.textContent = `Current challenge is for ${multiplicatorValue}`;
  testResults = [];
  resetStats();
  tableConstructor(testResults);
  // Set up new challenge and multiplier
  window.arrayChallenge = setNewArrayChallenge(multiplicatorValue, expression);
  setNewMultiplier(multiplicatorValue, expression, arrayChallenge);
  // Focus on user input
  pageElements.userAnswerInput.focus();
  pageElements.userAnswerInput.addEventListener("focus", function () {
    // Ensuring keyboard appears on focus
    setTimeout(() => {
      this.setSelectionRange(this.value.length, this.value.length);
    }, 100);
  });
}

//validate multiplicator input
function validateMultiplicatorInput(numberValue, expression) {
  if (
    /\s+/.test(numberValue) || // Contains whitespace
    isNaN(numberValue) || // Not a number
    !numberValue || // Empty, null, or undefined
    /\D+/.test(numberValue) // Contains non-digit characters
  ) {
    pageElements.multiplicatorInput.value = "";
    multiplicatorCheckError = "⚠️ Please type a valid number.";
    return false;
  }
  // Check if the number is within valid range
  if (numberValue >= 0 && numberValue <= 20) {
    // Valid number handling
    pageElements.nextProblemButton.style.backgroundColor = "blue";
    multiplicatorCheckError = "👍";
    scoreSectionTitle = `Current challenge: ${expression} for ${numberValue}`;
    multiplicatorCheckResult = "";
    // `Let's check the ${expression} for ` + numberValue;
    return true;
  } else if (numberValue > 20) {
    multiplicatorCheckError = "⚠️ Number must be between 0 and 20.";
    pageElements.multiplicatorInput.value = "";
    pageElements.multiplicatorInput.focus();
    return false;
  }
}

export function newMultiplicator() {
  toggleVisibility(pageElements.multiplicatorSelection, true);
  toggleVisibility(pageElements.scoreSector, false);
  pageElements.multiplicatorInput.focus();
  pageElements.multiplicatorLabel.textContent = `Enter the number to be checked:`;
}

// utility function to reset all data
function resetStats() {
  score = 0;
  wrongAnswerCount = 0;
  pageElements.userAnswerInput.value = "";
  pageElements.challengeText.textContent = "";
  pageElements.wrongAnswerCountElement.textContent = `Wrong_Answers : ${wrongAnswerCount}`;
  pageElements.multiplicatorInput.value = "";
  pageElements.scoreElement.textContent = `Score : ${score}`;
  pageElements.heart1.src = "../src/red_heart.gif";
  pageElements.heart2.src = "../src/red_heart.gif";
  pageElements.heart3.src = "../src/red_heart.gif";
}

//set up new clean array with multiplier (10)
function setNewArrayChallenge(multiplicatorValue, expression) {
  // Initialize a new array to avoid modifying global state
  const newArrayChallenge = [];
  // Generate the challenge array
  const mathExpression =
    expression === "multiplication" ? 1 : multiplicatorValue;
  for (let i = 1; i <= 10; i++) {
    newArrayChallenge.push(i * mathExpression);
  }
  console.log("ArrayChallenge:", newArrayChallenge);
  return newArrayChallenge;
}
