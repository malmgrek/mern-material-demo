import * as yup from "yup";

export const loginValidation = yup.object().shape({
  email: yup.string().email("Not a valid email").required("Required"),
  password: yup.string().required("Required"),
});

export const registerValidation = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  password2: yup
    .string()
    .required("Field required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
