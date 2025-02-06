import { PageElements } from "../component.js";

const pageElements = new PageElements();

pageElements.curentChellengeResultTable.onclick = function () {
  pageElements.modal.style.display = "block";
};
pageElements.allChallengeResultTable.onclick = function () {
  pageElements.modal.style.display = "block";
};
pageElements.allChallengeResultTable.onclick = function () {
  pageElements.allScoresModal.style.display = "block";
};
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
