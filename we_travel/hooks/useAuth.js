import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/connect";

const useAuth = () => {
  const [user, setuser] = useState(null);

  useEffect(() => {
    const check = onAuthStateChanged(auth, (user) => {
      console.log("User Sign in: ", user ? user.email : "No user");
      if (user) {
        setuser(user);
      } else {
        setuser(null);
      }
    });
    return check;
  }, []);

  return { user };
};

export default useAuth;
