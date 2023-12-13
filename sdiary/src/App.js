import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import { useAuthContext } from "./components/hooks/useAuthcontext";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <LogIn /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <SignUp /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
