import { useAuthContext } from "./useAuthcontext";
import { useDiariesContext } from "./useDairyContext";

export const useLogOut = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: diaryDispatch } = useDiariesContext();

  const logOut = () => {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
    diaryDispatch({ type: "SET_DIARIE", payload: null });
  };

  return { logOut };
};
