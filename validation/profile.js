const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  handle = !isEmpty(data.handle) ? data.handle : "";
  status = !isEmpty(data.status) ? data.status : "";
  skills = !isEmpty(data.skills) ? data.skills : "";

  if (!Validator.isLength(handle, { min: 2, max: 40 })) {
    errors.handle = "handle need to be between 2 and 40 characteres";
  }

  if (Validator.isEmpty(handle)) {
    errors.handle = "profile handle is required";
  }

  if (Validator.isEmpty(status)) {
    errors.status = "Status field is required";
  }

  if (Validator.isEmpty(skills)) {
    errors.skills = "Skills field is required";
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid url";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid url";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid url";
    }
  }

  if (!isEmpty(data.fecebook)) {
    if (!Validator.isURL(data.fecebook)) {
      errors.fecebook = "Not a valid url";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid url";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid url";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
