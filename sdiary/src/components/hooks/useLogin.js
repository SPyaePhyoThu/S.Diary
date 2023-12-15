import { useState } from "react";
import { useAuthContext } from "./useAuthcontext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password, role) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/v1/user/login", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();

      if (role) {
        json.data.user.role = role;
      }

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error.message);
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

  const forgotPassword = async (email) => {
    try {
      const response = await fetch(
        "https://s-diary-backend.vercel.app/api/v1/user/forgotPassword",
        {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        }
      );

      if (!response.ok) {
        const json = await response.json();
        setIsLoading(false);
        setError(json.error.message);
      } else {
        const json = await response.json();
        setError(json.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { login, forgotPassword, isLoading, error };
};
