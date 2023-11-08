import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, app } from "./connect";
import { Alert } from "react-native";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

const db = getFirestore(app);

function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const signupEmailPass = (profile) => {
  console.log(`email: ${profile.email}`);
  if (!isEmailValid(profile.email)) {
    const errorMsg = "Please fill a valid email address";
    Alert.alert(errorMsg)
    return;
  }
  try {
    createUserWithEmailAndPassword(auth, profile.email, profile.password).then(
      async (userCredential) => {
        const user = userCredential.user;
        console.log(`User in SignupEmailPass: ${user.uid}`);
        const userDocRef = doc(db, 'Users', user.uid);
        const userData = {
          displayName: profile.fullname,
          email: profile.email,
        };
        await setDoc(userDocRef, userData);
      }
    ).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        Alert.alert('Alert', 'Password should be at least 6 characters');
      } else {
        // Handle other types of errors here
        console.error('Signup error:', errorCode);
      }
    });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
  }
};


export const SigninEmailPass = async (profile) => {
  signInWithEmailAndPassword(auth, profile.email, profile.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("UserID", user.uid);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == "auth/invalid-login-credentials") {
        Alert.alert("Alert", "Incorrect email or password");
      }
    });
};
