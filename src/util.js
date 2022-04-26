const safeRegex = require("safe-regex");

class InvalidRegexError extends Error {
  constructor(expression) {
    super(`The ${expression} is unsafe`);
    this.name = "InvalidRegexError";
  }
}

function evaluateRegex(regex) {
  const isSafe = safeRegex(regex);

  if (isSafe) return regex;

  throw new InvalidRegexError(regex);
}

module.exports = { evaluateRegex, InvalidRegexError };
