import classes from "./css/SignUpAndLogIn.module.css";
import Foot from "../components/Foot";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

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
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className={classes.topSection}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/5832/5832519.png"
              alt="DiaryIcon"
              className={classes.img}
            />
            <Link to="/signup">
              <button className={classes.btn}>Sign Up</button>
            </Link>
            <button className={classes.btn} onClick={clickHandler}>
              {isLoading ? "Loading..." : "Demo"}
            </button>
          </div>
          <h1 className={classes.heading}>Memoiria</h1>
          <form onSubmit={submitHandler} className={classes.form}>
            <label htmlFor="email" className={classes.label}>
              Email
              <input
                type="email"
                className={classes.input}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email"
                required
              />
            </label>
            <label htmlFor="password" className={classes.label}>
              Password
              <input
                type="password"
                className={classes.input}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                required
              />
            </label>
            <button onSubmit={submitHandler} className={classes.btnWide}>
              log In
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
        </>
      )}
    </div>
  );
};

export default LogIn;
