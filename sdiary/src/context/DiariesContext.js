import { createContext, useReducer } from "react";

export const DiariesContext = createContext();

export const DiariesReducer = (state, action) => {
  switch (action.type) {
    case "SET_DIARIES":
      return {
        diaries: action.payload,
        starredDiaries: action.payload.filter(
          (diary) => diary.selected === true
        ),
      };
    case "CREATE_DIARY":
      return {
        diaries: [action.payload, ...state.diaries],
        starredDiaries: state.starredDiaries,
      };
    case "UPDATE_DIARY":
      return {
        diaries: action.payload,
        starredDiaries: state.starredDiaries,
      };
    case "DELETE_DIARY":
      return {
        diaries: state.diaries.filter((diary) => diary._id !== action.payload),
        starredDiaries: state.starredDiaries,
      };
    case "UNSTAR_DIARIES":
      return {
        diaries: state.diaries,
        starredDiaries: state.starredDiaries.filter(
          (diary) => diary._id !== action.payload
        ),
      };
    case "STAR_DIARIES":
      return {
        diaries: state.diaries,
        starredDiaries: [action.payload, ...state.starredDiaries],
      };
    default:
      return state;
  }
};

export const DiariesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DiariesReducer, {
    diaries: [],
    starredDiaries: [],
  });

  return (
    <DiariesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DiariesContext.Provider>
  );
};
