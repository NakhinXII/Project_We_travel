import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "./connect";

function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
export const signupEmailPass = (profile, success, unsuccess) => {
  console.log(`email: ${profile.email}`);
  if (!isEmailValid(profile.email)) {
    const errorMsg = "Please fill a valid email address";
    unsuccess(errorMsg);
    return; // Exit early to prevent registration with an invalid email
  }
  createUserWithEmailAndPassword(auth, profile.email, profile.password)
    .then((usercredential) => {})
    .catch((error) => {
      unsuccess(error.message);
    });
};
