import React, { useContext } from "react";
import classes from "./css/Header.module.css";
import DiaryContext from "../context/DiaryContext";
import { useLogOut } from "../hooks/useLogOut";
import { useAuthContext } from "../hooks/useAuthcontext";
import { useDiariesContext } from "../hooks/useDairyContext";
import Setting from "../ui/Setting";
import Back from "../ui/Back";
import Logouticon from "../ui/Logout";

const Header = () => {
  const {
    handleClick,
    clickEdit,
    getSelectedDiaryInDiary,
    clickForDiaryOnOff,
    clickForAccSettingOnOff,
    userPhoto,
  } = useContext(DiaryContext);
  const { logOut } = useLogOut();
  const { user } = useAuthContext();
  const { diaries } = useDiariesContext();

  const currentDay = new Date().getDate();
  const latestCreatedAt = diaries && new Date(diaries[0]?.createdAt).getDate();

  //handler function
  const clickHandlerToCreate = () => {
    if (currentDay === latestCreatedAt) {
      clickEdit(true);
      getSelectedDiaryInDiary(diaries?.[0]);
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
      <div onClick={clickHandlerToCreate} className={classes.createBox}>
        <span className={classes.plus}> + </span>
        <p className={classes.text}>Create Diary</p>
      </div>
      <h1 className={classes.heading}>Memoiria</h1>
      <div className={classes.profileBox}>
        <img src={userPhoto} alt="Profile" className={classes.img} />

        <p className={classes.name}>{user.data.user.name}</p>
        <Setting click={clickHandlerForAccSetting} />
      </div>
      <button onClick={logoutHandler} className={classes.btn}>
        {user.data.user.role === "not user" ? (
          <>
            <span className={classes.buttonText}> Back </span> <Back />
          </>
        ) : (
          <>
            <span className={classes.buttonText}>Log out </span>
            <Logouticon />
          </>
        )}
      </button>
    </div>
  );
};

export default Header;
