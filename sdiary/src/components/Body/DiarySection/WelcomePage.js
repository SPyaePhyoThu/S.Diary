import React, { useContext } from "react";
import Welcome from "../../UI/Welcome";
import classes from "./css/WelcomePage.module.css";
import DiaryContext from "../../context/DiaryContext";
import { useAuthContext } from "../../hooks/useAuthcontext";
const WelcomePage = () => {
  const {
    clickForDiaryOnOff,
    handleClick,
    defaultDiary,
    clickEdit,
    getSelectedDiaryInDiary,
  } = useContext(DiaryContext);
  const { user } = useAuthContext();
  const firstName = user.data.user.name.split(" ")[0];

  const clickHandler = () => {
    const currentDay = `${new Date().getDate()}:${new Date().getMonth()}`;
    const latestCreatedAT = `${new Date(
      defaultDiary ? defaultDiary.createdAt : ""
    ).getDate()}:${new Date(
      defaultDiary ? defaultDiary.createdAt : ""
    ).getMonth()}`;
    if (currentDay === latestCreatedAT) {
      clickEdit(true);
      getSelectedDiaryInDiary(defaultDiary);
    } else {
      handleClick(true);
    }
    clickForDiaryOnOff(true);
  };

  return (
    <div className={classes.welcomePage}>
      <h1 className={classes.heading}>
        Welcome to SDairy , {firstName}.
        <span className={classes.headingSecondary}>
          I hope you have a good time here.
        </span>
      </h1>
      <Welcome className={classes.welcome} />
      <button onClick={clickHandler} className={classes.button}>
        Get Started
      </button>
    </div>
  );
};

export default WelcomePage;
