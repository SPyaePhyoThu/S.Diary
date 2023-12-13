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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, passwordConfirm, dates }),
      });
      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.message);
      }
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(json));

        dispatch({ type: "LOGIN", payload: json });
        setIsLoading(false);
      }
    } catch (error) {
      setError(error);
    }
  };
  return { signUp, isLoading, error };
};
