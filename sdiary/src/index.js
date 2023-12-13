import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DiariesContextProvider } from "../src/components/context/DiariesContext";
import DiaryProvider from "./components/context/DiaryContextProvider";
import { AuthContextProvider } from "./components/context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DiariesContextProvider>
      <AuthContextProvider>
        <DiaryProvider>
          <App />
        </DiaryProvider>
      </AuthContextProvider>
    </DiariesContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
