import { useState } from "react";
import { useAuthContext } from "./useAuthcontext";
import { useDateContext } from "./useDateContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchDate } = useDateContext();

  const signUp = async (name, email, password, passwordConfirm, dates) => {
    setIsLoading(true);
    setError(null);

    if (!email || !name || !password || !passwordConfirm || !dates) {
      setError("Please enter all field");
      return;
    }
    try {
      const response = await fetch(
        // "https://sdiary-backend.onrender.com/api/v1/user/signup",
        "https://s-diary-backend.vercel.app/api/v1/user/signup",
        // "/api/v1/user/signup",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            passwordConfirm,
            dates,
          }),
        }
      );

      if (!response.ok) {
        const json = await response.json();
        setIsLoading(false);
        setError(json.message);
      } else {
        const json = await response.json();
        localStorage.setItem("user", JSON.stringify(json));
        console.log(json);
        dispatch({ type: "LOGIN", payload: json });
        dispatchDate({ type: "SET_DATES", payload: json.data.user.dates });
        setIsLoading(false);
      }
    } catch (error) {
      setError(error);
    }
  };
  return { signUp, isLoading, error };
};
