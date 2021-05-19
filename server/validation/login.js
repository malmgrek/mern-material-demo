const Validator = require("validator");
const empty = require("is-empty");


const validateLoginInput = (data) => {

  let errors = {};

  // Convert empty fields to empty strings so we can use validator function
  data.email = !empty(data.email) ? data.email : "";
  data.password = !empty(data.password) ? data.password: "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required.";
  }

  return { errors, isValid: empty(errors) }

}


module.exports = validateLoginInput;
