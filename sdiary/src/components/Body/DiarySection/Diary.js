import React, { useContext, useState, useEffect } from "react";
import classes from "./css/Diary.module.css";
import SingleCalendar from "./SingleCalendar";
import Star from "../../UI/Star";
import TranshBin from "../../UI/TranshBin";
import DiaryContext from "../../context/DiaryContext";
import { useDiariesContext } from "../../hooks/useDairyContext";
import { useAuthContext } from "../../hooks/useAuthcontext";

const Diary = () => {
  const { dispatch } = useDiariesContext();
  const {
    id,
    clickEdit,
    getSelectedDiaryInDiary,
    reloadHandler,
    reload,
    handleClick,
  } = useContext(DiaryContext);
  const [oldDiary, setOldDiary] = useState([]);
  const [error, setError] = useState();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dailyQuotes = [
    "Sunday , Fun Day!",
    "There are many opportunities every single day, and Monday is the perfect day to seize them all.",
    "Tuesday is the affirmation that my goals are being moved another step forward.",
    "Wednesdays will always bring smiles for the second half of the week.",
    "Some people call it Thursday, I like to call it Friday Eve.",
    "Music always sounds better on Friday.",
    "Thank God It's Saturday.",
  ];

  const month = months[new Date(oldDiary.createdAt).getMonth()];
  const year = new Date(oldDiary.createdAt).getFullYear();
  const day = new Date(oldDiary.createdAt).toLocaleDateString("en-US", {
    weekday: "long",
  });

  const date = new Date(oldDiary.createdAt)
    .getDate()
    .toString()
    .padStart(2, "0");
  const createdAt = ` ${new Date(oldDiary.createdAt)
    .getHours()
    .toString()
    .padStart(2, "0")}:${new Date(oldDiary.createdAt)
    .getMinutes()
    .toString()
    .padStart(2, "0")} `;

  const updatedAt =
    oldDiary.updatedAt &&
    oldDiary.createdAt !== oldDiary.updatedAt &&
    ` ${new Date(oldDiary.updatedAt)
      .getHours()
      .toString()
      .padStart(2, "0")}:${new Date(oldDiary.updatedAt)
      .getMinutes()
      .toString()
      .padStart(2, "0")} (${new Date(oldDiary.updatedAt).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        year: "numeric",
        month: "long",
      }
    )}) `;

  const { user } = useAuthContext();

  //fetch function.

  useEffect(() => {
    try {
      const fetchDiary = async () => {
        const response = await fetch(`api/v1/diary/${id}`);
        const json = await response.json();
        if (!response.ok) {
          setError(json);
        }
        if (response.ok && id) {
          setOldDiary(json.data.data);
        }
      };
      fetchDiary();
    } catch (error) {
      setError(error);
    }
  }, [setOldDiary, id, reload, user.token]);

  //handler funciton
  const clickHandler = () => {
    clickEdit(true);
    getSelectedDiaryInDiary(oldDiary);
  };

  // for selecting starred diary
  const selectHandler = async (e) => {
    if (user.data.user.role === "not user") {
      setError("Please log in to perform this action");
      return;
    }
    const id = e.target.id;

    const diary = { selected: true };

    try {
      const response = await fetch(`/api/v1/diary/${id}`, {
        method: "PATCH",
        body: JSON.stringify(diary),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        dispatch({ type: "SELECT_DIARY" });
      }
      reloadHandler();
    } catch (error) {
      setError(error);
    }
  };
  // for deleting the dairy
  const deleteHandler = async (e) => {
    if (user.data.user.role === "not user") {
      setError("Please log in to perform this action");
      return;
    }
    const id = e.target.id;

    try {
      const response = await fetch(`/api/v1/diary/${id}`, {
        method: "DELETE",
      });
      reloadHandler();
      handleClick(true);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className={classes.diary}>
      <div className={classes.header}>
        <h1 className={classes.currentMonthAndYear}>{month + " " + year}</h1>
        <Star
          onclick={selectHandler}
          classes={oldDiary.selected ? classes.selectedStar : classes.star}
          id={oldDiary._id}
        />
        <TranshBin
          onclick={deleteHandler}
          id={oldDiary._id}
          classes={classes.trashBin}
        />
      </div>
      <div className={classes.secondSection}>
        <div className={classes.leftSection}>
          <SingleCalendar date={date} className={classes.singleCalendar} />
          <ul className={classes.reactions}>
            {oldDiary.feeling &&
              oldDiary.feeling.map((feel, index) => {
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
          </ul>
          <ul className={classes.domains}>
            {oldDiary.about &&
              oldDiary.about.map((domain, index) => (
                <li key={index} className={classes.domain}>
                  {domain}
                </li>
              ))}
          </ul>
        </div>
        <div className={classes.rightSection}>
          <h1 className={classes.currentDay}>{day}</h1>
          <p className={classes.text}>
            {dailyQuotes[new Date(oldDiary.createdAt).getDay()]}
          </p>
        </div>
      </div>
      <div className={classes.details}>
        <p className={classes.paragraph}>{oldDiary.details}</p>
      </div>
      <div className={error ? classes.footWithError : classes.foot}>
        <div className={classes.createdTime}>Created at - {createdAt}</div>
        {updatedAt && (
          <div className={classes.createdTime}>Updated at - {updatedAt}</div>
        )}
        {error && <p className={classes.error}>{error}</p>}
        <button onClick={clickHandler} className={classes.btn}>
          Edit
        </button>
      </div>
    </div>
  );
};
export default Diary;
