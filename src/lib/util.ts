/**
 * Truncates a string if it exceeds the specified maximum length.
 * @param {string} str - The string to truncate.
 * @param {number} maxLength - The maximum length of the truncated string.
 * @returns {string} The truncated string, with an ellipsis appended if it exceeds the maximum length.
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + "...";
  }
  return str;
}

export function updateLinearGradient(
  el: HTMLInputElement,
  firstColor: string,
  secondColor: string
): void {
  el.style.background = `linear-gradient(to right, ${firstColor}, ${firstColor} ${el.value}%, ${secondColor} ${el.value}%)`;
}
