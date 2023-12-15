import { useState } from "react";
import { useAuthContext } from "./useAuthcontext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signUp = async (name, email, password, passwordConfirm, dates) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/v1/user/signup", {
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
      });

      if (!response.ok) {
        const json = await response.json();
        setIsLoading(false);
        setError(json.message);
      } else {
        const json = await response.json();
        localStorage.setItem("user", JSON.stringify(json));

        dispatch({ type: "LOGIN", payload: json });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { signUp, isLoading, error };
};
