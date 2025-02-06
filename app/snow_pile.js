const snowContainer = document.querySelector(".snow-container");
const snowPile = document.querySelector(".snow-pile");

// Set maximum pile height (25% of the screen height)
const maxPileHeight = window.innerHeight / 4;
let pileHeight = 0;

// Snowflake creation interval
const snowflakeInterval = 100; // Frequency of snowflakes
const maxSnowflakes = 100; // Maximum number of snowflakes at a time

// Create snowflakes
function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake1");
  snowflake.textContent = "❄";

  // Randomize snowflake size and position
  const size = Math.random() * 10 + 10; // Random size between 10px and 20px
  snowflake.style.fontSize = `${size}px`;
  snowflake.style.left = Math.random() * 100 + "vw"; // Random horizontal position

  // Randomize fall speed
  const duration = Math.random() * 5 + 5; // Snowflakes will fall for 5s to 10s
  snowflake.style.animationDuration = `${duration}s`;

  snowContainer.appendChild(snowflake);

  // Remove snowflake after it falls
  setTimeout(() => {
    snowflake.remove();
  }, duration * 1000);
}

// Snowfall interval
setInterval(createSnowflake, snowflakeInterval);
