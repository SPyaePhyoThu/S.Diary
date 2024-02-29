import { DatesContext } from "../context/DatesContext";
import { useContext } from "react";

export const useDateContext = () => {
  const context = useContext(DatesContext);

  if (!context) {
    throw Error("useDatesContext must be used inside an DatesContextProvider");
  }

  return context;
};
