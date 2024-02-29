import React, { useContext, useState, useEffect } from "react";
import classes from "./css/Diary.module.css";
import SingleCalendar from "./SingleCalendar";
import Star from "../ui/Star";
import TranshBin from "../ui/TranshBin";
import DiaryContext from "../context/DiaryContext";
import { useDiariesContext } from "../hooks/useDairyContext";
import { useAuthContext } from "../hooks/useAuthcontext";
import {
  getDiaryCreatedAt,
  getDiaryDate,
  getDiaryDay,
  getDiaryMonth,
  getDiaryUpatedAt,
  getDiaryYear,
} from "../util/getDayMonth";
import Loading from "./Loading";

const Diary = () => {
  const [oldDiary, setOldDiary] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const dailyQuotes = [
    "Sunday , Fun Day!",
    "There are many opportunities every single day, and Monday is the perfect day to seize them all.",
    "Tuesday is the affirmation that my goals are being moved another step forward.",
    "Wednesdays will always bring smiles for the second half of the week.",
    "Some people call it Thursday, I like to call it Friday Eve.",
    "Music always sounds better on Friday.",
    "Thank God It's Saturday.",
  ];

  const { diaries, dispatch } = useDiariesContext();
  const {
    id,
    clickEdit,
    getSelectedDiaryInDiary,
    reloadHandler,
    reload,
    handleClick,
  } = useContext(DiaryContext);
  const { user } = useAuthContext();
  const index = diaries && diaries.findIndex((diary) => diary._id === id);

  //get date data
  const month = getDiaryMonth(oldDiary?.createdAt, "long");
  const year = getDiaryYear(oldDiary?.createdAt);
  const day = getDiaryDay(oldDiary?.createdAt);
  const date = getDiaryDate(oldDiary?.createdAt);
  const createdAt = getDiaryCreatedAt(oldDiary?.createdAt);
  const updatedAt =
    oldDiary?.updatedAt &&
    oldDiary?.createdAt !== oldDiary?.updatedAt &&
    getDiaryUpatedAt(oldDiary?.updatedAt);

  useEffect(() => {
    setLoading(true);
    if (id) {
      try {
        const fetchDiary = async () => {
          const response = await fetch(
            `https://s-diary-backend.vercel.app/api/v1/diary/${id}`,
            // `https://sdiary-backend.onrender.com/api/v1/diary/${id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          const json = await response.json();
          if (!response.ok) {
            setError(json);
          }
          if (response.ok && id) {
            setOldDiary(json.data.data);
            setLoading(false);
          }
        };
        fetchDiary();
      } catch (error) {
        setError(error);
      }
    } else {
      setOldDiary(diaries[0]);
      setLoading(false);
    }
  }, [setOldDiary, id, reload, user.token, diaries]);

  //handler funcitons
  const editHandler = () => {
    clickEdit(true);
    getSelectedDiaryInDiary(oldDiary);
  };

  const starDiaryHandler = async (e) => {
    if (user.data.user.role === "not user") {
      setError("Please log in to perform this action");
      return;
    }
    const id = e.target.id;
    const diary = { selected: true };

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
      const json = await response.json();
      if (!response.ok) {
        setError(json.message);
      }
      if (response.ok) {
        const updatedDiary = {
          ...json.data,
          selected: true,
        };

        diaries[index] = updatedDiary;
        console.log(updatedDiary, "updatedDiary");
        setError(null);
        handleClick(false);
        reloadHandler();
        dispatch({ type: "UPDATE_DIARY", payload: diaries });
        dispatch({ type: "STAR_DIARIES", payload: updatedDiary });
      }
    } catch (error) {
      setError(error);
    }
  };

  const deleteHandler = async (e) => {
    if (user.data.user.role === "not user") {
      setError("Please log in to perform this action");
      return;
    }
    const id = e.target.id;
    setLoading(true);

    try {
      const response = await fetch(
        `https://s-diary-backend.vercel.app/api/v1/diary/${id}`,
        // `https://sdiary-backend.onrender.com/api/v1/diary/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.ok) {
        dispatch({ type: "DELETE_DIARY", payload: id });
        setLoading(false);
      }
      reloadHandler();
      handleClick(true);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className={classes.diary}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {" "}
          <div className={classes.header}>
            <h1 className={classes.currentMonthAndYear}>
              {oldDiary && month + " , " + year}
            </h1>
            {error && <p className={classes.errorHeading}>{error}</p>}
            <Star
              onclick={starDiaryHandler}
              classes={
                oldDiary && oldDiary.selected
                  ? classes.selectedStar
                  : classes.star
              }
              id={oldDiary && oldDiary._id}
            />
            <TranshBin
              onclick={deleteHandler}
              id={oldDiary && oldDiary._id}
              classes={classes.trashBin}
            />
          </div>
          <div className={classes.secondSection}>
            <div className={classes.rightSection}>
              <h1 className={classes.currentDay}>
                {oldDiary ? day : "Welcome"}.
              </h1>
              <p className={classes.text}>
                {dailyQuotes[new Date(oldDiary && oldDiary.createdAt).getDay()]}
              </p>
            </div>
            <div className={classes.leftSection}>
              <SingleCalendar
                date={oldDiary ? date : ""}
                className={classes.singleCalendar}
              />
              <ul className={classes.reactions}>
                {oldDiary &&
                  oldDiary.feeling.map((feel, index) => {
                    if (
                      feel.toLowerCase().trim() === "sad" ||
                      feel.toLowerCase().trim() === "tired" ||
                      feel.toLowerCase().trim() === "Angry"
                    ) {
                      return (
                        <li key={index} className={classes.fourthColor}>
                          {feel}
                        </li>
                      );
                    } else if (
                      feel.toLowerCase().trim() === "happy" ||
                      feel.toLowerCase().trim() === "satisfied" ||
                      feel.toLowerCase().trim() === "ok" ||
                      feel.toLowerCase().trim() === "confident"
                    ) {
                      return (
                        <li key={index} className={classes.secondColor}>
                          {feel}
                        </li>
                      );
                    } else {
                      return (
                        <li key={index} className={classes.fifthColor}>
                          {feel}
                        </li>
                      );
                    }
                  })}
              </ul>
              <ul className={classes.domains}>
                {oldDiary &&
                  oldDiary.about.map((domain, index) => (
                    <li key={index} className={classes.domain}>
                      {domain}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className={classes.details}>
            <p className={classes.paragraph}>
              <span className={classes.firstLetter}>
                {oldDiary && oldDiary.details.slice(0, 1)}{" "}
              </span>{" "}
              {oldDiary && oldDiary.details.slice(1)}
            </p>
          </div>
          <div className={error ? classes.footWithError : classes.foot}>
            <div className={classes.createdTime}>
              Created at - {oldDiary ? createdAt : "Let's create now."}
            </div>
            {updatedAt && (
              <div className={classes.createdTime}>
                Updated at - {updatedAt}
              </div>
            )}
            {error && <p className={classes.error}>{error}</p>}
            {oldDiary ? (
              <button onClick={editHandler} className={classes.btn}>
                Edit
              </button>
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Diary;
