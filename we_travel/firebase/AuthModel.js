import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./connect";
import { Alert } from "react-native";

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
  try {
    createUserWithEmailAndPassword(auth, profile.email, profile.password).then(
    );
  } catch (error) {
    unsuccess(error.message);
  }
};

export const SigninEmailPass = async (profile) => {
  signInWithEmailAndPassword(auth, profile.email, profile.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode == "auth/invalid-login-credentials"){
      Alert.alert("Alert", "Incorrect email or password");
    }
  });
}
