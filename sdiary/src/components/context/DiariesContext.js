import { createContext, useReducer } from "react";

export const DiariesContext = createContext();

export const DiariesReducer = (state, action) => {
  switch (action.type) {
    case "SET_DIARIES":
      return {
        diaries: action.payload,
      };
    case "CREATE_DIARY":
      return {
        diaries: [action.payload, ...state.diaries],
      };
    case "UPDATE_DIARY":
      return {
        diaries: action.payload,
      };
    case "DELETE_DIARY":
      return {
        diaries: state.diaries.filter(
          (diary) => diary._id !== action.payload._id
        ),
      };
    case "SELECT_DIARY":
      return {
        diaries: state.diaries,
      };

    default:
      return state;
  }
};

export const DiariesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DiariesReducer, {
    diaries: "",
  });

  return (
    <DiariesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DiariesContext.Provider>
  );
};
