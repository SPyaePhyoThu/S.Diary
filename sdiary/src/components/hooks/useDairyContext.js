import { DiariesContext } from "../context/DiariesContext";
import { useContext } from "react";

export const useDiariesContext = () => {
  const context = useContext(DiariesContext);

  if (!context) {
    throw Error(
      "useDiariesContext must be used inside an DiariesContextProvider"
    );
  }

  return context;
};
