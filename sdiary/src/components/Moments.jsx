import React, { useContext } from "react";
import classes from "./css/Moment.module.css";
import Star from "../ui/Star";
import { useDiariesContext } from "../hooks/useDairyContext";
import DiaryContext from "../context/DiaryContext";
import { useAuthContext } from "../hooks/useAuthcontext";
const Moments = () => {
  const {
    reloadHandler,
    getIdfromClickedElementInDateList,
    clickForDiaryOnOff,
    clickForAccSettingOnOff,
    handleClick,
  } = useContext(DiaryContext);
  const { starredDiaries, dispatch } = useDiariesContext();
  const { user } = useAuthContext();
  console.log(starredDiaries, "what happened");

  //handler function
  const clickHandler = async (e) => {
    if (user.data.user.role === "not user") return;
    const id = e.target.id;
    dispatch({ type: "UNSTAR_DIARIES", payload: id });
    reloadHandler();

    const diary = { selected: false };
    try {
      const response = await fetch(
        `https://s-diary-backend.vercel.app/api/v1/diary/${id}`,
        // `https://sdiary-backend.onrender.com/api/v1/diary/${id}`,
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
        reloadHandler();
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
        <h6 className={classes.heading}>Favorite days</h6>
      </div>
      <div className={classes.moments}>
        {starredDiaries &&
          starredDiaries.map((day) => (
            <li className={classes.item}>
              <div className={classes.dateBar}>
                <span className={classes.date}>
                  {new Date(day.createdAt).toLocaleDateString()}
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
              <p
                onClick={selectHandler}
                id={day._id}
                className={classes.details}
              >
                {day.details}
              </p>

              <div className={classes.feelingBox}>
                {day.feeling.map((feel, index) => (
                  <span key={index} className={classes.feelings}>
                    {feel}
                  </span>
                ))}
              </div>
            </li>
          ))}
      </div>
    </div>
  );
};
export default Moments;
