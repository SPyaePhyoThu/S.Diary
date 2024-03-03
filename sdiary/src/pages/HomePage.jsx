// import Calendar from "./Calender";
import Calendar from "../components/Calendar";

import classes from "./css/HomePage.module.css";

import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import DateList from "../components/DateList";
import DiarySection from "../components/DiarySection";
import Quote from "../components/Quote";
import Moments from "../components/Moments";
import Foot from "../components/Foot";
import AccountSetting from "../components/AccountSetting";
import DiaryContext from "../context/DiaryContext";
import { useDiariesContext } from "../hooks/useDairyContext";
import { useAuthContext } from "../hooks/useAuthcontext";
import Loading from "../components/Loading";
import NewCalendar from "../components/NewCalendar";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const { accSettingOn } = useContext(DiaryContext);
  const { dispatch } = useDiariesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    setLoading(true);
    try {
      const fetchDiary = async () => {
        const res = await fetch(
          "https://s-diary-backend.vercel.app/api/v1/diary",
          // "https://sdiary-backend.onrender.com/api/v1/diary",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const json = await res.json();

        if (res.ok) {
          dispatch({ type: "SET_DIARIES", payload: json.data.data });
          setLoading(false);
        }
      };
      if (user) {
        fetchDiary();
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, user]);
  return (
    <>
      {" "}
      {loading ? (
        <Loading />
      ) : (
        <div className={classes.homepage}>
          <div className={classes.frame}>
            <Header />
            <div className={classes.bodySection}>
              <DateList />
              <div className={classes.mainSection}>
                {accSettingOn ? <AccountSetting /> : <DiarySection />}
              </div>
              <div className={classes.leftSection}>
                <NewCalendar />

                <Quote />

                <Moments />
              </div>
            </div>

            <Foot />
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
