// import Calendar from "./Calender";
import Calendar from "../Calendar/Calendar";
import classes from "./HomePage.module.css";

import React, { useContext } from "react";
import Header from "../Header/Header";
import DateList from "../../components/Body/DiarySection/DateList";
import DiarySection from "../Body/DiarySection/DiarySection";
import Quote from "../Calendar/Quote";
import Moments from "../Body/LeftSection/Moment/Moments";
import Foot from "../Foot/Foot";
import AccountSetting from "../Body/DiarySection/AccountSetting";
import DiaryContext from "../context/DiaryContext";
import WelcomePage from "../Body/DiarySection/WelcomePage";

const HomePage = () => {
  const { diaryOn, accSettingOn } = useContext(DiaryContext);
  return (
    <div className={classes.homepage}>
      <Header />
      <div className={classes.bodySection}>
        <DateList />
        <div className={classes.mainSection}>
          {diaryOn === true ? (
            accSettingOn ? (
              <AccountSetting />
            ) : (
              <DiarySection />
            )
          ) : (
            <WelcomePage />
          )}
        </div>
        <div className={classes.leftSection}>
          <Calendar />
          <div className={classes.quote}>
            <Quote />
          </div>
          <Moments />
        </div>
      </div>
      <Foot />
    </div>
  );
};

export default HomePage;
