// A list of all possible colors
const COLORS_pass = ["#78dfdf", "blue", "green", "yellow", "#2f7f8c", "purple"];
const COLORS_fail = [
  "#FF0000",
  "#A52A2A",
  "#913831",
  "#FF4433",
  "#E97451",
  "#DE3163",
];

export function createParticle(x, y, result) {
  const element = document.createElement("div");
  element.style.width = "30px";

  element.style.height = "15px";
  element.style.border = "2px solid black";
  element.style.boxShadow = "1px";
  element.style.borderBottomLeftRadius = "50%";
  // The elements are in absolute position
  element.style.position = "absolute";
  element.style.top = `${y}px`;
  element.style.left = `${x}px`;

  // We want our cursor to be centered in the square
  element.style.transform = "translate(-50%, -50%)";
  // Get a color randomly
  if (result) {
    element.style.backgroundColor =
      COLORS_pass[Math.floor(Math.random() * COLORS_pass.length)];
  } else {
    element.style.backgroundColor =
      COLORS_fail[Math.floor(Math.random() * COLORS_fail.length)];
  }

  const animation = element.animate(
    [
      {
        // Math.random() - 0.5 returns integer between -0.5 and 0.5
        transform: `translate(${(Math.random() - 0.5) * 500}px, ${
          (Math.random() - 0.5) * 500
        }px) rotate(${Math.random() * 520}deg)`,
        // We want to reduce the opacity until 0
        opacity: 0,
      },
    ],
    1500
  );

  // Remove the particle at the end of animation
  animation.finished.then(() => element.remove());

  document.body.appendChild(element);
}
