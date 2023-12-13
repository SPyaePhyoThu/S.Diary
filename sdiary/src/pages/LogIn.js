import DiaryIcon from "../components/UI/DiaryIcon";
import classes from "./SignUpAndLogIn.module.css";
import Foot from "../components/Foot/Foot";
import { useState } from "react";
import { useLogin } from "../components/hooks/useLogin";
import { Link } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, forgotPassword, isLoading, error } = useLogin();

  const submitHandler = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const forgotPasswordHandler = async () => {
    forgotPassword(email);
  };

  const clickHandler = async () => {
    await login(
      process.env.REACT_APP_API_EMAIL,
      process.env.REACT_APP_API_PASSWORD,
      "not user"
    );
  };

  return (
    <div className={classes.page}>
      <div className={classes.topSection}>
        <DiaryIcon />
        <Link to="/signup">
          <button className={classes.btn}>Sing Up</button>
        </Link>
        <button className={classes.btn} onClick={clickHandler}>
          Demo
        </button>
      </div>
      <h1 className={classes.heading}>S.Diary</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <label htmlFor="email" className={classes.label}>
          Email
          <input
            type="email"
            className={classes.input}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label htmlFor="password" className={classes.label}>
          Password
          <input
            type="password"
            className={classes.input}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <button
          onSubmit={submitHandler}
          className={classes.btnWide}
          disabled={isLoading}
        >
          Log In
        </button>
        {error && <div className={classes.error}>{error}</div>}
      </form>
      <button
        onClick={forgotPasswordHandler}
        className={classes.forgotPassword}
      >
        Forgot Password?
      </button>
      <Foot />
    </div>
  );
};

export default LogIn;
