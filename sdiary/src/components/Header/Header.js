import React, { useContext, useEffect, useState } from "react";
import classes from "./Header.module.css";
import DiaryIcon from "../UI/DiaryIcon";
import DiaryContext from "../context/DiaryContext";
import { useLogOut } from "../hooks/useLogOut";
import { useAuthContext } from "../hooks/useAuthcontext";

const Header = () => {
  const {
    handleClick,
    defaultDiary,
    clickEdit,
    getSelectedDiaryInDiary,
    clickForDiaryOnOff,
    clickForAccSettingOnOff,
    userPhoto,
  } = useContext(DiaryContext);

  const { logOut } = useLogOut();
  const { user } = useAuthContext();

  //handler function
  const clickHandlerToCreate = () => {
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
    clickForAccSettingOnOff(false);
  };

  const clickHandlerForAccSetting = () => {
    if (user.data.user.role === "not user") return;

    clickForAccSettingOnOff(true);
  };

  const logoutHandler = () => {
    logOut();
  };

  return (
    <div className={classes.headerSection}>
      <DiaryIcon className={classes.icon} />
      <h1 className={classes.heading}>S.Diary</h1>
      <div onClick={clickHandlerToCreate} className={classes.createBox}>
        <p className={classes.text}>Create Diary For Today</p>
        <span className={classes.plus}> + </span>
      </div>
      <div className={classes.profileBox}>
        <p onClick={clickHandlerForAccSetting} className={classes.name}>
          {user.data.user.name}
        </p>
        <img src={userPhoto} alt="Profile" className={classes.img} />
        <button onClick={logoutHandler} className={classes.btn}>
          {user.data.user.role === "not user" ? "Go Back" : "Log Out"}
        </button>
      </div>
    </div>
  );
};

export default Header;
