import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DiariesContextProvider } from "../src/context/DiariesContext";
import DiaryProvider from "./context/DiaryContextProvider";
import { AuthContextProvider } from "./context/AuthContext";
import { DatesContextProvider } from "./context/DatesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DiaryProvider>
        <DiariesContextProvider>
          <DatesContextProvider>
            <App />
          </DatesContextProvider>
        </DiariesContextProvider>
      </DiaryProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
