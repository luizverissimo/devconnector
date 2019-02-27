const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(text, { min: 10, max: 300 })) {
    errors.text = "Post must be between 10 and 300 characteres";
  }
  if (Validator.isEmpty(text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
