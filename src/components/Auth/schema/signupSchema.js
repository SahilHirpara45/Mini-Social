import * as Yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const emailRules = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const nameRules = /^[A-Za-z]{3,}$/i;
export const signupSchema = Yup.object().shape({
  firstName: Yup.string().matches(nameRules, { message: "Please enter a valid name" }).required("First name Required"),
  lastName: Yup.string().matches(nameRules, { message: "Please enter a valid name" }).required("Last name Required"),
  email: Yup.string()
    .email("Invalid Email!")
    .matches(emailRules, { message: "Not valid" })
    .required("Email Required !"),
  password: Yup.string()
    .matches(passwordRules, { message: "Please create a stronger password !" })
    .required("Password Required !"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password") || null], "Passwords must match")
    .required("Confirm-Password Required !"),
});

