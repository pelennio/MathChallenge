// utility function to toggle visibility of an element
export function toggleVisibility(element, isVisible) {
  element.classList.toggle("hidden", !isVisible);
  element.classList.toggle("visible", isVisible);
}
