import { createContext, useReducer } from "react";

export const DatesContext = createContext();

export const DatesReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATES":
      return {
        dates: action.payload,
      };
    // case "CREATE_DIARY":
    //   return {
    //     diaries: [action.payload, ...state.diaries],
    //     starredDiaries: state.starredDiaries,
    //   };
    case "UPDATE_DATES":
      return {
        dates: action.payload,
      };
    default:
      return state;
  }
};

export const DatesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DatesReducer, {
    dates: [],
  });

  return (
    <DatesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DatesContext.Provider>
  );
};
