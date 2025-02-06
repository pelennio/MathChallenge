export class PageElements {
  constructor() {
    //setup section
    this.multiplicatorSelection = document.getElementById(
      "multiplicatorSelection"
    );
    this.multiplicatorLabel = document.getElementById("challengeTitle");
    this.multiplicatorInput = document.getElementById("multiplicatorInput");
    this.startNewChallengeButton = document.getElementById("startChButton");
    this.allChallengeResultTable = document.getElementById("allChScoreTable");
    this.multiplicatorCheckErrorLine = document.getElementById(
      "multiplicatorCheckError"
    );
    this.allScoresModal = document.getElementById("modal2");
    this.span = document.getElementsByClassName("close");

    this.scoreSector = document.getElementById("scoreSector");
    this.scoreSectionTitle = document.getElementById("chalengeName");
    this.scoreElement = document.getElementById("score");
    this.wrongAnswerCountElement = document.getElementById("wrongAnswerCount");
    this.heart1 = document.getElementById("heart1");
    this.heart2 = document.getElementById("heart2");
    this.heart3 = document.getElementById("heart3");
    this.newMultiplicatorButton = document.getElementById("newMultiplicator");
    this.curentChellengeResultTable = document.getElementById(
      "currentChScoreTable"
    );
    this.modal = document.getElementById("modal1");

    //result section
    this.multiplicatorCheckResultLine = document.getElementById(
      "multiplicatorCheckResult"
    );
    this.challengeText = document.getElementById("challenge");
    this.resultSector = document.getElementById("resultSection");
    this.userAnswerInput = document.getElementById("userAnswer");
    this.answerButton = document.getElementById("checkAnswer");
    this.answerCheckResultLine = document.getElementById("answerCheckResult");
    this.nextProblemButton = document.getElementById("nextProblem");

    //modals
    this.sadMessage = document.getElementById("sadMessage");
    this.sadMessageOkButton = document.getElementById("sadMessageOkButton");
    this.goodMessage = document.getElementById("goodMessage");
    this.goodMessageOkButton = document.getElementById("goodMessageOkButton");
  }
}
