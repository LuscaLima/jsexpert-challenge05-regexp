const { describe, it } = require("mocha");
const { expect } = require("chai");
const { evaluateRegex, InvalidRegexError } = require("../src/util");

describe("Util", () => {
  it("#evalutateRegex should throw an error using an unsafe regex", () => {
    const unsafeRegex = /^([a-zA-Z0-9]+\s?)+$/;

    expect(() => evaluateRegex(unsafeRegex)).to.throw(
      InvalidRegexError,
      `The ${unsafeRegex} is unsafe`
    );
  });

  it("#evalutateRegex should not throw an error using a safe regex", () => {
    const safeRegex = /^([a-z])$/;

    expect(() => evaluateRegex(safeRegex)).to.not.throw();
    expect(evaluateRegex(safeRegex)).to.be.deep.equal(safeRegex);
  });
});
