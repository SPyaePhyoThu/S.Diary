import DiaryIcon from "../components/UI/DiaryIcon";
import classes from "./SignUpAndLogIn.module.css";
import Foot from "../components/Foot/Foot";
import { useState } from "react";
import { useSignup } from "../components/hooks/useSignup";
import { Link } from "react-router-dom";
import { useLogin } from "../components/hooks/useLogin";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { signUp, isLoading, error } = useSignup();
  const { login } = useLogin();
  const [date, setDate] = useState(new Date()); // creates a new date object with the current date and time
  const [year, setYear] = useState(date.getFullYear()); // gets the current year
  const [month, setMonth] = useState(date.getMonth());

  const submitHandler = async (e) => {
    e.preventDefault();

    // get the first day of the month
    let dayone = new Date(year, month, 1).getDay();

    // get the last date of the month
    let lastdate = new Date(year, month + 1, 0).getDate();

    // get the day of the last date of the month
    let dayend = new Date(year, month, lastdate).getDay();

    // get the last date of the previous month
    let monthlastdate = new Date(year, month, 0).getDate();

    let dates = []; // variable to store the generated calendar HTML

    // loop to add the last dates of the previous month
    for (let i = dayone; i > 0; i--) {
      dates.push(monthlastdate - i + 1);
    }

    // loop to add the dates of the current month
    for (let i = 1; i <= lastdate; i++) {
      dates.push(i);
    }

    // loop to add the first dates of the next month
    for (let i = dayend; i < 6; i++) {
      dates.push(i - dayend + 1);
    }

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
      <div className={classes.topSection}>
        <DiaryIcon />
        <Link to="/login">
          <button className={classes.btn}>Log In</button>
        </Link>
        <button className={classes.btn} onClick={clickHandler}>
          Demo
        </button>
      </div>
      <h1 className={classes.headingSignup}>S.Diary</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <label htmlFor="text" className={classes.label}>
          FullName
          <input
            type="text"
            className={classes.inputSignup}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label htmlFor="email" className={classes.label}>
          Email
          <input
            type="email"
            className={classes.inputSignup}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label htmlFor="password" className={classes.label}>
          Password
          <input
            type="password"
            className={classes.inputSignup}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <label htmlFor="passwordConfirm" className={classes.label}>
          Password Confirm
          <input
            type="password"
            className={classes.inputSignup}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
          />
        </label>
        <button
          onSubmit={submitHandler}
          disabled={isLoading}
          className={classes.btnWideSignup}
        >
          Sign Up
        </button>
        {error && <div className={classes.error}>{error}</div>}
      </form>
      <Foot />
    </div>
  );
};

export default SignUp;
