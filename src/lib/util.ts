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