const Validator = require("validator");
const empty = require("is-empty");


const validateRegisterInput = (data) => {

  let errors = {};

  // Convert empty fields to empty strings so we can use validator functions
  data.name = !empty(data.name) ? data.name : "";
  data.email = !empty(data.email) ? data.email : "";
  data.password = !empty(data.password) ? data.password : "";
  data.password2 = !empty(data.password2) ? data.password2 : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required.";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid.";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required.";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is required.";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters.";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match."
  }

  return { errors, isValid: empty(errors) }

}


module.exports = validateRegisterInput;
