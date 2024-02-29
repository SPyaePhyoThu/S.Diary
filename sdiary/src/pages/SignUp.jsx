import classes from "./css/SignUpAndLogIn.module.css";
import Foot from "../components/Foot";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import Loading from "../components/Loading";
import { getDiaryYear, getMonthInNo } from "../util/getDayMonth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { signUp, isLoading, error } = useSignup();
  const { login } = useLogin();

  const today = new Date();
  const currentYear = getDiaryYear(today);
  const currentMonthInNo = getMonthInNo(today);
  const getDatesForCalendar = () => {
    let dayone = new Date(currentYear, currentMonthInNo, 1).getDay();
    let lastdate = new Date(currentYear, currentMonthInNo + 1, 0).getDate();
    let dayend = new Date(currentYear, currentMonthInNo, lastdate).getDay();
    let monthlastdate = new Date(currentYear, currentMonthInNo, 0).getDate();
    let newDates = [];
    for (let i = dayone; i > 0; i--) {
      newDates.push(monthlastdate - i + 1);
    }
    for (let i = 1; i <= lastdate; i++) {
      newDates.push(i);
    }
    for (let i = dayend; i < 6; i++) {
      newDates.push(i - dayend + 1);
    }
    return newDates;
  };

  //handler function.
  const submitHandler = async (e) => {
    e.preventDefault();
    const dates = getDatesForCalendar().map((date) => ({
      date,
      reaction: null,
      currentMonthInNo,
    }));
    await signUp(name, email, password, passwordConfirm, dates);
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
            <Link to="/login">
              <button className={classes.btn}>Log In</button>
            </Link>
            <button className={classes.btn} onClick={clickHandler}>
              Demo
            </button>
          </div>
          <h1 className={classes.headingSignup}>Memoiria</h1>
          <form onSubmit={submitHandler} className={classes.form}>
            <label htmlFor="text" className={classes.label}>
              FullName
              <input
                type="text"
                className={classes.inputSignup}
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </label>
            <label htmlFor="email" className={classes.label}>
              Email
              <input
                type="email"
                className={classes.inputSignup}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </label>
            <label htmlFor="password" className={classes.label}>
              Password
              <input
                type="password"
                className={classes.inputSignup}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </label>
            <label htmlFor="passwordConfirm" className={classes.label}>
              Password Confirm
              <input
                type="password"
                className={classes.inputSignup}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                value={passwordConfirm}
                required
              />
            </label>
            <button onSubmit={submitHandler} className={classes.btnWideSignup}>
              Sign Up
            </button>
            {error && <div className={classes.error}>{error}</div>}
          </form>
          <Foot />
        </>
      )}
    </div>
  );
};

export default SignUp;
