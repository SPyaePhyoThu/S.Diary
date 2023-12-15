import React, { useContext, useState, useEffect } from "react";
import classes from "./Moment.module.css";
import Star from "../../../UI/Star";
import DiaryContext from "../../../context/DiaryContext";
import { useAuthContext } from "../../../hooks/useAuthcontext";
const Moments = () => {
  const [days, setDays] = useState([]);
  const {
    reload,
    reloadHandler,
    getIdfromClickedElementInDateList,
    clickForDiaryOnOff,
    clickForAccSettingOnOff,
    handleClick,
  } = useContext(DiaryContext);
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchDiary = async () => {
      const res = await fetch(
        "https://sdiary-backend.onrender.com/api/v1/diary",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await res.json();
      if (res.ok) {
        setDays(json.data.data.filter((j) => j.selected === true));
      }
    };
    fetchDiary();
  }, [reload, user.token]);

  // const time =
  //   days &&
  //   days.map((day) => {
  //     const hoursAndMinutes = day.feeling;

  //     return hoursAndMinutes;
  //   });

  //handler function
  const clickHandler = async (e) => {
    if (user.data.user.role === "not user") return;
    const id = e.target.id;
    const diary = { selected: false };
    try {
      const response = await fetch(
        `https://sdiary-backend.onrender.com/api/v1/diary/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(diary),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.ok) {
        reloadHandler(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const selectHandler = (e) => {
    handleClick(false);
    getIdfromClickedElementInDateList(e.target.id);
    clickForDiaryOnOff(true);
    clickForAccSettingOnOff(false);
  };

  return (
    <div className={classes.momentSection}>
      <div className={classes.headingBox}>
        <h6 className={classes.heading}>My Favorite Days</h6>
      </div>
      <div className={classes.moments}>
        {days &&
          days.map((day) => (
            <div
              onClick={selectHandler}
              id={day._id}
              key={day._id}
              className={classes.emptyBox}
            >
              <li className={classes.item}>
                <div className={classes.box1}>
                  <span className={classes.time}>
                    {new Date(day.createdAt)
                      .getHours()
                      .toString()
                      .padStart(2, "0")}
                    :
                    {new Date(day.createdAt)
                      .getMinutes()
                      .toString()
                      .padStart(2, "0")}
                  </span>
                  <div className={classes.icon}>
                    {day && (
                      <Star
                        classes={classes.star}
                        onclick={clickHandler}
                        id={day._id}
                      />
                    )}
                  </div>
                </div>
                <div className={classes.box2}>
                  <span id={day._id} className={classes.date}>
                    {new Date(day.createdAt)
                      .getDate()
                      .toString()
                      .padStart(2, "0")}
                  </span>
                  <p id={day._id} className={classes.details}>
                    {day.details}
                  </p>
                </div>
                <div className={classes.box3}>
                  {day.feeling.map((feel, index) => {
                    if (
                      feel.toLowerCase().trim() === "sad" ||
                      feel.toLowerCase().trim() === "tired" ||
                      feel.toLowerCase().trim() === "Angry"
                    ) {
                      return (
                        <span key={index} className={classes.fourthColor}>
                          {feel}
                        </span>
                      );
                    } else if (
                      feel.toLowerCase().trim() === "happy" ||
                      feel.toLowerCase().trim() === "satisfied" ||
                      feel.toLowerCase().trim() === "ok" ||
                      feel.toLowerCase().trim() === "confident"
                    ) {
                      return (
                        <span key={index} className={classes.secondColor}>
                          {feel}
                        </span>
                      );
                    } else {
                      return (
                        <span key={index} className={classes.fifthColor}>
                          {feel}
                        </span>
                      );
                    }
                  })}
                </div>
              </li>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Moments;
